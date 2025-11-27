// ===== 音樂系統 =====
// Track data (ABC notation) is now in js/audio/trackData.js
const MusicSystem = {
	audioContext: null,
	isPlaying: false,
	volume: 0.5,
	currentNote: null,
	isEnabled: false,
	currentTrack: 'exploration', // 'exploration' 或 'battle'

	// References to track data (loaded from TrackData)
	explorationMusic: null,
	battleMusic: null,
	victoryMusic: null,
	noteFrequencies: null,

	init() {
		// Load track data from TrackData module
		if (typeof TrackData !== 'undefined') {
			this.explorationMusic = TrackData.exploration;
			this.battleMusic = TrackData.battle;
			this.victoryMusic = TrackData.victory;
			this.noteFrequencies = TrackData.noteFrequencies;
		} else {
			console.error('TrackData not loaded - music will not work');
			return;
		}

		// 初始化 Web Audio API
		if (!this.audioContext) {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		}

		// 從 localStorage 讀取設定
		const saved = localStorage.getItem('musicEnabled');
		const savedVolume = localStorage.getItem('musicVolume');
		this.isEnabled = saved === 'true';
		this.volume = savedVolume ? parseFloat(savedVolume) : 0.5;

		// 解析三種音樂
		this.parsedExploration = this.parseABC(this.explorationMusic);
		this.parsedBattle = this.parseABC(this.battleMusic);
		this.parsedVictory = this.parseABC(this.victoryMusic);
		this.parsedMusic = this.parsedExploration; // 預設使用探索音樂

		this.updateUI();
	},

	switchTrack(trackName) {
		if (trackName === this.currentTrack) return;

		const wasPlaying = this.isPlaying;

		// 停止當前音樂
		this.stop();

		// 切換音軌
		this.currentTrack = trackName;
		if (trackName === 'battle') {
			this.parsedMusic = this.parsedBattle;
			console.log('🎵 Switched to battle music');
		} else if (trackName === 'victory') {
			this.parsedMusic = this.parsedVictory;
			console.log('🎵 Switched to victory music');
		} else {
			this.parsedMusic = this.parsedExploration;
			console.log('🎵 Switched to exploration music');
		}

		// 如果之前在播放，繼續播放新音軌
		if (wasPlaying && this.isEnabled) {
			setTimeout(() => {
				this.play();
			}, 100);
		}
	},

	// 播放勝利音樂（單次播放，結束後切換回探索音樂）
	playVictory(callback) {
		if (!this.isEnabled) {
			if (callback) callback();
			return;
		}

		// 停止當前音樂
		this.stop();

		// 設定勝利音樂
		this.currentTrack = 'victory';
		this.parsedMusic = this.parsedVictory;
		this.isPlaying = true;
		this.currentNoteIndex = 0;

		console.log('🎵 Playing victory music');

		// 播放勝利音樂
		this.playNextNote();

		// 計算勝利音樂總時長
		const totalDuration = this.parsedVictory.notes.reduce((sum, note) => sum + note.duration, 0);

		// 音樂結束後切換回探索音樂
		setTimeout(() => {
			this.stop();
			this.switchTrack('exploration');
			if (callback) callback();
		}, totalDuration * 1000 + 500); // 多加0.5秒緩衝
	},

	parseABC(abc) {
		const lines = abc.split('\n').filter(line => !line.trim().startsWith('%') && line.trim().length > 0);
		const notes = [];
		let tempo = 120; // 預設速度
		let defaultLength = 8; // 預設八分音符

		// 解析標頭資訊
		for (const line of lines) {
			if (line.startsWith('Q:')) {
				const match = line.match(/Q:(\d+)/);
				if (match) tempo = parseInt(match[1]);
			}
			if (line.startsWith('L:')) {
				const match = line.match(/L:1\/(\d+)/);
				if (match) defaultLength = parseInt(match[1]);
			}
		}

		// 解析音符行
		for (const line of lines) {
			if (line.startsWith('X:') || line.startsWith('T:') || line.startsWith('M:') ||
			    line.startsWith('L:') || line.startsWith('Q:') || line.startsWith('K:') ||
			    line.startsWith('[V:') || line.includes('---')) {
				continue;
			}

			// 移除小節線和其他符號
			const cleanLine = line.replace(/\|/g, ' ').replace(/:/g, '').trim();
			if (!cleanLine) continue;

			// 解析音符（支援 ABC 記譜中的 C' 高音表示法）
			const tokens = cleanLine.match(/([A-Ga-g][',]*|z)(\d*)/g);
			if (!tokens) continue;

			for (const token of tokens) {
				const match = token.match(/([A-Ga-g][',]*|z)(\d*)/);
				if (match) {
					let noteName = match[1];
					let duration = match[2] ? parseInt(match[2]) : 1;

					// 計算實際持續時間（秒）
					const beatDuration = 60 / tempo; // 一拍的秒數
					const noteDuration = (beatDuration * 4 * duration) / defaultLength;

					const frequency = this.noteFrequencies[noteName] || 0;

					notes.push({
						note: noteName,
						duration: noteDuration,
						frequency: frequency
					});
				}
			}
		}

		return { notes, tempo };
	},

	toggle() {
		this.isEnabled = !this.isEnabled;
		localStorage.setItem('musicEnabled', this.isEnabled);

		if (this.isEnabled) {
			// 確保 AudioContext 已恢復（瀏覽器安全要求）
			if (this.audioContext.state === 'suspended') {
				this.audioContext.resume().then(() => {
					this.play();
				});
			} else {
				this.play();
			}
		} else {
			this.stop();
		}

		this.updateUI();
	},

	setVolume(value) {
		this.volume = value / 100;
		localStorage.setItem('musicVolume', this.volume);
		// 如果正在播放，更新音量（需考慮音軌類型的音量倍增器）
		if (this.currentNote && this.currentNote.gainNode) {
			const trackVolumeMultiplier = this.currentTrack === 'battle' ? 0.5 : 1.0;
			const finalVolume = this.volume * trackVolumeMultiplier;
			this.currentNote.gainNode.gain.value = finalVolume;
		}
	},

	play() {
		if (!this.isEnabled || this.isPlaying || !this.parsedMusic) return;
		this.isPlaying = true;
		this.currentNoteIndex = 0;
		this.playNextNote();
		console.log('Music playing... Total notes:', this.parsedMusic.notes.length);
	},

	playNextNote() {
		if (!this.isPlaying || !this.parsedMusic) return;

		const notes = this.parsedMusic.notes;
		if (this.currentNoteIndex >= notes.length) {
			// 樂曲結束，循環播放
			this.currentNoteIndex = 0;
		}

		const noteData = notes[this.currentNoteIndex];
		this.currentNoteIndex++;

		if (noteData.frequency > 0) {
			// 播放音符
			this.playTone(noteData.frequency, noteData.duration);
		}

		// 安排下一個音符
		this.nextNoteTimeout = setTimeout(() => {
			this.playNextNote();
		}, noteData.duration * 1000);
	},

	playTone(frequency, duration) {
		try {
			const oscillator = this.audioContext.createOscillator();
			const gainNode = this.audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(this.audioContext.destination);

			// 根據音軌選擇音色
			if (this.currentTrack === 'battle') {
				// 戰鬥音樂：使用方波創造更尖銳、激烈的音色
				oscillator.type = 'square';
			} else {
				// 探索音樂：使用三角波創造較柔和的音色
				oscillator.type = 'triangle';
			}

			oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

			// 設定音量包絡（ADSR）
			const now = this.audioContext.currentTime;
			const attackTime = this.currentTrack === 'battle' ? 0.01 : 0.02;
			const releaseTime = this.currentTrack === 'battle' ? 0.05 : 0.1;

			// 根據音軌類型調整音量
			const trackVolumeMultiplier = this.currentTrack === 'battle' ? 0.5 : 1.0;
			const finalVolume = this.volume * trackVolumeMultiplier;

			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(finalVolume, now + attackTime);
			gainNode.gain.setValueAtTime(finalVolume, now + duration - releaseTime);
			gainNode.gain.linearRampToValueAtTime(0, now + duration);

			oscillator.start(now);
			oscillator.stop(now + duration);

			this.currentNote = { oscillator, gainNode };
		} catch (e) {
			console.error('Error playing tone:', e);
		}
	},

	stop() {
		this.isPlaying = false;

		if (this.nextNoteTimeout) {
			clearTimeout(this.nextNoteTimeout);
			this.nextNoteTimeout = null;
		}

		if (this.currentNote) {
			try {
				if (this.currentNote.oscillator) {
					this.currentNote.oscillator.stop();
				}
			} catch (e) {
				// 音符可能已經停止
			}
			this.currentNote = null;
		}

		console.log('Music stopped');
	},

	updateUI() {
		const toggleBtn = document.getElementById('music-toggle');
		const volumeSlider = document.getElementById('volume-slider');
		const volumeDisplay = document.getElementById('volume-display');

		if (toggleBtn) {
			if (this.isEnabled) {
				toggleBtn.innerHTML = '🔊 <span data-i18n="musicOn">音樂：開啟</span>';
				toggleBtn.style.background = '#d4edda';
			} else {
				toggleBtn.innerHTML = '🔇 <span data-i18n="musicOff">音樂：關閉</span>';
				toggleBtn.style.background = '#f4e4c1';
			}
		}

		if (volumeSlider) {
			volumeSlider.value = this.volume * 100;
		}

		if (volumeDisplay) {
			volumeDisplay.textContent = Math.round(this.volume * 100) + '%';
		}
	}
};
