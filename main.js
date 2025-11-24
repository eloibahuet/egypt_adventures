// ===== 音樂系統 =====
const MusicSystem = {
	audioContext: null,
	isPlaying: false,
	volume: 0.5,
	currentNote: null,
	isEnabled: false,
	currentTrack: 'exploration', // 'exploration' 或 'battle'
	
	// ABC 記譜 - 探索音樂
	explorationMusic: `
X:30
T:Egypt_Stage_Full_with_Pungi_32bars
M:4/4
L:1/8
Q:160
K:Aphr

V:Lead clef=treble
V:Harmony clef=treble
V:Pungi clef=treble
V:Bass clef=bass
V:Drums clef=perc

%%score (Lead Harmony Pungi Bass Drums)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% --- LEAD（原曲主旋律） ---
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
V:Lead
% Section A (1–8)
A4 C2 D2 | E4 F2 E2 | A4 G2 F2 | E4 C2 B,2 |
A4 C2 D2 | E4 F2 A2 | G4 F2 E2 | A6 z2 |
% Section B (9–16)
C'4 B2 A2 | G4 F2 E2 | F4 E2 D2 | C4 B,2 A,2 |
A4 C2 D2 | E4 F2 E2 | G4 F2 E2 | A6 z2 |
% Section C (17–24)
E4 F2 G2 | A4 G2 F2 | C'4 B2 A2 | G4 F2 E2 |
D4 C2 B,2 | A,4 B,2 C2 | D4 E2 F2 | G6 z2 |
% Section D (25–32)
A4 C2 D2 | E4 F2 E2 | A4 G2 F2 | E4 C2 B,2 |
A4 C2 E2 | F4 G2 A2 | G4 F2 E2 | A8 ||

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% --- HARMONY（和聲＋第二旋律） ---
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
V:Harmony
% Section A
E2 A2 G2 A2 | F4 E2 D2 | E2 G2 A2 B2 | A4 G2 F2 |
A2 A2 F2 A2 | G4 F2 E2 | C'4 B2 A2 | G6 z2 |
% Section B
A2 G2 F2 E2 | D4 C2 B,2 | E2 G2 C'2 B2 | A4 G2 E2 |
C'2 B2 A2 G2 | F2 E2 D2 C2 | E2 F2 G2 A2 | C'6 z2 |
% Section C
A2 B2 C'2 D'2 | E'4 D'2 C'2 | C'2 B2 A2 G2 | F4 E2 D2 |
E2 A2 C'2 B2 | A4 G2 F2 | E2 G2 A2 B2 | C'4 B2 A2 |
% Section D
E2 A2 G2 A2 | F4 E2 D2 | E2 G2 A2 B2 | A4 G2 F2 |
A2 C'2 B2 A2 | G2 F2 E2 D2 | F2 E2 D2 C2 | A8 ||

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% --- PUNGI（蛇魅笛） ---
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
V:Pungi
% Section A (1–8)
A2 ^B2 C'2 A2 | C'3 D' C'2 A2 | G2 A2 C'2 B2 | A4 G2 F2 |
A2 C'2 A2 C'2 | D'3 C' B2 A2 | G2 A2 F2 G2 | A8 |
% Section B (9–16)
C'4 B2 A2 | G2 A2 C'2 B2 | A4 G2 F2 | E4 F2 G2 |
A2 C'2 B2 A2 | C'4 D'2 C'2 | B2 C'2 D'2 E'2 | A8 |
% Section C (17–24)
E'2 D'2 C'2 B2 | A4 ^G2 A2 | C'2 B2 A2 G2 | F2 G2 A2 F2 |
E2 A2 C'2 B2 | A3 ^G A2 F2 | G2 A2 B2 C'2 | A8 |
% Section D (25–32)
A2 C'2 A2 C'2 | D'3 C' B2 A2 | G2 A2 C'2 B2 | A4 G2 F2 |
A2 C'2 B2 A2 | G2 F2 E2 D2 | F2 E2 D2 C2 | A8 ||

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% --- BASS（16-bit Saw Bass） ---
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
V:Bass
% Section A
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] |
% Section B
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] |
% Section C
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] |
% Section D
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] ||

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% --- DRUMS（SNES/Genesis 風節奏） ---
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
V:Drums
% Bass drum = C, Snare = X, Hi-hat = ^
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
% repeat for all 32 bars
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] ||
`,
	
	// ABC 記譜 - 戰鬥音樂（完整四聲部編制）
	battleMusic: `
X:102
T:Egypt_Stage_Battle
%%section BATTLE
M:4/4
L:1/8
Q:188
K:Aphr

V:Lead clef=treble
V:Harmony clef=treble
V:Bass clef=bass
V:Drums clef=perc
%%score (Lead Harmony Bass Drums)

% --- LEAD ---
V:Lead
A2 C2 A2 C2 | D4 C2 B,2 | A2 C2 D2 E2 | F4 E2 D2 |
C2 E2 C2 E2 | F4 E2 D2 | A4 G2 F2 | E6 z2 |
C'2 B2 A2 G2 | F4 E2 D2 | C2 E2 A2 G2 | F4 E2 C2 |
A2 C'2 A2 G2 | F2 E2 D2 C2 | B,2 C2 D2 E2 | A6 z2 |
E2 F2 G2 A2 | C'4 B2 A2 | A2 G2 F2 E2 | D4 C2 B,2 |
A2 C2 A2 C2 | D4 C2 B,2 | A2 C2 D2 E2 | F4 E2 D2 |
A4 C2 D2 | E4 F2 E2 | A4 G2 F2 | E4 C2 B,2 |
A4 C2 E2 | F4 G2 A2 | G4 F2 E2 | A8 ||

% --- HARMONY ---
V:Harmony
E2 A2 G2 A2 | F4 E2 D2 | E2 G2 A2 B2 | A4 G2 F2 |
A2 A2 F2 A2 | G4 F2 E2 | C'4 B2 A2 | G6 z2 |
A2 G2 F2 E2 | D4 C2 B,2 | E2 G2 C'2 B2 | A4 G2 E2 |
C'2 B2 A2 G2 | F2 E2 D2 C2 | E2 F2 G2 A2 | C'6 z2 |
A2 B2 C'2 D'2 | E'4 D'2 C'2 | C'2 B2 A2 G2 | F4 E2 D2 |
E2 A2 C'2 B2 | A4 G2 F2 | E2 G2 A2 B2 | C'4 B2 A2 |
E2 A2 G2 A2 | F4 E2 D2 | E2 G2 A2 B2 | A4 G2 F2 |
A2 C'2 B2 A2 | G2 F2 E2 D2 | F2 E2 D2 C2 | A8 ||

% --- BASS ---
V:Bass
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] |
[A,2 A2] [A,2 A2] | [D2 D2] [C2 C2] |
[A,2 A2] [C2 C2] | [D2 D2] [E2 E2] |
[F2 F2] [E2 E2] | [A,2 A2] [G2 G2] |
[F2 F2] [E2 E2] | [A,4 A,4] ||

% --- DRUMS ---
V:Drums
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] |
[C2 ^z C2 ^z] | [X2 ^z X2 ^z] |
[C2 ^C ^C C] | [X2 ^z X2 ^z] ||
`,
	
	// ABC 記譜 - 勝利音樂（埃及風格勝利號角）
	victoryMusic: `
X:20
T:Egypt_Stage_Victory
M:4/4
L:1/8
Q:140
K:Aphr
% Voice: Lead (弦樂主旋律 - 高亢勝利號角)
V:1 clef=treble name="Lead"
"A"e4 ^d2 e2 | "^A"f4 e2 d2 | "A"c4 B2 A2 | "^A"A6 z2 |
% Voice: Harmony (豎笛副旋律 - 和聲支撐)
V:2 clef=treble name="Harmony"
"A"c4 B2 c2 | "^A"d4 c2 B2 | "A"A4 G2 F2 | "^A"E6 z2 |
% Voice: Pungi (印度蛇笛 - 埃及特色音色)
V:3 clef=treble name="Pungi"
"A"A2 c2 e2 c2 | "^A"A2 f2 e2 d2 | "A"c2 A2 G2 F2 | "^A"E4 z4 |
% Voice: Bass (低音銅管 - 厚重底層)
V:4 clef=bass name="Bass"
"A"A,4 A,2 A,2 | "^A"A,4 A,2 A,2 | "A"A,4 A,2 A,2 | "^A"A,6 z2 |
% Voice: Drums (勝利鼓點 - 慶祝節奏)
V:5 clef=percussion name="Drums"
[F,4C,4] [F,2C,2] [F,2C,2] | [F,4C,4] [F,2C,2] [F,2C,2] | [F,4C,4] [F,2C,2] [F,2C,2] | [F,6C,6] z2 ||
`,
	
	init() {
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
	
	// 音符頻率對照表（基於 A Phrygian Dominant 音階）
	noteFrequencies: {
		// 低八度 (大寫 + 逗號)
		'A,': 110.00, 'B,': 123.47, 'C,': 65.41, 'D,': 73.42, 'E,': 82.41, 'F,': 87.31, 'G,': 98.00,
		// 中八度 (大寫字母)
		'A': 220.00, 'B': 246.94, 'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23, 'G': 392.00,
		// 高八度 (小寫字母)
		'a': 440.00, 'b': 493.88, 'c': 523.25, 'd': 587.33, 'e': 659.25, 'f': 698.46, 'g': 783.99,
		// 更高八度 (小寫 + 撇號)
		"c'": 1046.50, "d'": 1174.66, "e'": 1318.51, "f'": 1396.91, "g'": 1567.98, "a'": 880.00, "b'": 987.77,
		// 休止符
		'z': 0
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
					
					// ABC 記譜規則：
					// A,B,C, = 低八度（帶逗號）
					// A B C D E F G = 中八度（大寫）
					// a b c d e f g = 高八度（小寫）
					// c' d' = 更高八度（小寫+撇號）
					
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
		const attackTime = this.currentTrack === 'battle' ? 0.01 : 0.02; // 戰鬥音樂攻擊更快
		const releaseTime = this.currentTrack === 'battle' ? 0.05 : 0.1; // 戰鬥音樂釋放更短
		
		// 根據音軌類型調整音量：戰鬥音樂使用方波較刺耳，降低至 50%
		const trackVolumeMultiplier = this.currentTrack === 'battle' ? 0.5 : 1.0;
		const finalVolume = this.volume * trackVolumeMultiplier;
		
		gainNode.gain.setValueAtTime(0, now);
		gainNode.gain.linearRampToValueAtTime(finalVolume, now + attackTime);
		gainNode.gain.setValueAtTime(finalVolume, now + duration - releaseTime);
		gainNode.gain.linearRampToValueAtTime(0, now + duration);			oscillator.start(now);
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

document.addEventListener('DOMContentLoaded', function() {
	const output = document.getElementById('game-output');
	const input = document.getElementById('game-input');
	const button = document.getElementById('submit-btn');
	const spinBtn = document.getElementById('spin-btn');
	const stopBtn = document.getElementById('stop-btn');
	
	// 初始化音樂系統
	MusicSystem.init();

	// 初始化語言選擇器
	const languageSelect = document.getElementById('language-select');
	if (languageSelect) {
		languageSelect.value = currentLanguage;
		languageSelect.addEventListener('change', function() {
			changeLanguage(this.value);
			if (window.game) {
				// 清空遊戲輸出區域
				output.innerHTML = '';
				// 重新生成方向提示以更新語言
				game.generateDirectionHints();
				// 更新玩家和敵人狀態顯示
				game.updateStatus();
			}
		});
	}
	
	// 初始化UI語言
	updateUILanguage();

	// 初始不允許旋轉，直到玩家選擇移動方向
	spinBtn.disabled = true;
	const reels = [document.getElementById('reel-0'), document.getElementById('reel-1'), document.getElementById('reel-2')];

// 事件列表與權重（對應原 Python）
const EVENTS = ['monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'buried_treasure', 'dead_traveler', 'ancient_shrine', 'caravan_rest', 'mirage', 'nomad_camp', 'quicksand', 'scorpion_nest', 'ancient_ruins', 'mysterious_stranger', 'trading_post', 'empty'];
const EVENT_WEIGHTS = [22,8,4,7,4,6,8,4,6,6,6,5,5,4,5,5,4,5,4,6,2];

function chooseEvent() {
	const total = EVENT_WEIGHTS.reduce((a,b)=>a+b,0);
	let r = Math.random() * total;
	for (let i=0,acc=0;i<EVENT_WEIGHTS.length;i++){
		acc += EVENT_WEIGHTS[i];
		if (r < acc) return EVENTS[i];
	}
	return 'empty';
}

	function showMessage(msg) {
		// 新增一個訊息節點，並確保只保留最新20條
		const node = document.createElement('div');
		node.innerHTML = msg; // 使用 innerHTML 以支援 HTML 標籤（如顏色）
		output.appendChild(node);
		// 若超過20則，移除最舊的
		while (output.children.length > 20) {
			output.removeChild(output.firstChild);
		}
		// 自動捲動到最底
		output.scrollTop = output.scrollHeight;
	}

	// 插槽機符號（目前實裝的符號）
	// 我們使用加權方法讓攻擊符號出現機率較高
	const SYMBOLS = ['⚔️','⚡️','🛡️','💀','🧪','⭐','💰'];
	// 權重設定（可調）：攻擊較常出現
	const SYMBOL_WEIGHTS = {
		'⚔️': 6,
		'⚡️': 3,
		'🛡️': 3,
		'💀': 2,
		'🧪': 2,
		'⭐': 4,
		'💰': 2
	};

	function pickWeightedSymbol() {
		const pool = [];
		for (const s of SYMBOLS) {
			const w = SYMBOL_WEIGHTS[s] || 1;
			for (let i=0;i<w;i++) pool.push(s);
		}
		return pool[Math.floor(Math.random() * pool.length)];
	}
	const VISIBLE = 2; // 中間顯示1個，實作上每個 symbol 高度為 60px，reel 高度 120px
	const SYMBOL_HEIGHT = 60; // 與 CSS 同步

// 裝備與掉落樣本（基礎屬性，品質會在生成時添加）
const ITEMS = [
	// 武器類
	{ name: '青銅劍', slot: 'weapon', atk: 3, rarity: 'common' },
	{ name: '鋼鐵劍', slot: 'weapon', atk: 6, rarity: 'common' },
	{ name: '法老彎刀', slot: 'weapon', atk: 8, rarity: 'common' },
	{ name: '聖甲蟲戰斧', slot: 'weapon', atk: 10, rarity: 'common' },
	{ name: '荷魯斯之劍', slot: 'weapon', atk: 12, rarity: 'common' },
	{ name: '阿努比斯之鎌', slot: 'weapon', atk: 15, rarity: 'common' },
	{ name: '太陽神之矛', slot: 'weapon', atk: 18, rarity: 'common' },
	
	// 防具類
	{ name: '皮甲', slot: 'armor', def: 2, rarity: 'common' },
	{ name: '鋼鐵鎧甲', slot: 'armor', def: 5, rarity: 'common' },
	{ name: '沙漠長袍', slot: 'armor', def: 3, rarity: 'common' },
	{ name: '法老護胸', slot: 'armor', def: 7, rarity: 'common' },
	{ name: '聖甲蟲鎧甲', slot: 'armor', def: 9, rarity: 'common' },
	{ name: '黃金戰甲', slot: 'armor', def: 12, rarity: 'common' },
	{ name: '神殿守護甲', slot: 'armor', def: 15, rarity: 'common' },
	
	// 護符類
	{ name: '幸運護符', slot: 'amulet', luck_gold: 1, rarity: 'common' },
	{ name: '戰鬥護符', slot: 'amulet', luck_combat: 1, rarity: 'common' },
	{ name: '聖甲蟲墜飾', slot: 'amulet', luck_gold: 2, rarity: 'common' },
	{ name: '荷魯斯之眼', slot: 'amulet', luck_combat: 2, rarity: 'common' },
	{ name: '生命之符', slot: 'amulet', max_hp_bonus: 20, rarity: 'common' },
	{ name: '力量之符', slot: 'amulet', atk: 3, rarity: 'common' },
	{ name: '守護之符', slot: 'amulet', def: 3, rarity: 'common' }
];

// 品質額外屬性池
const QUALITY_BONUS = {
	weapon: {
		// 武器額外屬性：暴擊率、連擊率、技能增幅
		common: [], // 普通無額外屬性
		rare: [ // 稀有：1個額外屬性
			{ crit_rate: 5 }, // +5% 暴擊率
			{ crit_rate: 8 },
			{ combo_rate: 8 }, // +8% 連擊維持率
			{ combo_rate: 12 },
			{ skill_power: 10 }, // +10% 技能傷害
			{ skill_power: 15 }
		],
		epic: [ // 史詩：2個額外屬性
			{ crit_rate: 10, combo_rate: 15 },
			{ crit_rate: 12, skill_power: 20 },
			{ combo_rate: 18, skill_power: 25 },
			{ crit_rate: 15, combo_rate: 20 },
			{ skill_power: 30, combo_rate: 15 }
		]
	},
	armor: {
		common: [],
		rare: [ // 稀有：1個額外屬性
			{ max_hp_bonus: 15 }, // +15 最大生命
			{ max_hp_bonus: 20 },
			{ stamina_bonus: 10 }, // +10 最大體力
			{ stamina_bonus: 15 },
			{ dodge_rate: 5 }, // +5% 閃避率
			{ dodge_rate: 8 }
		],
		epic: [ // 史詩：2個額外屬性
			{ max_hp_bonus: 30, stamina_bonus: 20 },
			{ max_hp_bonus: 25, dodge_rate: 10 },
			{ stamina_bonus: 25, dodge_rate: 12 },
			{ max_hp_bonus: 40, dodge_rate: 8 },
			{ dodge_rate: 15, stamina_bonus: 30 }
		]
	},
	amulet: {
		common: [],
		rare: [ // 稀有：1個額外屬性
			{ luck_combat: 1 },
			{ luck_gold: 1 },
			{ max_hp_bonus: 15 },
			{ atk: 2 },
			{ def: 2 }
		],
		epic: [ // 史詩：2個額外屬性
			{ luck_combat: 2, luck_gold: 2 },
			{ luck_combat: 2, max_hp_bonus: 25 },
			{ luck_gold: 2, atk: 4 },
			{ atk: 5, def: 5 },
			{ max_hp_bonus: 35, def: 3 }
		]
	}
};

// 金字塔裝備字綴系統（僅金字塔掉落裝備擁有）
const PYRAMID_AFFIXES = [
	{ id: 'ra', name: '太陽神拉之', color: '#FFD700', bonus: { atk: 3, crit_rate: 8 } },
	{ id: 'anubis', name: '死神阿努比斯之', color: '#8B4513', bonus: { def: 3, max_hp_bonus: 30 } },
	{ id: 'osiris', name: '冥王歐西里斯之', color: '#4B0082', bonus: { max_hp_bonus: 40, stamina_bonus: 20 } },
	{ id: 'horus', name: '荷魯斯之', color: '#1E90FF', bonus: { atk: 4, combo_rate: 12 } },
	{ id: 'isis', name: '女神伊西斯之', color: '#FF69B4', bonus: { luck_combat: 2, luck_gold: 2 } },
	{ id: 'thoth', name: '智慧神托特之', color: '#00CED1', bonus: { skill_power: 20, dodge_rate: 10 } }
];

// 套裝效果（需要武器+護甲+護符三件相同字綴，且同品質）
const SET_BONUSES = {
	'ra': { name: '太陽神的榮耀', effects: { atk: 10, crit_rate: 15, skill_power: 25 } },
	'anubis': { name: '死神的庇護', effects: { def: 10, max_hp_bonus: 80, dodge_rate: 15 } },
	'osiris': { name: '冥界的力量', effects: { max_hp_bonus: 100, stamina_bonus: 50, def: 8 } },
	'horus': { name: '天空之神的祝福', effects: { atk: 12, combo_rate: 20, crit_rate: 12 } },
	'isis': { name: '魔法女神的恩賜', effects: { luck_combat: 4, luck_gold: 4, max_hp_bonus: 50 } },
	'thoth': { name: '智慧的啟迪', effects: { skill_power: 40, dodge_rate: 20, stamina_bonus: 30 } }
};

function genEnemyName(type) {
	const prefixes = ['古夫', '阿努', '賽特', '拉', '梅特'];
	const suffixes = ['守衛', '戰士', '祭司', '掠奪者', '守護者'];
	const p = prefixes[Math.floor(Math.random()*prefixes.length)];
	const s = suffixes[Math.floor(Math.random()*suffixes.length)];
	let title = '';
	if (type === 'elite') title = '精英';
	else if (type === 'mini_boss') title = '小頭目';
	else title = '敵人';
	return `${p}${s} ${title}`;
}

	// 每軸建立長條（重複符號以便平滑旋轉）
	function populateReels() {
		for (let r = 0; r < reels.length; r++) {
			const strip = document.createElement('div');
			strip.className = 'strip';
			// 重複 SYMBOLS 以方便連續捲動
			const repeats = 8;
			for (let i = 0; i < repeats; i++) {
				for (const s of SYMBOLS) {
					const el = document.createElement('div');
					el.className = 'symbol';
					el.textContent = s;
					strip.appendChild(el);
				}
			}
		reels[r].innerHTML = '';
		reels[r].appendChild(strip);
		// 初始位置：從中間組開始
		// 高亮框在 top: 30px (中心在 60px)，要讓符號對齊，需要讓某個符號的中心對齊到 60px
		// strip 往上移動到讓第 N 個符號的頂部在 30px 處
		const initialOffset = SYMBOL_HEIGHT * SYMBOLS.length * 2;
		strip.style.transform = `translateY(-${initialOffset}px)`;
		}
	}

	populateReels();

	// 簡單遊戲狀態（玩家與敵人）
	class Game {
		constructor() {
			this.player = { hp: 100, max_hp: 100, shield: 0, stamina: 50, max_stamina: 50, potions: 2, gold: 500, luck_combat: 0, luck_gold: 0, level: 1, xp: 0, inventory: [], equipment: { weapon: null, armor: null, amulet: null } };
			this.enemy = { hp: 100, max_hp: 100, baseAttack: 10, turnsToAttack: 3 };
			this.inBattle = false;
			this.consecutivePrimarySymbol = null;
			this.consecutivePrimaryCount = 0;
			this.map_steps = 0;
			this.map_goal = 30;
			this.difficulty = 1;
			// 金字塔副本相關狀態
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.pyramidMaxSteps = 8;
			this.normalMapSteps = 0; // 儲存進入金字塔前的步數
		}

		// 檢測套裝效果（需要武器+護甲+護符三件相同字綴且同品質）
		getActiveSetBonus() {
			const weapon = this.player.equipment.weapon;
			const armor = this.player.equipment.armor;
			const amulet = this.player.equipment.amulet;
			
			// 檢查是否都是金字塔裝備
			if (!weapon || !armor || !amulet) return null;
			if (!weapon.isPyramid || !armor.isPyramid || !amulet.isPyramid) return null;
			
			// 檢查字綴是否相同
			if (weapon.affix !== armor.affix || weapon.affix !== amulet.affix) return null;
			
			// 檢查品質是否相同（不能混搭）
			if (weapon.rarity !== armor.rarity || weapon.rarity !== amulet.rarity) return null;
			
			// 返回套裝效果
			const setBonus = SET_BONUSES[weapon.affix];
			if (setBonus) {
				return { ...setBonus, affix: weapon.affix, affixName: weapon.affixName, rarity: weapon.rarity };
			}
			return null;
		}

		// 經驗曲線：傳回升到下一等級所需的經驗值（簡單指數增長，可擴展至等級99）
		xpForNext(level) {
			// level 起始於 1，要升到 level+1 所需
			if (level >= 99) return Infinity;
			return Math.floor(100 * level * Math.pow(1.06, level-1));
		}

		addXP(amount) {
			this.player.xp += amount;
			showMessage(`${t('gainedExp')} ${amount}。`);
			// 自動升級迴圈（支援多等級升級）
			while (this.player.level < 99 && this.player.xp >= this.xpForNext(this.player.level)) {
				const need = this.xpForNext(this.player.level);
				this.player.xp -= need;
				this.player.level += 1;
				// 等級帶來的獎勵：提升最大生命與體力，並完全恢復
				this.player.max_hp += 10;
				this.player.max_stamina += 5;
				this.player.hp = this.player.max_hp; // 完全恢復血量
				this.player.stamina = this.player.max_stamina; // 完全恢復體力
				showMessage(`${t('levelUp')} ${this.player.level} ${t('hpStaminaRecovered')}`);
			}
		}

		// 檢測套裝效果（需要武器+護甲+護符三件相同字綴且同品質）
		getActiveSetBonus() {
			const weapon = this.player.equipment.weapon;
			const armor = this.player.equipment.armor;
			const amulet = this.player.equipment.amulet;
			
			// 檢查是否都是金字塔裝備
			if (!weapon || !armor || !amulet) return null;
			if (!weapon.isPyramid || !armor.isPyramid || !amulet.isPyramid) return null;
			
			// 檢查字綴是否相同
			if (weapon.affix !== armor.affix || weapon.affix !== amulet.affix) return null;
			
			// 檢查品質是否相同（不能混搭）
			if (weapon.rarity !== armor.rarity || weapon.rarity !== amulet.rarity) return null;
			
			// 返回套裝效果
			const setBonus = SET_BONUSES[weapon.affix];
			if (setBonus) {
				return { ...setBonus, affix: weapon.affix, affixName: weapon.affixName, rarity: weapon.rarity };
			}
			return null;
		}

		// 獲取套裝效果屬性加成值
		getSetBonusValue(attrName) {
			const setBonus = this.getActiveSetBonus();
			if (!setBonus || !setBonus.effects) return 0;
			return setBonus.effects[attrName] || 0;
		}

		// Helper: 格式化物品屬性顯示
		formatItem(it) {
				if (!it) return '';
				const parts = [];
				if (it.atk) parts.push(`攻+${it.atk}`);
				if (it.def) parts.push(`防+${it.def}`);
				if (it.luck_gold) parts.push(`金運+${it.luck_gold}`);
				if (it.luck_combat) parts.push(`戰運+${it.luck_combat}`);
				if (it.max_hp_bonus) parts.push(`HP+${it.max_hp_bonus}`);
				if (it.stamina_bonus) parts.push(`體力+${it.stamina_bonus}`);
				if (it.crit_rate) parts.push(`暴擊+${it.crit_rate}%`);
				if (it.combo_rate) parts.push(`連擊+${it.combo_rate}%`);
				if (it.skill_power) parts.push(`技能+${it.skill_power}%`);
				if (it.dodge_rate) parts.push(`閃避+${it.dodge_rate}%`);
				const attr = parts.length ? ` (${parts.join(' ')})` : '';
				// 根據稀有度設定顏色
				let color = '#333'; // 普通 common
				if (it.rarity === 'rare') color = '#2ecc71'; // 精良 綠色
				else if (it.rarity === 'epic') color = '#9b59b6'; // 史詩 紫色
				
				// 金字塔裝備顯示字綴
				let displayName = it.name;
				if (it.isPyramid && it.affixName) {
					displayName = `<span style="color: ${it.affixColor};">${it.affixName}</span>${it.name}`;
				}
				
				return `<span style="color: ${color}; font-weight: bold;">${displayName}</span>${attr}`;
		}

		// 顯示/更新裝備面板（簡易介面），可選 filterSlot: 'weapon'|'armor'|'amulet' 或 null
		showEquipmentPanel(filterSlot = null) {
			const panel = document.getElementById('equipment-panel');
			const content = document.getElementById('equip-content');
			if (!panel || !content) return;
			// 列出目前裝備與背包
			let html = `<div><strong>${t('equipped')}</strong></div>`;
			const noneText = t('none');
			const weapText = this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : noneText;
			const armText = this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : noneText;
			const amuText = this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : noneText;
			html += `<div>${t('weapon')}: ${weapText} <button class="unequip-inline" data-slot="weapon">${t('unequip')}</button> <button class="open-equip-inline" data-slot="weapon">${t('equip')}</button></div>`;
			html += `<div>${t('armor')}: ${armText} <button class="unequip-inline" data-slot="armor">${t('unequip')}</button> <button class="open-equip-inline" data-slot="armor">${t('equip')}</button></div>`;
			html += `<div>${t('amulet')}: ${amuText} <button class="unequip-inline" data-slot="amulet">${t('unequip')}</button> <button class="open-equip-inline" data-slot="amulet">${t('equip')}</button></div>`;
			
			// 顯示套裝效果
			const setBonus = this.getActiveSetBonus();
			if (setBonus) {
				const setParts = [];
				const atkLabel = currentLanguage === 'zh-TW' ? '攻' : currentLanguage === 'fr' ? 'ATT' : 'ATK';
				const defLabel = currentLanguage === 'zh-TW' ? '防' : currentLanguage === 'fr' ? 'DÉF' : 'DEF';
				const staminaLabel = currentLanguage === 'zh-TW' ? '體力' : currentLanguage === 'fr' ? 'End' : 'Stam';
				const combatLuckLabel = currentLanguage === 'zh-TW' ? '戰運' : currentLanguage === 'fr' ? 'Chance C' : 'Luck C';
				const goldLuckLabel = currentLanguage === 'zh-TW' ? '金運' : currentLanguage === 'fr' ? 'Chance O' : 'Luck G';
				const critLabel = currentLanguage === 'zh-TW' ? '暴擊' : currentLanguage === 'fr' ? 'Crit' : 'Crit';
				const comboLabel = currentLanguage === 'zh-TW' ? '連擊' : currentLanguage === 'fr' ? 'Combo' : 'Combo';
				const skillLabel = currentLanguage === 'zh-TW' ? '技能' : currentLanguage === 'fr' ? 'Comp' : 'Skill';
				const dodgeLabel = currentLanguage === 'zh-TW' ? '閃避' : currentLanguage === 'fr' ? 'Évit' : 'Dodge';
				
				if (setBonus.effects.atk) setParts.push(`${atkLabel}+${setBonus.effects.atk}`);
				if (setBonus.effects.def) setParts.push(`${defLabel}+${setBonus.effects.def}`);
				if (setBonus.effects.max_hp_bonus) setParts.push(`${t('hp')}+${setBonus.effects.max_hp_bonus}`);
				if (setBonus.effects.stamina_bonus) setParts.push(`${staminaLabel}+${setBonus.effects.stamina_bonus}`);
				if (setBonus.effects.luck_combat) setParts.push(`${combatLuckLabel}+${setBonus.effects.luck_combat}`);
				if (setBonus.effects.luck_gold) setParts.push(`${goldLuckLabel}+${setBonus.effects.luck_gold}`);
				if (setBonus.effects.crit_rate) setParts.push(`${critLabel}+${setBonus.effects.crit_rate}%`);
				if (setBonus.effects.combo_rate) setParts.push(`${comboLabel}+${setBonus.effects.combo_rate}%`);
				if (setBonus.effects.skill_power) setParts.push(`${skillLabel}+${setBonus.effects.skill_power}%`);
				if (setBonus.effects.dodge_rate) setParts.push(`${dodgeLabel}+${setBonus.effects.dodge_rate}%`);
				const rarityText = setBonus.rarity === 'rare' ? (currentLanguage === 'zh-TW' ? '精良' : currentLanguage === 'fr' ? 'Rare' : 'Rare') : setBonus.rarity === 'epic' ? (currentLanguage === 'zh-TW' ? '史詩' : currentLanguage === 'fr' ? 'Épique' : 'Epic') : '';
				html += `<hr/><div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 10px; border-radius: 6px; color: white; margin: 8px 0;"><strong>⚡ ${t('setBonus')}: ${setBonus.name} (${rarityText})</strong><br/>${setParts.join(' ')}</div>`;
			}
			html += `<hr/><div><strong>${t('inventory')}</strong></div>`;
			const inv = this.player.inventory;
			let shown = 0;
			for (let i=0;i<inv.length;i++){
				const it = inv[i];
				if (filterSlot && it.slot !== filterSlot) continue;
				shown++;
				const disp = this.formatItem(it) || `${it.name}`;
				html += `<div>${i+1}. ${disp} (${it.rarity}) <button data-idx="${i}" class="equip-now">${t('equip')}</button></div>`;
			}
			if (shown === 0) html += `<div>${t('noMatchingItems')}</div>`;
			content.innerHTML = html;
			panel.style.display = 'block';
			// 連結裝備按鈕
			setTimeout(() => {
				Array.from(content.querySelectorAll('.equip-now')).forEach(b=>{
					b.addEventListener('click', ()=>{
						const idx = parseInt(b.getAttribute('data-idx'));
						this.equipItem(idx);
						this.showEquipmentPanel(filterSlot);
					});
				});
				// 內嵌卸下/裝備按鈕（在面板內）
				Array.from(content.querySelectorAll('.unequip-inline')).forEach(b=>{
					b.addEventListener('click', ()=>{
						const slot = b.getAttribute('data-slot');
						this.unequipItem(slot);
						this.showEquipmentPanel(filterSlot);
					});
				});
				Array.from(content.querySelectorAll('.open-equip-inline')).forEach(b=>{
					b.addEventListener('click', ()=>{
						const slot = b.getAttribute('data-slot');
						this.showEquipmentPanel(slot);
					});
				});
			}, 50);
		}

	equipItem(index) {
		const it = this.player.inventory[index];
		if (!it) return;
		if (it.slot && this.player.equipment.hasOwnProperty(it.slot)) {
			// 檢查該槽位是否已有裝備，如果有則先卸下放回背包
			const oldEquipment = this.player.equipment[it.slot];
			if (oldEquipment) {
				// 移除舊裝備的屬性加成
				if (oldEquipment.luck_gold) {
					this.player.luck_gold = Math.max(0, this.player.luck_gold - (oldEquipment.luck_gold || 0));
				}
				if (oldEquipment.max_hp_bonus) {
					this.player.max_hp = Math.max(1, this.player.max_hp - oldEquipment.max_hp_bonus);
					this.player.hp = Math.min(this.player.max_hp, this.player.hp);
				}
				if (oldEquipment.stamina_bonus) {
					this.player.max_stamina = Math.max(1, this.player.max_stamina - oldEquipment.stamina_bonus);
					this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina);
				}
				// 將舊裝備放回背包
				this.player.inventory.push(oldEquipment);
				showMessage(`${t('unequipped')} ${oldEquipment.name}, ${t('addedToInventory')}.`);
			}
			
			// 裝備新物品
			this.player.equipment[it.slot] = it;
			showMessage(`${t('equipTo')} ${it.name} ${t('to')} ${it.slot}`);
			
			// 應用新裝備屬性加成
			if (it.luck_gold) {
				this.player.luck_gold += it.luck_gold;
				showMessage(`${t('gainedGoldLuck')} +${it.luck_gold}`);
			}
			if (it.max_hp_bonus) {
				this.player.max_hp += it.max_hp_bonus;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + it.max_hp_bonus);
				showMessage(`${t('maxHpBonus')} +${it.max_hp_bonus}`);
			}
			if (it.stamina_bonus) {
				this.player.max_stamina += it.stamina_bonus;
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + it.stamina_bonus);
				showMessage(`${t('maxStaminaBonus')} +${it.stamina_bonus}`);
			}
			// 從背包中移除新裝備
			this.player.inventory.splice(index,1);
			this.updateStatus();
		} else {
			showMessage(t('cannotEquip'));
		}
	}		unequipItem(slot) {
			if (!this.player.equipment || !this.player.equipment[slot]) { showMessage(t('noEquipmentInSlot')); return; }
		const it = this.player.equipment[slot];
		this.player.inventory.push(it);
		this.player.equipment[slot] = null;
		showMessage(`${t('unequipped')} ${it.name}, ${t('addedToInventory')}.`);
		// 移除裝備屬性加成
		if (it.luck_gold) {
			this.player.luck_gold = Math.max(0, this.player.luck_gold - (it.luck_gold||0));
			showMessage(`${t('goldLuckRemaining')} -${it.luck_gold}（${t('remaining')} ${this.player.luck_gold}）。`);
		}
		if (it.max_hp_bonus) {
			this.player.max_hp = Math.max(1, this.player.max_hp - it.max_hp_bonus);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp);
			showMessage(`${t('maxHpBonus')} -${it.max_hp_bonus}`);
		}
		if (it.stamina_bonus) {
			this.player.max_stamina = Math.max(1, this.player.max_stamina - it.stamina_bonus);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina);
			showMessage(`${t('maxStaminaBonus')} -${it.stamina_bonus}`);
		}
		this.updateStatus();
	}		updateStatus() {
			// 更新玩家狀態到左側面板
			const playerStatusEl = document.getElementById('player-status');
			const enemyStatusEl = document.getElementById('enemy-status');
			
			if (playerStatusEl) {
				// 計算 combo 顯示文字（若在戰鬥中）
				let comboText = '無';
			if (this.inBattle) {
				const sym = this.consecutivePrimarySymbol || '-';
				const count = this.consecutivePrimaryCount || 0;
				const mult = Math.max(1, count);
				comboText = `${sym} x${count} (x${mult})`;
			}				const playerPct = Math.max(0, Math.min(100, Math.floor((this.player.hp / this.player.max_hp) * 100)));
				
				// 計算經驗值進度
				const xpNeeded = this.xpForNext(this.player.level);
				const xpPct = this.player.level >= 99 ? 100 : Math.max(0, Math.min(100, Math.floor((this.player.xp / xpNeeded) * 100)));
				
				// 檢查套裝效果
				const setBonus = this.getActiveSetBonus();
				let setBonusHtml = '';
				if (setBonus) {
					const rarityText = setBonus.rarity === 'rare' ? '精良' : setBonus.rarity === 'epic' ? '史詩' : '';
					setBonusHtml = `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4px 8px; border-radius: 4px; color: white; font-size: 11px; margin: 4px 0;">⚡ ${setBonus.name} (${rarityText})</div>`;
				}
				
				playerStatusEl.innerHTML = `
					<div class="stat-label">${currentLanguage === 'zh-TW' ? '玩家' : currentLanguage === 'fr' ? 'Joueur' : 'Player'} Lv.${this.player.level}</div>
					<div class="hp-row">${t('hp')}: <span class="hp-text">${this.player.hp}/${this.player.max_hp}</span></div>
					<div class="hp-bar"><div class="hp-inner" style="width:${playerPct}%"></div></div>
					<div class="xp-row">${currentLanguage === 'zh-TW' ? '經驗' : currentLanguage === 'fr' ? 'XP' : 'XP'}: <span class="xp-text">${this.player.xp}/${xpNeeded === Infinity ? 'MAX' : xpNeeded}</span></div>
					<div class="xp-bar"><div class="xp-inner" style="width:${xpPct}%"></div></div>
                    <div class="stats-row">
                    	<div>${t('stamina')}: ${this.player.stamina}/${this.player.max_stamina}</div>
                    	<div>${currentLanguage === 'zh-TW' ? '護盾' : currentLanguage === 'fr' ? 'Bouclier' : 'Shield'}: ${this.player.shield}</div>
                    	<div>${currentLanguage === 'zh-TW' ? '藥水' : currentLanguage === 'fr' ? 'Potions' : 'Potions'}: ${this.player.potions}</div>
                    	<div>${currentLanguage === 'zh-TW' ? '金幣' : currentLanguage === 'fr' ? 'Or' : 'Gold'}: ${this.player.gold}</div>
                    	<div>${currentLanguage === 'zh-TW' ? '幸運(戰)' : currentLanguage === 'fr' ? 'Chance(C)' : 'Luck(C)'}: ${this.player.luck_combat}</div>
                    	<div>${currentLanguage === 'zh-TW' ? '幸運(金)' : currentLanguage === 'fr' ? 'Chance(O)' : 'Luck(G)'}: ${this.player.luck_gold}</div>
                	</div>
					${setBonusHtml}
					<div class="combo-row ${ (this.inBattle && (this.consecutivePrimaryCount||0) > 1) ? 'combo-active' : '' }">Combo: ${comboText}</div>
					<div class="equip-row">
						<div>${currentLanguage === 'zh-TW' ? '武器' : currentLanguage === 'fr' ? 'Arme' : 'Weapon'}: ${this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
						<div>${currentLanguage === 'zh-TW' ? '防具' : currentLanguage === 'fr' ? 'Armure' : 'Armor'}: ${this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
						<div>${currentLanguage === 'zh-TW' ? '護符' : currentLanguage === 'fr' ? 'Amulette' : 'Amulet'}: ${this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')} <button class="open-equip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button> <button class="unequip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button></div>
					</div>
				`;
			}
			
			// 更新敵人狀態到右側面板
			if (enemyStatusEl) {
				const enemyPct = this.enemy && this.enemy.max_hp ? Math.max(0, Math.min(100, Math.floor((this.enemy.hp / this.enemy.max_hp) * 100))) : 0;
				const enemyLabel = currentLanguage === 'zh-TW' ? '敵人' : currentLanguage === 'fr' ? 'Ennemi' : 'Enemy';
				const noneLabel = currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None';
				const attackCountdown = currentLanguage === 'zh-TW' ? '普攻倒數' : currentLanguage === 'fr' ? 'Attaque dans' : 'Attack in';
				const strength = currentLanguage === 'zh-TW' ? '強度' : currentLanguage === 'fr' ? 'Force' : 'Strength';
				
				// 根據敵人類型選擇對應圖片
				let enemyImage = '';
				if (this.inBattle && this.enemy.type) {
					if (this.enemy.type === 'monster') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m1.png" alt="普通敵人" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					} else if (this.enemy.type === 'elite') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m3.png" alt="菁英敵人" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					} else if (this.enemy.type === 'mini_boss') {
						enemyImage = '<div style="text-align: center; margin-top: 10px;"><img src="m4.png" alt="小頭目" style="width: 150px; opacity: 0.9; mix-blend-mode: multiply;"></div>';
					}
				}
				
				enemyStatusEl.innerHTML = `
					<div class="stat-label">${enemyLabel}</div>
					${this.inBattle ? `
						<div class="hp-row">${this.enemy.name || enemyLabel}  ${t('hp')}: <span class="hp-text">${this.enemy.hp}/${this.enemy.max_hp}</span></div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:${enemyPct}%"></div></div>
						${enemyImage}
						<div class="stats-row"><div>${attackCountdown}: ${this.enemy.turnsToAttack}</div><div>${strength}: x${(this.enemy.strength||1).toFixed(2)}</div></div>
					` : `
						<div class="hp-row">${noneLabel}</div>
						<div class="hp-bar"><div class="hp-inner enemy-hp" style="width:0%"></div></div>
					`}
				`;
			}
			// 同步更新側邊的簡短狀態摘要（作為備援顯示）
				const summary = document.getElementById('status-summary');
				if (summary) {
					summary.textContent = `HP:${this.player.hp}/${this.player.max_hp}  體力:${this.player.stamina}/${this.player.max_stamina}  金幣:${this.player.gold}  幸運(戰鬥):${this.player.luck_combat} 金幣幸運:${this.player.luck_gold}`;
				}
			// 裝備按鈕已通過事件委派處理，無需重複綁定
		const mapEl = document.getElementById('map-steps');
		if (mapEl) {
			if (this.inPyramid) {
				mapEl.textContent = `🔺 ${this.pyramidSteps}/${this.pyramidMaxSteps}`;
			} else {
				mapEl.textContent = Math.max(0, this.map_goal - this.map_steps);
			}
		}
	}
	
	// 生成方向提示（多支線版本）
	generateDirectionHints() {
		// 為每個方向預先決定事件和可能的支線
		const directions = {
			'前': this.generateBranchPath(),
			'左': this.generateBranchPath(),
			'右': this.generateBranchPath()
		};
		
		// 金字塔副本在前10步不出現
		if (!this.inPyramid && this.map_steps <= 10) {
			Object.keys(directions).forEach(dir => {
				if (directions[dir].main === 'pyramid') {
					directions[dir] = this.generateBranchPath();
					if (directions[dir].main === 'pyramid') {
						directions[dir].main = 'monster';
						directions[dir].branches = [];
					}
				}
			});
		}
		
		// 儲存當前方向事件映射
		this.currentDirections = directions;
		
		// 生成提示文字（使用多語言）
		const hints = {
			'monster': [t('hintBattle'), t('hintDust'), t('hintKilling'), t('hintRoar'), t('hintFootprints')],
			'elite': [t('hintPowerful'), t('hintGiantShadow'), t('hintDeepRoar'), t('hintDanger')],
			'mini_boss': [t('hintTemple'), t('hintTerror'), t('hintFootsteps'), t('hintHugeShadow')],
			'merchant': [t('hintCaravanBells'), t('hintTent'), t('hintSpices'), t('hintMerchantFlag')],
			'black_market': [t('hintMysteryDeal'), t('hintBlackTent'), t('hintBlackMarket'), t('hintMaskedMerchant')],
			'oasis': [t('hintWater'), t('hintGreen'), t('hintMoist'), t('hintPalms'), t('hintFreshWater')],
			'sandstorm': [t('hintSandstorm'), t('hintStrongWind'), t('hintWindSound'), t('hintDarkSky')],
			'buried_treasure': [t('hintStrangeMark'), t('hintAncientSign'), t('hintShining'), t('hintTreasure')],
			'pyramid': [t('hintPyramidTop'), t('hintAncientTemple'), t('hintStone'), t('hintMystery')],
			'dead_traveler': [t('hintDeadTraveler'), t('hintAbandonedItems'), t('hintOldBackpack'), t('hintTragedy')],
			'ancient_shrine': [t('hintShrine'), t('hintStatue'), t('hintHoly'), t('hintRune')],
			'caravan_rest': [t('hintCaravanRest'), t('hintLaughter'), t('hintCampfire'), t('hintFood')],
			'empty': [t('hintCalm'), t('hintNothing'), t('hintOnlyDesert'), t('hintPeaceful'), t('hintSilent')]
		};
		
		const directionTexts = {
			'前': t('dirFront'),
			'左': t('dirLeft'),
			'右': t('dirRight')
		};
		
		let message = this.inPyramid 
			? `${t('pyramidPassage')}\n` 
			: `${t('desertJourney')}\n`;
		
		Object.keys(directions).forEach(dir => {
			const eventPath = directions[dir];
			const event = eventPath.main;
			const hintPool = hints[event] || hints['empty'];
			const hint = hintPool[Math.floor(Math.random() * hintPool.length)];
			
			// 如果有支線，添加額外提示
			let branchHint = '';
			if (eventPath.branches && eventPath.branches.length > 0) {
				branchHint = ' ✨';
				if (eventPath.branches.length > 1) branchHint = ' ⭐';
			}
			
			// 根據語言調整格式
			if (currentLanguage === 'zh-TW') {
				message += `${directionTexts[dir]} ${hint}${branchHint}。\n`;
			} else {
				// 英文和法文：方向詞首字母大寫，提示已包含完整句子
				message += `${directionTexts[dir]} ${hint}${branchHint}.\n`;
			}
		});
		
		message += `\n${t('chooseDirection')}`;
		showMessage(message);
	}
	
	// 生成支線路徑（包含主事件和可能的分支）
	generateBranchPath() {
		const mainEvent = this.inPyramid ? this.choosePyramidEvent() : chooseEvent();
		const branches = [];
		
		// 30%機率觸發支線
		if (Math.random() < 0.3) {
			const branchType = this.chooseBranchType(mainEvent);
			branches.push(branchType);
		}
		
		// 10%機率觸發雙重支線
		if (Math.random() < 0.1 && branches.length > 0) {
			const secondBranch = this.chooseBranchType(mainEvent);
			if (secondBranch !== branches[0]) {
				branches.push(secondBranch);
			}
		}
		
		return { main: mainEvent, branches: branches };
	}
	
	// 根據主事件選擇合適的支線類型
	chooseBranchType(mainEvent) {
		const branchMap = {
			'monster': ['ambush', 'treasure_drop', 'ally_join', 'escape_route'],
			'elite': ['epic_loot', 'curse', 'power_surge', 'boss_insight'],
			'mini_boss': ['legendary_loot', 'god_blessing', 'ancient_power', 'hidden_passage'],
			'merchant': ['discount', 'rare_item', 'trade_quest', 'caravan_info'],
			'black_market': ['stolen_goods', 'black_contract', 'smuggler_route', 'forbidden_item'],
			'oasis': ['healing_spring', 'hidden_treasure', 'desert_guide', 'oasis_blessing'],
			'sandstorm': ['lost_items', 'shelter_find', 'storm_vision', 'sand_curse'],
			'pyramid': ['secret_chamber', 'pharaoh_curse', 'divine_trial', 'treasure_vault'],
			'ancient_shrine': ['god_trial', 'divine_gift', 'ancient_wisdom', 'curse_removal'],
			'buried_treasure': ['trap_avoid', 'double_loot', 'treasure_map', 'curse_item'],
			'dead_traveler': ['dying_wish', 'revenge_quest', 'inherited_skill', 'cursed_item'],
			'caravan_rest': ['trade_opportunity', 'rest_bonus', 'caravan_quest', 'guide_hire'],
			'empty': ['mirage', 'buried_cache', 'desert_spirit', 'quicksand']
		};
		
		const options = branchMap[mainEvent] || ['random_event'];
		return options[Math.floor(Math.random() * options.length)];
	}
	
	moveStep(direction) {
		// 如果沒有預設方向提示，生成新的
		if (!this.currentDirections) {
			this.generateDirectionHints();
			return; // 等待玩家選擇
		}
		
		// 根據選擇的方向獲取對應事件路徑
		const eventPath = this.currentDirections[direction];
		
		if (this.inPyramid) {
			// 金字塔副本模式
			this.pyramidSteps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}🔺 ${t('pyramidExploration')}: ${this.pyramidSteps}/${this.pyramidMaxSteps} ${t('steps')}`);
		} else {
			// 正常地圖模式
			this.map_steps += 1;
			showMessage(`${t('youChose')} ${direction} ${t('direction')}${t('movedSteps')} ${this.map_steps}/${this.map_goal} ${t('steps')}`);
		}
		
		// 清除當前方向映射
		this.currentDirections = null;
		
		// 處理主事件
		this.handleEvent(eventPath.main);
		
		// 處理支線事件
		if (eventPath.branches && eventPath.branches.length > 0) {
			this.handleBranchEvents(eventPath.branches);
		}
			
			// 檢查是否完成金字塔或正常地圖
			if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
				this.exitPyramid();
			} else if (!this.inPyramid && this.map_steps >= this.map_goal) {
				this.nextMap();
			}
			
			this.updateStatus();
			
			// 如果不是戰鬥事件且不在商店中，立即生成下一組方向提示
			if (!this.inBattle && !this.inShop) {
				this.generateDirectionHints();
			}
		}

		// 處理支線事件
		handleBranchEvents(branches) {
			branches.forEach(branch => {
				switch(branch) {
					case 'ambush':
						showMessage(t('branchAmbush'));
						if (!this.inBattle) this.battle('monster');
						break;
					case 'treasure_drop':
						showMessage(t('branchTreasureDrop'));
						this.gainGold(Math.floor(50 * this.difficulty * (1 + Math.random())));
						break;
					case 'ally_join':
						showMessage(t('branchAllyJoin'));
						this.tempAllyBonus = 0.2;
						break;
					case 'escape_route':
						showMessage(t('branchEscapeRoute'));
						this.canEscape = true;
						break;
					case 'epic_loot':
						showMessage(t('branchEpicLoot'));
						const epicItem = generateItem('epic', this.difficulty);
						this.inventory.push(epicItem);
						break;
					case 'curse':
						showMessage(t('branchCurse'));
						this.max_hp = Math.floor(this.max_hp * 0.9);
						this.hp = Math.min(this.hp, this.max_hp);
						break;
					case 'power_surge':
						showMessage(t('branchPowerSurge'));
						this.powerSurge = 3;
						break;
					case 'boss_insight':
						showMessage(t('branchBossInsight'));
						this.bossInsight = true;
						break;
					case 'legendary_loot':
						showMessage(t('branchLegendaryLoot'));
						const legendItem = generateItem('epic', this.difficulty + 2);
						this.inventory.push(legendItem);
						this.gainGold(200 * this.difficulty);
						break;
					case 'god_blessing':
						showMessage(t('branchGodBlessing'));
						this.godBlessing = true;
						this.calculateStats();
						break;
					case 'ancient_power':
						showMessage(t('branchAncientPower'));
						this.base_atk += 5;
						break;
					case 'hidden_passage':
						showMessage(t('branchHiddenPassage'));
						if (this.inPyramid) this.pyramidSteps += 3;
						else this.map_steps += 3;
						break;
					case 'discount':
						showMessage(t('branchDiscount'));
						this.merchantDiscount = 0.8;
						break;
					case 'rare_item':
						showMessage(t('branchRareItem'));
						// 商人事件會顯示額外稀有物品
						break;
					case 'healing_spring':
						showMessage(t('branchHealingSpring'));
						this.hp = this.max_hp;
						break;
					case 'hidden_treasure':
						showMessage(t('branchHiddenTreasure'));
						this.gainGold(100 * this.difficulty);
						const treasure = generateItem('rare', this.difficulty);
						this.inventory.push(treasure);
						break;
					case 'desert_guide':
						showMessage(t('branchDesertGuide'));
						this.hasGuide = 5;
						break;
					case 'oasis_blessing':
						showMessage(t('branchOasisBlessing'));
						this.oasisBlessing = true;
						break;
					case 'secret_chamber':
						showMessage(t('branchSecretChamber'));
						this.gainGold(300 * this.difficulty);
						break;
					case 'divine_trial':
						showMessage(t('branchDivineTrial'));
						this.divineTrial = true;
						break;
					case 'double_loot':
						showMessage(t('branchDoubleLoot'));
						this.gainGold(200 * this.difficulty);
						break;
					case 'curse_item':
						showMessage(t('branchCurseItem'));
						const cursedItem = generateItem('epic', this.difficulty);
						cursedItem.name = '詛咒的' + cursedItem.name;
						cursedItem.cursed = true;
						this.inventory.push(cursedItem);
						break;
					case 'revenge_quest':
						showMessage(t('branchRevengeQuest'));
						this.revengeQuest = true;
						break;
					case 'quicksand':
						showMessage(t('branchQuicksand'));
						this.gold = Math.max(0, this.gold - 50 * this.difficulty);
						break;
					default:
						showMessage(`${t('branchSpecialEvent')}: ${branch}`);
				}
			});
		}

		choosePyramidEvent() {
			// 金字塔內事件：更高的怪物遭遇率
			const pyramidEvents = ['monster', 'elite', 'mini_boss', 'oasis', 'empty'];
			const pyramidWeights = [35, 25, 15, 10, 15]; // 75% 戰鬥率
			const total = pyramidWeights.reduce((a,b)=>a+b,0);
			let r = Math.random() * total;
			for (let i=0,acc=0;i<pyramidWeights.length;i++){
				acc += pyramidWeights[i];
				if (r < acc) return pyramidEvents[i];
			}
			return 'monster';
		}

		nextMap() {
			showMessage(t('desertCleared'));
			this.map_steps = 0;
			this.difficulty += 1;
			this.map_goal += 5;
			this.updateStatus();
		}

		handleEvent(event) {
			if (event === 'monster' || event === 'elite' || event === 'mini_boss') {
				this.battle(event);
			} else if (event === 'merchant') {
				this.merchant();
			} else if (event === 'black_market') {
				this.blackMarket();
			} else if (event === 'oasis') {
				this.oasis();
			} else if (event === 'sandstorm') {
				this.sandstorm();
			} else if (event === 'egyptian_god') {
				this.godEvent();
			} else if (event === 'pyramid') {
				this.pyramid();
			} else if (event === 'buried_treasure') {
				this.buriedTreasure();
			} else if (event === 'dead_traveler') {
				this.deadTraveler();
			} else if (event === 'ancient_shrine') {
				this.ancientShrine();
			} else if (event === 'caravan_rest') {
				this.caravanRest();
			} else if (event === 'mirage') {
				this.mirage();
			} else if (event === 'nomad_camp') {
				this.nomadCamp();
			} else if (event === 'quicksand') {
				this.quicksand();
			} else if (event === 'scorpion_nest') {
				this.scorpionNest();
			} else if (event === 'ancient_ruins') {
				this.ancientRuins();
			} else if (event === 'mysterious_stranger') {
				this.mysteriousStranger();
			} else if (event === 'trading_post') {
				this.tradingPost();
			} else if (event === 'empty') {
				this.emptyEvent();
			} else {
				showMessage(t('nothingHappened'));
			}
		}

		battle(type) {
			// 進入戰鬥時強制停止自動旋轉與禁用 auto 按鈕
			try { stopAutoSpinLoop(); } catch(e) {}
			showMessage(`${t('encounterEnemy')} ${type}，${t('enterBattle')}`);
			// 設定戰鬥狀態與敵人屬性
			this.inBattle = true;
			// 切換到戰鬥音樂
			if (typeof MusicSystem !== 'undefined') {
				MusicSystem.switchTrack('battle');
			}
			// 儲存敵人類型（用於顯示對應圖片）
			this.enemy.type = type;
			// 產生敵人名稱
			this.enemy.name = genEnemyName(type);
			showMessage(`${t('encounterEnemyName')}${this.enemy.name}`);
			// 戰鬥開始時停用移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			// 根據類型調整敵人血量與普攻力
			// 金字塔內敵人隨地圖難度增強：HP x(3+難度*0.5), ATK x(2.5+難度*0.3), 強度x(1.5+難度*0.2)
			let hpMultiplier = this.inPyramid ? (3.0 + this.difficulty * 0.5) : 1.0;
			let atkMultiplier = this.inPyramid ? (2.5 + this.difficulty * 0.3) : 1.0;
			let strengthBonus = this.inPyramid ? (1.5 + this.difficulty * 0.2) : 1.0;
			
		if (type === 'elite') {
			this.enemy.max_hp = Math.floor((150 + 20 * this.difficulty) * hpMultiplier);
			this.enemy.baseAttack = Math.floor((15 + 5 * this.difficulty) * atkMultiplier);
			this.enemy.strength = 1.6 * strengthBonus;
		} else if (type === 'mini_boss') {
			// 金字塔小頭目難度降低20%
			const miniBossHpMult = this.inPyramid ? hpMultiplier * 0.8 : hpMultiplier;
			const miniBossAtkMult = this.inPyramid ? atkMultiplier * 0.8 : atkMultiplier;
			const miniBossStrMult = this.inPyramid ? strengthBonus * 0.8 : strengthBonus;
			this.enemy.max_hp = Math.floor((250 + 40 * this.difficulty) * miniBossHpMult);
			this.enemy.baseAttack = Math.floor((25 + 8 * this.difficulty) * miniBossAtkMult);
			this.enemy.strength = 2.4 * miniBossStrMult;
		} else {
			this.enemy.max_hp = Math.floor((100 + 10 * this.difficulty) * hpMultiplier);
			this.enemy.baseAttack = Math.floor((10 + 2 * this.difficulty) * atkMultiplier);
			this.enemy.strength = 1.0 * strengthBonus;
		}			if (this.inPyramid) {
				this.enemy.name += ` (金字塔-地圖${this.difficulty})`;
				showMessage(`${t('pyramidEnemyStrong')}${hpMultiplier.toFixed(1)}、${t('attackX')}${atkMultiplier.toFixed(1)}、${t('strengthX')}${strengthBonus.toFixed(1)}`);
			}
			this.enemy.hp = this.enemy.max_hp;
		this.enemy.turnsToAttack = 3;
		this.consecutivePrimarySymbol = null;
		this.consecutivePrimaryCount = 0;
		this.updateStatus();
		// 自動啟動插槽並在短延遲後停止（模擬自動戰鬥）
		startSpin();
		setTimeout(()=> {
			stopSequentially();
			// 在第一次旋轉結束後，使用全局函數啟用按鈕
			setTimeout(() => {
				if (typeof window.enableBattleButtons === 'function') {
					window.enableBattleButtons();
				}
			}, 200);
		}, 900);
	}		attemptFlee() {
			if (!this.inBattle) { showMessage('目前不在戰鬥中。'); return; }
			// 取消自動旋轉
			stopAutoSpinLoop();
			const fleeChance = Math.min(0.9, 0.4 + 0.02 * this.player.luck_combat);
			if (Math.random() < fleeChance) {
				showMessage('你成功逃離戰鬥！');
				this.inBattle = false;
				// 切換回探索音樂
				if (typeof MusicSystem !== 'undefined') {
					MusicSystem.switchTrack('exploration');
				}
				spinBtn.disabled = true;
				stopBtn.disabled = true;
				// 停止自動旋轉並禁用自動旋轉按鈕
				try { stopAutoSpinLoop(); } catch(e) {}
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
				this.enemy.hp = 0;
				this.updateStatus();
			} else {
				showMessage('逃跑失敗！敵人獲得一次攻擊機會！');
				setTimeout(()=>{ if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack(); }, 300);
			}
		}

		// 敵人自動普攻
		enemyAutoAttack() {
			// 計算基本攻擊並降低基礎傷害（較適合新手）
			const raw = this.enemy.baseAttack; // baseAttack 已依難度調整
			// 若玩家連續相同符號次數較多，敵人會略微提升回擊（風險），調整為線性倍率
			const extra = Math.max(0, this.consecutivePrimaryCount - 1) * 0.3; // 每連擊加30%回擊
			let dmg = Math.floor(raw * (1 + extra));
			// 玩家有閃避機會（由幸運值和護甲提供被動閃避）
			const armorDodge = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
			const dodgeChance = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100); // 最多 50% 閃避
			if (Math.random() < dodgeChance) {
				showMessage(`你閃避了敵人的自動普攻！(戰鬥幸運 ${this.player.luck_combat})`);
			} else {
				const consumedShield = Math.min(this.player.shield, dmg);
				const mitigated = Math.max(0, dmg - this.player.shield);
				this.player.shield -= consumedShield;
				this.player.hp -= mitigated;
				showMessage(`敵人自動普攻，造成 ${dmg} 傷害（護盾吸收 ${consumedShield}），玩家 HP -${mitigated}。`);
			}
			// 重置攻擊倒數
			this.enemy.turnsToAttack = 3;
			this.updateStatus();
		}

		merchant() {
			showMessage('遇到商隊：若資金足夠可補給藥水（50金/瓶）。');
			if (this.player.gold >= 50) {
				this.player.gold -= 50;
				this.player.potions += 1;
				showMessage('補給成功，藥水+1');
			} else {
				showMessage('金幣不足，無法購買補給。');
			}
		}

		blackMarket() {
			// 黑市商人：可購買裝備（普通到史詩），屬於賭博交易，最多購買兩件
			this.inShop = true; // 標記玩家進入商店
			showMessage('遇到黑市商人：能在黑市中獲得普通到史詩級裝備，此為賭博交易，最多購買兩件。');
			const panel = document.getElementById('blackmarket-panel');
			const itemsDiv = document.getElementById('blackmarket-items');
			if (!panel || !itemsDiv) {
				showMessage('（系統錯誤：黑市介面未載入）');
				return;
			}
			// 產生 3 個隨機供品（由普通到史詩）
			const rarityWeights = [{r:'common',w:60},{r:'rare',w:30},{r:'epic',w:10}];
			function pickRarity(){
				let total = rarityWeights.reduce((s,i)=>s+i.w,0);
				let r = Math.random()*total; let acc=0;
				for (const rw of rarityWeights){ acc+=rw.w; if (r<acc) return rw.r; }
				return 'common';
			}
			function cloneItem(base, rarity, isPyramid = false){
				const it = Object.assign({}, base);
				it.rarity = rarity;
				// 調整屬性幅度：rare +~1.5, epic +~2.2
				if (it.atk) it.atk = Math.max(1, Math.round(it.atk * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.def) it.def = Math.max(1, Math.round(it.def * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
				
				// 根據品質添加額外屬性
				if (rarity !== 'common' && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
					const bonusPool = QUALITY_BONUS[it.slot][rarity];
					if (bonusPool.length > 0) {
						const bonus = bonusPool[Math.floor(Math.random() * bonusPool.length)];
						Object.assign(it, bonus);
					}
				}
				
				// 金字塔裝備添加字綴
				if (isPyramid && rarity !== 'common') {
					const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
					it.affix = affix.id;
					it.affixName = affix.name;
					it.affixColor = affix.color;
					// 添加字綴屬性加成
					for (const key in affix.bonus) {
						if (it[key]) {
							it[key] += affix.bonus[key];
						} else {
							it[key] = affix.bonus[key];
						}
					}
					it.isPyramid = true;
				}
				return it;
			}
			const offers = [];
			for (let i=0;i<3;i++){
				const base = ITEMS[Math.floor(Math.random()*ITEMS.length)];
				const r = pickRarity();
				const o = cloneItem(base, r);
				// 隨機化價格：完全隨機，不透露品質
				o.price = 149 + Math.floor(Math.random() * 880); // 149..1028 隨機金額
				offers.push(o);
			}
			// 顯示面板
			itemsDiv.innerHTML = '';
			panel._purchased = 0;
			offers.forEach((it, idx)=>{
				const el = document.createElement('div');
				// 黑市商品：不顯示品質，只顯示名稱和隨機價格
				const goldText = currentLanguage === 'zh-TW' ? '金幣' : currentLanguage === 'fr' ? 'd\'or' : 'gold';
				el.innerHTML = `<div style="margin-bottom:6px;"><strong>${it.name}</strong> (?) <br/>`+
					`${t('price')}: ${it.price} ${goldText} <button class="bm-buy" data-idx="${idx}">${t('buy')}</button></div>`;
				itemsDiv.appendChild(el);
			});
			panel.style.display = 'block';
			// 綁定購買按鈕
			Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(b=>{
				b.addEventListener('click', ()=>{
					const idx = parseInt(b.getAttribute('data-idx'));
					if (panel._purchased >= 2) { showMessage(t('blackMarketLimit')); return; }
					const offer = offers[idx];
					if (!offer) return;
					if (game.player.gold < offer.price) { showMessage(t('notEnoughGold')); return; }
					// 扣款並加入背包
					game.player.gold -= offer.price;
					// 將真實物件加入背包，並揭露其屬性給玩家知曉
					game.player.inventory.push(Object.assign({}, offer));
					const goldText = currentLanguage === 'zh-TW' ? '金幣' : currentLanguage === 'fr' ? 'd\'or' : 'gold';
					showMessage(`${t('blackMarketBought')}: ${offer.name} (${offer.rarity}), ${t('spent')} ${offer.price} ${goldText}.`);
					// 揭露屬性
					let attrs = [];
					const atkLabel = currentLanguage === 'zh-TW' ? '攻' : currentLanguage === 'fr' ? 'ATT' : 'ATK';
					const defLabel = currentLanguage === 'zh-TW' ? '防' : currentLanguage === 'fr' ? 'DÉF' : 'DEF';
					const luckLabel = currentLanguage === 'zh-TW' ? '金運' : currentLanguage === 'fr' ? 'Chance Or' : 'Gold Luck';
					if (offer.atk) attrs.push(`${atkLabel}+${offer.atk}`);
					if (offer.def) attrs.push(`${defLabel}+${offer.def}`);
					if (offer.luck_gold) attrs.push(`${luckLabel}+${offer.luck_gold}`);
					if (attrs.length === 0) attrs.push(t('noSpecialAttributes'));
					showMessage(`${t('revealAttributes')}: ${attrs.join('  ')}`);
					panel._purchased += 1;
					// 標記按鈕為已購買
					b.textContent = t('purchased');
					b.disabled = true;
					game.updateStatus();
					if (panel._purchased >= 2) {
						showMessage(`${t('blackMarketLimit')} ${t('blackMarketEnd')}`);
						Array.from(itemsDiv.querySelectorAll('.bm-buy')).forEach(bb=>{ bb.disabled = true; });
					}
				});
			});
			// 關閉按鈕
			const close = document.getElementById('close-blackmarket');
			if (close && !close._bmBound) {
				close._bmBound = true;
				close.addEventListener('click', ()=>{ 
					panel.style.display = 'none'; 
					game.inShop = false; // 清除商店標記
					showMessage(t('leaveBlackMarket')); 
					// 恢復移動按鈕
					const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
					const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
					const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
					// 離開黑市後生成方向提示
					game.generateDirectionHints();
				});
			}
			// 停用移動以避免切換情境
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			this.updateStatus();
		}

	oasis() {
		const mapMultiplier = Math.pow(2, this.difficulty - 1);
		const hpGain = Math.floor(20 * mapMultiplier);
		const staminaGain = Math.floor(10 * mapMultiplier);
		showMessage(t('oasisFound'));
		this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
		this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
		showMessage(`HP +${hpGain}，體力 +${staminaGain}`);
	}	sandstorm() {
		showMessage(t('sandstormEncounter'));
		this.player.hp = Math.max(0, this.player.hp - 10);
		showMessage(`${t('sandstormDamage')} -10。`);
	}

	buriedTreasure() {
		showMessage(t('buriedTreasureFound'));
		const outcomes = [
			{ type: 'jackpot', weight: 25, name: '滿載黃金' },
			{ type: 'good', weight: 35, name: '不錯的收穫' },
			{ type: 'poor', weight: 30, name: '少量金幣' },
			{ type: 'nothing', weight: 10, name: '空罐或風化' }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}
		
		if (result.type === 'jackpot') {
			const baseGold = 200 + Math.floor(Math.random() * 300);
			const finalGold = Math.floor(baseGold * (1 + 0.15 * this.player.luck_gold));
			this.player.gold += finalGold;
			showMessage(`${t('treasureJackpot')} ${finalGold} ${t('goldCoins')}`);
			if (this.player.luck_gold > 0) {
				showMessage(`${t('goldLuckBonus')} +${Math.floor(baseGold * 0.15 * this.player.luck_gold)}）`);
			}
		} else if (result.type === 'good') {
			const baseGold = 80 + Math.floor(Math.random() * 120);
			const finalGold = Math.floor(baseGold * (1 + 0.15 * this.player.luck_gold));
			this.player.gold += finalGold;
			showMessage(`${t('treasureGood')} ${finalGold} ${t('goldCoins')}`);
		} else if (result.type === 'poor') {
			const gold = 20 + Math.floor(Math.random() * 40);
			this.player.gold += gold;
			showMessage(`${t('treasurePoor')} ${gold} ${t('goldCoins')}`);
		} else {
			const rnd = Math.random();
			if (rnd < 0.5) {
				showMessage(t('treasureEmpty'));
			} else {
				showMessage(t('treasureDecayed'));
			}
		}
	}

	deadTraveler() {
		showMessage(t('deadTravelerFound'));
		const outcomes = [
			{ type: 'equipment', weight: 40, name: '裝備' },
			{ type: 'gold_and_item', weight: 20, name: '金幣與物品' },
			{ type: 'gold', weight: 25, name: '金幣' },
			{ type: 'nothing', weight: 15, name: '一無所獲' }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}
		
		if (result.type === 'equipment') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const rarities = ['common', 'rare', 'epic'];
			const rarityWeights = [60, 30, 10];
			let rr = Math.random() * 100;
			let rarity = 'common';
			if (rr < 10) rarity = 'epic';
			else if (rr < 40) rarity = 'rare';
			const newItem = Object.assign({}, item, { rarity });
			this.player.inventory.push(newItem);
			showMessage(`⚔️ 你在遺體旁找到了 ${this.formatItem(newItem)}！`);
			showMessage('（已加入背包）');
		} else if (result.type === 'gold_and_item') {
			const gold = 50 + Math.floor(Math.random() * 100);
			this.player.gold += gold;
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const newItem = Object.assign({}, item, { rarity: 'common' });
			this.player.inventory.push(newItem);
			showMessage(`💰 你找到了 ${gold} 金幣和 ${newItem.name}！`);
		} else if (result.type === 'gold') {
			const gold = 30 + Math.floor(Math.random() * 70);
			this.player.gold += gold;
			showMessage(`💰 你在遺體旁找到了 ${gold} 金幣。`);
		} else {
			const rnd = Math.random();
			if (rnd < 0.4) {
				showMessage('🕊️ 你為旅人默哀，但身上已經沒有任何有價值的東西了。');
			} else if (rnd < 0.7) {
				showMessage('💨 遺體和裝備都已被風沙侵蝕，無法使用。');
			} else {
				showMessage('🦂 遺體周圍有毒蠍的痕跡，你謹慎地離開了，什麼也沒拿。');
				const damage = 5;
				this.player.hp = Math.max(1, this.player.hp - damage);
				showMessage(`（小心離開時受到輕傷 -${damage} HP）`);
			}
		}
	}

	emptyEvent() {
		const messages = [
			'你繼續前行，沒有遇到任何特別的事情。',
			'一陣風吹過沙丘，沒什麼特別的。',
			'你小心翼翼地前進，這段路程很平靜。',
			'遠處傳來駱駝的叫聲，但周圍空無一物。',
			'你在沙地上看到一些腳印，但主人早已不見蹤影。'
		];
		showMessage(messages[Math.floor(Math.random() * messages.length)]);
	}

	ancientShrine() {
		showMessage('🛕 你發現了一座古老的神殿廢墟...');
		const outcomes = [
			{ type: 'blessing', weight: 35 },
			{ type: 'treasure', weight: 25 },
			{ type: 'curse', weight: 20 },
			{ type: 'trap', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'blessing') {
			const blessings = [
				{ type: 'hp', value: 30 },
				{ type: 'stamina', value: 20 },
				{ type: 'luck_combat', value: 2 },
				{ type: 'luck_gold', value: 2 }
			];
			const blessing = blessings[Math.floor(Math.random() * blessings.length)];
			
			const mapMultiplier = Math.pow(2, this.difficulty - 1);
			if (blessing.type === 'hp') {
				const hpValue = Math.floor(blessing.value * mapMultiplier);
				this.player.max_hp += hpValue;
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpValue);
				showMessage(`✨ 神殿的祝福降臨！最大HP +${hpValue}`);
			} else if (blessing.type === 'stamina') {
				const staminaValue = Math.floor(blessing.value * mapMultiplier);
				this.player.max_stamina += staminaValue;
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaValue);
				showMessage(`${t('shrineBlessing')} +${staminaValue}`);
			} else if (blessing.type === 'luck_combat') {
				const luckValue = Math.floor(blessing.value * mapMultiplier);
				this.player.luck_combat += luckValue;
				showMessage(`✨ 神殿的祝福降臨！戰鬥幸運 +${luckValue}`);
			} else if (blessing.type === 'luck_gold') {
				const luckValue = Math.floor(blessing.value * mapMultiplier);
				this.player.luck_gold += luckValue;
				showMessage(`✨ 神殿的祝福降臨！金幣幸運 +${luckValue}`);
			}
		} else if (result.type === 'treasure') {
			const gold = 100 + Math.floor(Math.random() * 200);
			this.player.gold += gold;
			showMessage(`💎 你在神殿中找到了古老的寶藏！獲得 ${gold} 金幣。`);
		} else if (result.type === 'curse') {
			const curses = [
				'你觸碰了詛咒的雕像，感到身體虛弱。',
				'神殿的詛咒纏繞著你...',
				'你不小心打擾了亡靈的安息。'
			];
			showMessage(`⚠️ ${curses[Math.floor(Math.random() * curses.length)]}`);
			const damage = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`受到詛咒傷害 -${damage} HP`);
		} else {
			showMessage('💥 你觸發了古老的陷阱！');
			const damage = 20 + Math.floor(Math.random() * 20);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`陷阱造成 ${damage} 點傷害！`);
		}
	}

	caravanRest() {
		this.inShop = true; // 標記進入驛站
		showMessage('🐪 你遇到了一支商隊正在休息...');
		// 停用移動按鈕
		const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
		const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
		const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
		
		const outcomes = [
			{ type: 'trade', weight: 40 },
			{ type: 'gift', weight: 30 },
			{ type: 'info', weight: 20 },
			{ type: 'ambush', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'trade') {
			if (this.player.gold >= 60) {
				const choice = Math.random();
				if (choice < 0.5) {
					this.player.gold -= 60;
					this.player.potions += 2;
					showMessage('🧪 你向商隊購買了2瓶藥水（花費60金幣）');
				} else {
					this.player.gold -= 60;
					this.player.hp = this.player.max_hp;
					this.player.stamina = this.player.max_stamina;
					showMessage(t('caravanBuyFood'));
				}
			} else {
				showMessage('商隊願意交易，但你的金幣不足（需要60金幣）。');
			}
		} else if (result.type === 'gift') {
			const gifts = [
				{ type: 'gold', value: 50 },
				{ type: 'potion', value: 1 },
				{ type: 'food', hp: 30, stamina: 15 }
			];
			const gift = gifts[Math.floor(Math.random() * gifts.length)];
			
			if (gift.type === 'gold') {
				this.player.gold += gift.value;
				showMessage(`💰 商隊隊長贈送你一些金幣（+${gift.value}）以答謝你的到來。`);
			} else if (gift.type === 'potion') {
				this.player.potions += gift.value;
				showMessage('🧪 商隊贈送你一瓶藥水以表善意。');
			} else if (gift.type === 'food') {
				const mapMultiplier = Math.pow(2, this.difficulty - 1);
				const hpGain = Math.floor(gift.hp * mapMultiplier);
				const staminaGain = Math.floor(gift.stamina * mapMultiplier);
				this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
				this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
				showMessage(`${t('caravanGift')} HP +${hpGain}, ${t('stamina')} +${staminaGain}`);
			}
		} else if (result.type === 'info') {
			const mapMultiplier = Math.pow(2, this.difficulty - 1); // 第1章x1, 第2章x2, 第3章x4...
			const xp = Math.floor((20 + Math.floor(Math.random() * 30)) * mapMultiplier);
			this.addXP(xp);
			showMessage(`📜 商隊分享了沙漠中的生存經驗和地圖情報。獲得 ${xp} 經驗值。`);
		} else {
			showMessage('⚔️ 這是一群偽裝的盜賊！');
			this.inShop = false; // 遇到戰鬥，清除商店標記
			this.battle('monster');
			return; // 戰鬥時不恢復移動按鈕
		}
		
		// 非戰鬥結果：延遲後恢復移動並生成方向提示
		setTimeout(() => {
			this.inShop = false;
			showMessage('商隊繼續他們的旅程，你也該上路了。');
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			this.generateDirectionHints();
		}, 2000);
	}

	mirage() {
		showMessage(t('mirageAppear'));
		const outcomes = [
			{ type: 'oasis_real', weight: 25 },
			{ type: 'hallucination', weight: 40 },
			{ type: 'treasure_real', weight: 20 },
			{ type: 'danger', weight: 15 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'oasis_real') {
			showMessage(t('mirageReal'));
			this.player.hp = this.player.max_hp;
			this.player.stamina = this.player.max_stamina;
			const gold = 30 + Math.floor(Math.random() * 50);
			this.player.gold += gold;
			showMessage(`${t('mirageRecovery')} ${gold} ${t('goldCoins')}`);
		} else if (result.type === 'hallucination') {
			showMessage(t('mirageHallucination'));
			const staminaLoss = 10 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`${t('staminaLoss')} -${staminaLoss}`);
		} else if (result.type === 'treasure_real') {
			showMessage(t('mirageTreasure'));
			const gold = 80 + Math.floor(Math.random() * 120);
			this.player.gold += gold;
			showMessage(`${t('obtained')} ${gold} ${t('goldCoins')}`);
		} else {
			showMessage(t('mirageDanger'));
			const damage = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`${t('damageTaken')} -${damage} ${t('hp')}`);
		}
	}

	nomadCamp() {
		showMessage('⛺ 你遇到了一個遊牧民族的營地...');
		const outcomes = [
			{ type: 'healing', weight: 35 },
			{ type: 'trade_items', weight: 30 },
			{ type: 'quest', weight: 25 },
			{ type: 'hostile', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'healing') {
			const mapMultiplier = Math.pow(2, this.difficulty - 1);
			const hpGain = Math.floor(40 * mapMultiplier);
			const staminaGain = Math.floor(25 * mapMultiplier);
			showMessage('🏕️ 遊牧民熱情地接待了你，提供食物和休息。');
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
			showMessage(`HP +${hpGain}，體力 +${staminaGain}`);
		} else if (result.type === 'trade_items') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const newItem = Object.assign({}, item, { rarity: 'common' });
			this.player.inventory.push(newItem);
			showMessage(`🎁 遊牧民贈送你一件 ${newItem.name}（已加入背包）`);
		} else if (result.type === 'quest') {
			const mapMultiplier = Math.pow(2, this.difficulty - 1);
			const xp = Math.floor((30 + Math.floor(Math.random() * 40)) * mapMultiplier);
			const gold = 40 + Math.floor(Math.random() * 60);
			this.addXP(xp);
			this.player.gold += gold;
			showMessage('📖 遊牧民告訴你關於沙漠的古老傳說和秘密。');
			showMessage(`獲得 ${xp} 經驗值和 ${gold} 金幣。`);
		} else {
			showMessage('⚔️ 這個部落對外來者不友善！');
			this.battle('monster');
		}
	}

	quicksand() {
		showMessage('⚠️ 你踩到了流沙！');
		const outcomes = [
			{ type: 'escape', weight: 50 },
			{ type: 'struggle', weight: 30 },
			{ type: 'sink', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'escape') {
			showMessage('💨 你迅速脫離了流沙區域！');
			const staminaLoss = 5 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`消耗體力 -${staminaLoss}`);
		} else if (result.type === 'struggle') {
			showMessage(t('quicksandStruggle'));
			const hpLoss = 10 + Math.floor(Math.random() * 15);
			const staminaLoss = 15 + Math.floor(Math.random() * 15);
			this.player.hp = Math.max(1, this.player.hp - hpLoss);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`${t('hp')} -${hpLoss}, ${t('stamina')} -${staminaLoss}`);
		} else {
			showMessage('💀 你陷入流沙深處，幾乎要窒息！');
			const hpLoss = 25 + Math.floor(Math.random() * 25);
			this.player.hp = Math.max(1, this.player.hp - hpLoss);
			showMessage(`HP -${hpLoss}`);
			if (this.player.potions > 0 && Math.random() < 0.5) {
				this.player.potions -= 1;
				showMessage('🧪 在掙扎中不小心打破了一瓶藥水（-1藥水）');
			}
		}
	}

	scorpionNest() {
		showMessage('🦂 你無意中闖入了毒蠍的巢穴！');
		const outcomes = [
			{ type: 'avoid', weight: 35 },
			{ type: 'minor_sting', weight: 35 },
			{ type: 'serious_sting', weight: 20 },
			{ type: 'treasure', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'avoid') {
			showMessage('🏃 你小心地繞過毒蠍，成功避開了危險！');
		} else if (result.type === 'minor_sting') {
			showMessage('😣 你被毒蠍蜇了一下！');
			const damage = 8 + Math.floor(Math.random() * 12);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`受到毒素傷害 -${damage} HP`);
		} else if (result.type === 'serious_sting') {
			showMessage('💀 多隻毒蠍攻擊了你！');
			const damage = 20 + Math.floor(Math.random() * 20);
			this.player.hp = Math.max(1, this.player.hp - damage);
			const staminaLoss = 10 + Math.floor(Math.random() * 10);
			this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
			showMessage(`HP -${damage}，體力 -${staminaLoss}`);
		} else {
			showMessage('✨ 在躲避毒蠍時，你發現了牠們守護的寶藏！');
			const gold = 100 + Math.floor(Math.random() * 150);
			this.player.gold += gold;
			showMessage(`獲得 ${gold} 金幣！`);
		}
	}

	ancientRuins() {
		showMessage('🏛️ 你發現了一處古代遺跡...');
		const outcomes = [
			{ type: 'artifact', weight: 25 },
			{ type: 'inscription', weight: 30 },
			{ type: 'trap', weight: 25 },
			{ type: 'guardian', weight: 20 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'artifact') {
			const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
			const rarityRoll = Math.random();
			let rarity = 'common';
			if (rarityRoll < 0.15) rarity = 'epic';
			else if (rarityRoll < 0.45) rarity = 'rare';
			const newItem = Object.assign({}, item, { rarity });
			this.player.inventory.push(newItem);
			showMessage(`⚱️ 你在遺跡中找到了古代神器 ${this.formatItem(newItem)}！`);
		} else if (result.type === 'inscription') {
			const mapMultiplier = Math.pow(2, this.difficulty - 1);
			const xp = Math.floor((40 + Math.floor(Math.random() * 60)) * mapMultiplier);
			this.addXP(xp);
			showMessage(`📜 你研究了遺跡上的銘文，獲得了古老的知識。經驗值 +${xp}`);
		} else if (result.type === 'trap') {
			showMessage('💥 你觸發了遺跡的守護機關！');
			const damage = 15 + Math.floor(Math.random() * 25);
			this.player.hp = Math.max(1, this.player.hp - damage);
			showMessage(`受到 ${damage} 點傷害！`);
		} else {
			showMessage('👹 遺跡的守護者被喚醒了！');
			this.battle('elite');
		}
	}

	mysteriousStranger() {
		showMessage(t('strangerMet'));
		const outcomes = [
			{ type: 'gamble', weight: 30 },
			{ type: 'gift', weight: 25 },
			{ type: 'prophecy', weight: 20 },
			{ type: 'curse', weight: 15 },
			{ type: 'merchant', weight: 10 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'gamble') {
			if (this.player.gold >= 100) {
				showMessage(t('strangerGamble'));
				if (Math.random() < 0.5) {
					this.player.gold -= 100;
					showMessage(t('strangerGambleLost'));
				} else {
					this.player.gold += 100;
					showMessage(t('strangerGambleWon'));
				}
			} else {
				showMessage(t('strangerNoGold'));
				showMessage(t('strangerLeaves'));
			}
		} else if (result.type === 'gift') {
			const giftType = Math.random();
			if (giftType < 0.4) {
				const gold = 80 + Math.floor(Math.random() * 120);
				this.player.gold += gold;
				showMessage(`${t('strangerGiftGold')} ${gold} ${t('strangerDisappear')}`);
			} else if (giftType < 0.7) {
				this.player.potions += 2;
				showMessage(t('strangerGiftPotions'));
			} else {
				const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
				const newItem = Object.assign({}, item, { rarity: 'rare' });
				this.player.inventory.push(newItem);
				showMessage(`${t('strangerGiftItem')} ${this.formatItem(newItem)} ${t('strangerSmoke')}`);
			}
		} else if (result.type === 'prophecy') {
			const mapMultiplier = Math.pow(2, this.difficulty - 1);
			showMessage(t('strangerProphecy'));
			const prophecies = [
				{ text: t('prophecyCombat'), buff: 'combat' },
				{ text: t('prophecyGold'), buff: 'gold' },
				{ text: t('prophecyDefense'), buff: 'defense' }
			];
			const prophecy = prophecies[Math.floor(Math.random() * prophecies.length)];
			showMessage(prophecy.text);
			
			if (prophecy.buff === 'combat') {
				const luckValue = Math.floor(3 * mapMultiplier);
				this.player.luck_combat += luckValue;
				showMessage(`${t('combatLuck')} +${luckValue}`);
			} else if (prophecy.buff === 'gold') {
				const luckValue = Math.floor(3 * mapMultiplier);
				this.player.luck_gold += luckValue;
				showMessage(`${t('goldLuck')} +${luckValue}`);
			} else if (prophecy.buff === 'defense') {
				const shieldValue = Math.floor(30 * mapMultiplier);
				this.player.shield += shieldValue;
				showMessage(`${t('gainShield')} +${shieldValue}`);
			}
		} else if (result.type === 'curse') {
			showMessage(t('strangerCurse'));
			const curseType = Math.random();
			if (curseType < 0.5) {
				const goldLoss = Math.min(this.player.gold, 50 + Math.floor(Math.random() * 100));
				this.player.gold -= goldLoss;
				showMessage(`${t('curseGoldLoss')} -${goldLoss}！`);
			} else {
				const damage = 20 + Math.floor(Math.random() * 20);
				this.player.hp = Math.max(1, this.player.hp - damage);
				showMessage(`${t('curseHpLoss')} -${damage} HP！`);
			}
		} else {
			showMessage('🏪 陌生人原來是個特殊商人！');
			this.merchant();
		}
	}

	tradingPost() {
		showMessage('🏪 你發現了一個沙漠驛站！');
		showMessage('這裡可以補給物資，也可以出售你不需要的裝備。');
		
		// 禁用移動按鈕
		const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
		const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
		const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
		
		// 創建驛站面板
		const panel = document.createElement('div');
		panel.id = 'trading-post-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: linear-gradient(180deg, #fff9e6, #ffe4b3);
			border: 3px solid #d4a855;
			border-radius: 8px;
			padding: 12px;
			box-shadow: 0 8px 24px rgba(0,0,0,0.3);
			z-index: 100;
			width: 90vw;
			max-width: 450px;
			max-height: 85vh;
			overflow-y: auto;
		`;
		
		panel.innerHTML = `
			<h2 style="color: #8b4513; margin: 0 0 12px 0; text-align: center; font-size: 1.3em;">🏪 沙漠驛站</h2>
			
			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0; color: #d4a855; font-size: 1em;">💰 你的金幣: <span id="tp-gold">${this.player.gold}</span></h3>
			</div>
			
			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0 0 8px 0; color: #2ecc71; font-size: 1em;">🛒 補給物資</h3>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.9em;">
						<span>🧪 藥水 x1</span>
						<button class="tp-buy-btn" data-item="potion" data-price="50" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">50金幣</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.85em;">
						<span>🍖 食物（恢復30HP+15體力）</span>
						<button class="tp-buy-btn" data-item="food" data-price="40" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">40金幣</button>
					</div>
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; font-size: 0.85em;">
						<span>💊 完全恢復（HP+體力全滿）</span>
						<button class="tp-buy-btn" data-item="fullheal" data-price="80" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">80金幣</button>
					</div>
				</div>
			</div>
			
			<div style="background: #fff; padding: 8px; border-radius: 6px; margin-bottom: 10px;">
				<h3 style="margin: 0 0 8px 0; color: #e74c3c; font-size: 1em;">💼 出售裝備</h3>
				<div id="tp-inventory" style="max-height: 180px; overflow-y: auto;">
					<!-- 裝備列表將動態生成 -->
				</div>
			</div>
			
			<div style="text-align: center; margin-top: 10px;">
				<button id="tp-close" style="padding: 8px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em;">離開驛站</button>
			</div>
		`;
		
		document.body.appendChild(panel);
		
		// 生成背包裝備列表
		const updateInventory = () => {
			const invDiv = document.getElementById('tp-inventory');
			if (!invDiv) return;
			
			if (this.player.inventory.length === 0) {
				invDiv.innerHTML = `<div style="text-align: center; color: #999; padding: 20px;">${t('inventoryEmpty')}</div>`;
				return;
			}
			
			let html = '';
			this.player.inventory.forEach((item, idx) => {
				// 計算出售價格：根據稀有度
				let basePrice = 20;
				if (item.rarity === 'rare') basePrice = 80;
				else if (item.rarity === 'epic') basePrice = 200;
				
				// 根據屬性加成調整價格
				if (item.atk) basePrice += item.atk * 5;
				if (item.def) basePrice += item.def * 5;
				if (item.max_hp_bonus) basePrice += item.max_hp_bonus * 2;
				
				const rarityColor = item.rarity === 'epic' ? '#9b59b6' : (item.rarity === 'rare' ? '#3498db' : '#95a5a6');
				
				html += `
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #f8f8f8; border-radius: 4px; margin-bottom: 5px; border-left: 3px solid ${rarityColor};">
						<div style="flex: 1; min-width: 0;">
							<div style="font-weight: bold; font-size: 0.9em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</div>
							<div style="font-size: 0.75em; color: #666;">${item.rarity}</div>
						</div>
						<button class="tp-sell-btn" data-idx="${idx}" data-price="${basePrice}" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap; margin-left: 6px;">賣出 ${basePrice}金</button>
					</div>
				`;
			});
			invDiv.innerHTML = html;
			
			// 綁定出售按鈕
			Array.from(invDiv.querySelectorAll('.tp-sell-btn')).forEach(btn => {
				btn.addEventListener('click', () => {
					const idx = parseInt(btn.getAttribute('data-idx'));
					const price = parseInt(btn.getAttribute('data-price'));
					const item = this.player.inventory[idx];
					
					if (item) {
						this.player.inventory.splice(idx, 1);
						this.player.gold += price;
						showMessage(`💰 賣出 ${item.name}，獲得 ${price} 金幣。`);
						document.getElementById('tp-gold').textContent = this.player.gold;
						updateInventory();
						this.updateStatus();
					}
				});
			});
		};
		
		updateInventory();
		
		// 綁定購買按鈕
		Array.from(panel.querySelectorAll('.tp-buy-btn')).forEach(btn => {
			btn.addEventListener('click', () => {
				const item = btn.getAttribute('data-item');
				const price = parseInt(btn.getAttribute('data-price'));
				
				if (this.player.gold >= price) {
					this.player.gold -= price;
					
					if (item === 'potion') {
						this.player.potions += 1;
						showMessage('🧪 購買藥水 x1');
					} else if (item === 'food') {
						const mapMultiplier = Math.pow(2, this.difficulty - 1);
						const hpGain = Math.floor(30 * mapMultiplier);
						const staminaGain = Math.floor(15 * mapMultiplier);
						this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
						this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
						showMessage(`🍖 購買食物，HP +${hpGain}，體力 +${staminaGain}`);
					} else if (item === 'fullheal') {
						this.player.hp = this.player.max_hp;
						this.player.stamina = this.player.max_stamina;
						showMessage('💊 完全恢復！HP和體力全滿！');
					}
					
					document.getElementById('tp-gold').textContent = this.player.gold;
					this.updateStatus();
				} else {
					showMessage('❌ 金幣不足！');
				}
			});
		});
		
		// 關閉按鈕
		const closeBtn = document.getElementById('tp-close');
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				document.body.removeChild(panel);
				showMessage('你離開了驛站，繼續踏上旅程。');
				// 恢復移動按鈕
				if (mf) mf.disabled = false;
				if (ml) ml.disabled = false;
				if (mr) mr.disabled = false;
				// 生成方向提示
				this.generateDirectionHints();
			});
		}
	}

	godEvent() {
			showMessage('遇到古埃及神祇，獲得祝福或詛咒（隨機）。');
			if (Math.random() < 0.5) {
				let g = 50;
				if (this.player.luck_gold > 0) {
					const finalG = Math.floor(g * (1 + 0.1 * this.player.luck_gold));
					this.player.gold += finalG;
					showMessage(`獲得祝福：金幣 +${finalG}（含金幣幸運加成 x${this.player.luck_gold}）。`);
					this.player.luck_gold = Math.max(0, this.player.luck_gold - 1);
					showMessage(`金幣幸運 -1（剩餘 ${this.player.luck_gold}）。`);
				} else {
					this.player.gold += g;
					showMessage('獲得祝福：金幣 +50');
				}
			} else { this.player.hp = Math.max(1, this.player.hp - 15); showMessage('受到詛咒：HP -15'); }
		}

	pyramid() {
		showMessage('🔺 你發現了一座古老的金字塔！');
		showMessage('這裡充滿危險，但也蘊藏著巨大的寶藏...');
		showMessage('金字塔副本：8步探險，敵人強度極高（隨地圖提升），獎勵豐厚（15倍經驗/金幣），保證掉落優良以上裝備！');
		// 創建選擇面板
		this.showPyramidChoice();
	}		showPyramidChoice() {
			// 禁用移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;

			// 創建選擇對話框
			const panel = document.createElement('div');
			panel.id = 'pyramid-choice-panel';
			panel.style.cssText = `
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: linear-gradient(180deg, #fff9e6, #ffe4b3);
				border: 3px solid #d4a855;
				border-radius: 12px;
				padding: 24px;
				box-shadow: 0 8px 24px rgba(0,0,0,0.3);
				z-index: 100;
				min-width: 350px;
				text-align: center;
			`;

			panel.innerHTML = `
				<h2 style="color: #8b4513; margin-top: 0;">🔺 金字塔副本</h2>
				<p style="font-size: 1.1em; line-height: 1.6;">
					是否進入金字塔探險？
				</p>
				<div style="background: #fff; padding: 12px; border-radius: 6px; margin: 12px 0; border: 1px solid #ddd;">
					<strong>副本特性（地圖${this.difficulty}）：</strong><br>
					✦ 8步探險旅程<br>
					✦ 敵人強度極高（HP x${(3 + this.difficulty * 0.5).toFixed(1)}, ATK x${(2.5 + this.difficulty * 0.3).toFixed(1)}）<br>
					✦ 經驗值 x15 倍<br>
					✦ 金幣 x15 倍<br>
					✦ 保證掉落優良以上裝備<br>
				</div>
				<div style="display: flex; gap: 12px; justify-content: center; margin-top: 20px;">
					<button id="pyramid-enter-btn" style="
						padding: 12px 24px;
						font-size: 1.1em;
						background: linear-gradient(180deg, #e8b44c, #d4a02e);
						color: white;
						border: none;
						border-radius: 6px;
						cursor: pointer;
						font-weight: bold;
						box-shadow: 0 2px 6px rgba(0,0,0,0.2);
					">⚔️ 進入探險</button>
					<button id="pyramid-decline-btn" style="
						padding: 12px 24px;
						font-size: 1.1em;
						background: linear-gradient(180deg, #999, #777);
						color: white;
						border: none;
						border-radius: 6px;
						cursor: pointer;
						font-weight: bold;
						box-shadow: 0 2px 6px rgba(0,0,0,0.2);
					">🚶 離開</button>
				</div>
			`;

			document.body.appendChild(panel);

			// 綁定按鈕事件
			const enterBtn = document.getElementById('pyramid-enter-btn');
			if (enterBtn) {
				enterBtn.addEventListener('click', () => {
					this.enterPyramid();
					document.body.removeChild(panel);
				});
			}

			const declineBtn = document.getElementById('pyramid-decline-btn');
			if (declineBtn) {
				declineBtn.addEventListener('click', () => {
					showMessage('你決定不進入金字塔，繼續前行。');
					document.body.removeChild(panel);
					// 恢復移動按鈕
					if (mf) mf.disabled = false;
					if (ml) ml.disabled = false;
					if (mr) mr.disabled = false;
				});
			}
		}

		enterPyramid() {
			showMessage('⚡ 你踏入了金字塔深處...');
			showMessage('🔺 金字塔副本開始！你有 8 步探險機會。');
			this.inPyramid = true;
			this.pyramidSteps = 0;
			this.normalMapSteps = this.map_steps; // 儲存當前步數
			this.updateStatus();
			// 恢復移動按鈕
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
		}

		exitPyramid() {
			showMessage('🌅 你走出了金字塔，回到了沙漠中。');
			showMessage(`金字塔副本完成！探索了 ${this.pyramidSteps}/${this.pyramidMaxSteps} 步。`);
			this.inPyramid = false;
			this.pyramidSteps = 0;
			this.map_steps = this.normalMapSteps; // 恢復正常地圖步數
			this.updateStatus();
		}

		applySlotResults(results) {
			// 檢查戰鬥是否已結束，如果已結束則不處理結果
			if (!this.inBattle) {
				return;
			}
			// 以左邊第一格（results[0]）為主要符號，只計算從左邊開始的連續相同符號數
			const primary = results[0];
			let matchCount = 1; // 至少有第一格
			if (results[1] === primary) {
				matchCount = 2;
				if (results[2] === primary) {
					matchCount = 3;
				}
			}
			// 三格相同時額外2.5倍加成（相當於2格效果的2.5倍）
			const tripleBonus = matchCount === 3 ? 2.5 : 1;
			// 計算本回合的連續 combo（包含當前格）並顯示
			// 若上一回合主符號與本回合相同，previousCombo 為先前計數，effectiveCombo = previousCombo + 1
			const previousCombo = (this.inBattle && this.consecutivePrimarySymbol === primary) ? this.consecutivePrimaryCount : 0;
			const effectiveCombo = previousCombo + 1; // 包含當前這一回合
			// Combo 效果改為線性倍率：2次x2，3次x3，4次x4
			const comboMultiplier = effectiveCombo;
			// 簡短提示主要符號、匹配數與當前 combo
			const bonusMsg = matchCount === 3 ? '【三連加成 x2.5】' : '';
			showMessage(`主要符號：${primary}，匹配數：${matchCount}${bonusMsg}，連續 x${effectiveCombo}（乘數 x${comboMultiplier}）`);

			switch (primary) {
				case '⚔️': {
					// 計算暴擊機率（受戰鬥幸運影響），並套用暴擊倍率
					let baseDmg = 15 * matchCount; // 每格基礎 15
					// 套用三連加成
					baseDmg = Math.round(baseDmg * tripleBonus);
					// 套用 combo 乘數
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk;
					// 應用武器的暴擊率加成
					const weaponCritRate = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance = Math.min(0.5, 0.05 + 0.03 * this.player.luck_combat + weaponCritRate / 100); // 上限 50%
					let isCrit = Math.random() < critChance;
					let finalDmg = isCrit ? Math.floor(baseDmg * 1.5) : baseDmg;
					this.enemy.hp -= finalDmg;
					showMessage(`你發動普通攻擊 x${matchCount}${isCrit? '（暴擊）':''}，對敵人造成 ${finalDmg} 傷害。`);
					break;
				}
				case '⚡️': {
					let baseDmg = 25 * matchCount; // 每格基礎 25
					// 套用三連加成
					baseDmg = Math.round(baseDmg * tripleBonus);
					// 套用 combo 乘數
					baseDmg = Math.max(1, Math.round(baseDmg * comboMultiplier));
					const weaponAtk2 = this.player.equipment.weapon ? (this.player.equipment.weapon.atk || 0) : 0;
					baseDmg += weaponAtk2;
					// 應用武器的技能威力加成
					const weaponSkillPower = this.player.equipment.weapon ? (this.player.equipment.weapon.skill_power || 0) : 0;
					baseDmg = Math.floor(baseDmg * (1 + weaponSkillPower / 100));
					// 應用武器的暴擊率加成
					const weaponCritRate2 = this.player.equipment.weapon ? (this.player.equipment.weapon.crit_rate || 0) : 0;
					const critChance2 = Math.min(0.5, 0.04 + 0.03 * this.player.luck_combat + weaponCritRate2 / 100); // 技能略低基礎暴擊
					let isCrit2 = Math.random() < critChance2;
					let finalDmg2 = isCrit2 ? Math.floor(baseDmg * 1.6) : baseDmg;
					this.enemy.hp -= finalDmg2;
					// 技能消耗體力
					const staminaCost = 5 * matchCount;
					this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
					showMessage(`你使用技能 x${matchCount}${isCrit2? '（暴擊）':''}，對敵人造成 ${finalDmg2} 傷害，消耗體力 ${staminaCost}。`);
					break;
				}
				case '🛡️': {
					let shieldGain = 10 * matchCount; // 每格 +10 護盾
					// 套用三連加成
					shieldGain = Math.round(shieldGain * tripleBonus);
					shieldGain = Math.max(1, Math.round(shieldGain * comboMultiplier));
					this.player.shield += shieldGain;
					showMessage(`你獲得防禦 x${matchCount}（連擊 x${effectiveCombo}），護盾 +${shieldGain}。`);
					break;
				}
				case '🧪': {
					let hpGain = 30 * matchCount; // 每格 +30 HP
					// 套用三連加成
					hpGain = Math.round(hpGain * tripleBonus);
					hpGain = Math.max(1, Math.round(hpGain * comboMultiplier));
					this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
					// 同時恢復體力（每格 +15 體力）
					let staminaGain = 15 * matchCount;
					// 套用三連加成
					staminaGain = Math.round(staminaGain * tripleBonus);
					staminaGain = Math.max(1, Math.round(staminaGain * comboMultiplier));
					this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
					showMessage(`使用紅色水瓶 x${matchCount}（連擊 x${effectiveCombo}），回復 HP ${hpGain}、體力 ${staminaGain}。`);
					break;
				}
				case '⭐': {
					let luckGain = matchCount * tripleBonus; // 每格 +1 戰鬥幸運，三連x5
					this.player.luck_combat += luckGain;
					showMessage(`獲得戰鬥幸運 +${luckGain}，提高暴擊與閃避機率。`);
					break;
				}
				case '💀': {
					// 降低符號造成的直接傷害以利入門玩家
					let rawDmg = 10 * matchCount; // 調整為每格 10 傷害
					// 套用三連加成
					rawDmg = Math.round(rawDmg * tripleBonus);
					// 玩家有閃避機率（受幸運和護甲影響）
					const armorDodgeSkull = this.player.equipment.armor ? (this.player.equipment.armor.dodge_rate || 0) : 0;
					const dodgeChanceSkull = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodgeSkull / 100);
					if (Math.random() < dodgeChanceSkull) {
						showMessage(`你閃避了敵人符號攻擊（戰鬥幸運 ${this.player.luck_combat}）！`);
					} else {
						const consumedShield = Math.min(this.player.shield, rawDmg);
						const mitigated = Math.max(0, rawDmg - this.player.shield);
						this.player.shield -= consumedShield;
						this.player.hp -= mitigated;
						showMessage(`敵人攻擊 x${matchCount}，原始傷害 ${rawDmg}，護盾吸收 ${consumedShield}，實際受損 ${mitigated}。`);
					}
					break;
				}
				case '💰': {
					// 每格給予固定金幣（可再調整）
					const coinValue = 20;
					let got = coinValue * matchCount;
					// 套用三連加成
					got = Math.round(got * tripleBonus);
					got = Math.max(1, Math.round(got * comboMultiplier));
					this.player.gold += got;
					showMessage(`獲得金幣 ${got}（💰 x${matchCount}，連擊 x${effectiveCombo}）。`);
					break;
				}
				default: {
					// 其他符號暫無特殊主導效果
					showMessage('此符號沒有主要效果。');
					break;
				}
			}

				// 戰鬥相關：追蹤連續的主符號（combo）
				if (this.inBattle) {
					if (this.consecutivePrimarySymbol === primary) {
						this.consecutivePrimaryCount += 1;
					} else {
						this.consecutivePrimarySymbol = primary;
						this.consecutivePrimaryCount = 1;
					}
					showMessage(`目前連續主符號：${this.consecutivePrimarySymbol} x${this.consecutivePrimaryCount}`);

					// 先更新狀態與訊息顯示，確保插槽效果先呈現
					this.updateStatus();

					// 敵人回合倒數（若敵人尚未死亡）
					this.enemy.turnsToAttack -= 1;
					if (this.enemy.turnsToAttack <= 0 && this.enemy.hp > 0) {
						// 延遲觸發敵人普攻，讓插槽效果與訊息先完整呈現
						setTimeout(() => {
							// 檢查戰鬥仍在進行且敵人未死亡
							if (this.inBattle && this.enemy.hp > 0) this.enemyAutoAttack();
						}, 300);
					}

					// 若敵人死亡，結束戰鬥（立即處理）
					if (this.enemy.hp <= 0) {
						showMessage('你擊敗了敵人！戰鬥結束，獲得獎勵。');
						
						// 播放勝利音樂
						if (typeof MusicSystem !== 'undefined') {
							MusicSystem.playVictory();
						}
						
					// 定義 cloneItem 函數來正確處理裝備屬性加成
					const cloneItem = (base, rarity, isPyramid = false) => {
						const it = Object.assign({}, base);
						it.rarity = rarity;
						// 調整屬性幅度：rare +~1.5, epic +~2.2
						if (it.atk) it.atk = Math.max(1, Math.round(it.atk * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
						if (it.def) it.def = Math.max(1, Math.round(it.def * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
						if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
						if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
						if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * (rarity==='rare'?1.5: (rarity==='epic'?2.2:1))));
						
						// 根據品質添加額外屬性
						if (rarity !== 'common' && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
							const bonusPool = QUALITY_BONUS[it.slot][rarity];
							if (bonusPool.length > 0) {
								const bonus = bonusPool[Math.floor(Math.random() * bonusPool.length)];
								Object.assign(it, bonus);
							}
						}
						
						// 金字塔裝備添加字綴
						if (isPyramid && rarity !== 'common') {
							const affix = PYRAMID_AFFIXES[Math.floor(Math.random() * PYRAMID_AFFIXES.length)];
							it.affix = affix.id;
							it.affixName = affix.name;
							it.affixColor = affix.color;
							// 添加字綴屬性加成
							for (const key in affix.bonus) {
								if (it[key]) {
									it[key] += affix.bonus[key];
								} else {
									it[key] = affix.bonus[key];
								}
							}
							it.isPyramid = true;
						}
						
						return it;
					};						// 金字塔副本獎勵倍率（改為15倍）
						const pyramidMultiplier = this.inPyramid ? 15 : 1;
						
						// 敵人類型獎勵倍率（精英x2，小頭目x3）
						let enemyTypeMultiplier = 1;
						if (this.enemy.strength >= 2.4) { // mini_boss
							enemyTypeMultiplier = 3;
						} else if (this.enemy.strength >= 1.6) { // elite
							enemyTypeMultiplier = 2;
						}
						
						// 獎勵：根據難度給予金幣與經驗值
						const baseReward = 20 * this.difficulty;
						const reward = baseReward * pyramidMultiplier * enemyTypeMultiplier;
						this.player.gold += reward;
						
					let rewardMsg = `獲得金幣 ${reward}`;
					if (this.inPyramid) {
						rewardMsg = `🔺 金字塔獎勵 x${pyramidMultiplier}！獲得金幣 ${reward} (基礎 ${baseReward} x${pyramidMultiplier}`;
						if (enemyTypeMultiplier > 1) {
							rewardMsg += ` x${enemyTypeMultiplier}`;
						}
						rewardMsg += ')';
					} else if (enemyTypeMultiplier > 1) {
						rewardMsg += ` (基礎 ${baseReward} x${enemyTypeMultiplier})`;
					}
					showMessage(rewardMsg);						// 經驗值以難度與敵人強度計算
					const mapMultiplier = Math.pow(2, this.difficulty - 1); // 第1章x1, 第2章x2, 第3章x4...
					const baseXP = Math.floor(15 * this.difficulty * (this.enemy.strength || 1));
					const xpGain = Math.floor(baseXP * mapMultiplier * pyramidMultiplier * enemyTypeMultiplier);
					if (this.inPyramid) {
						showMessage(`🔺 金字塔經驗值 x${pyramidMultiplier}！`);
					}
					this.addXP(xpGain);						// 掉落機制
						let dropped = null;
						if (this.inPyramid) {
							// 金字塔保證掉落1-2件稀有/史詩裝備
							const dropCount = 1 + Math.floor(Math.random() * 2);
							showMessage(`🔺 金字塔寶藏！掉落 ${dropCount} 件裝備`);
							for (let i = 0; i < dropCount; i++) {
								// 70% rare, 30% epic
								const rarityRoll = Math.random();
								let targetRarity = rarityRoll < 0.3 ? 'epic' : 'rare';
								const candidateItems = ITEMS.filter(it => it.slot); // 只要有slot的
								if (candidateItems.length > 0) {
									const baseItem = candidateItems[Math.floor(Math.random() * candidateItems.length)];
									dropped = cloneItem(baseItem, targetRarity, true); // isPyramid=true
									this.player.inventory.push(dropped);
									showMessage(`  ✨ 獲得 ${this.formatItem(dropped)}`);
								}
							}
						} else {
							// 正常地圖掉落（精英和小頭目提高掉落率）
							let dropChance = 50; // 基礎50%掉落率
							let epicChance = 5;
							let rareChance = 15;
							
							if (enemyTypeMultiplier === 3) { // mini_boss
								dropChance = 100; // 100%掉落
								epicChance = 40; // 40% 史詩
								rareChance = 50; // 50% 稀有
								// 小頭目掉落1-2件
								const dropCount = 1 + Math.floor(Math.random() * 2);
								showMessage(`💎 小頭目掉落 ${dropCount} 件裝備！`);
								for (let i = 0; i < dropCount; i++) {
									const roll = Math.random() * 100;
									let rarity = 'common';
									if (roll < epicChance) rarity = 'epic';
									else if (roll < epicChance + rareChance) rarity = 'rare';
									
									const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
									dropped = cloneItem(baseItem, rarity);
									this.player.inventory.push(dropped);
									showMessage(`  獲得 ${this.formatItem(dropped)}`);
								}
							} else if (enemyTypeMultiplier === 2) { // elite
								dropChance = 85; // 85%掉落
								epicChance = 20; // 20% 史詩
								rareChance = 40; // 40% 稀有
								// 精英掉落1-2件
								const dropCount = 1 + Math.floor(Math.random() * 2);
								const dropRoll = Math.random() * 100;
								console.log(`Elite drop check: roll=${dropRoll}, chance=${dropChance}, count=${dropCount}`);
								if (dropRoll < dropChance) {
									showMessage(`⚔️ 精英掉落 ${dropCount} 件裝備！`);
									for (let i = 0; i < dropCount; i++) {
										const roll = Math.random() * 100;
										let rarity = 'common';
										if (roll < epicChance) rarity = 'epic';
										else if (roll < epicChance + rareChance) rarity = 'rare';
										
										const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
										dropped = cloneItem(baseItem, rarity);
										this.player.inventory.push(dropped);
										console.log(`Elite dropped item ${i+1}:`, dropped.name, rarity);
										showMessage(`  獲得 ${this.formatItem(dropped)}`);
									}
								} else {
									console.log('Elite drop failed:', dropRoll, '>=', dropChance);
								}
							} else {
								// 普通敵人掉落
								const roll = Math.random() * 100;
								let rarity = null;
								if (roll < epicChance) {
									rarity = 'epic';
								} else if (roll < epicChance + rareChance) {
									rarity = 'rare';
								} else if (roll < dropChance) {
									rarity = 'common';
								}
								if (rarity) {
									const baseItem = ITEMS[Math.floor(Math.random()*ITEMS.length)];
									dropped = cloneItem(baseItem, rarity);
									this.player.inventory.push(dropped);
									showMessage(`敵人掉落：${this.formatItem(dropped)}`);
								}
							}
						}
						// 戰鬥結束處理
						// 先停止自動旋轉，清除所有 timeout
						try { stopAutoSpinLoop(); } catch(e) {}
						
						// 設置戰鬥狀態為 false
						this.inBattle = false;
						// 切換回探索音樂
						if (typeof MusicSystem !== 'undefined') {
							MusicSystem.switchTrack('exploration');
						}
						
						// 禁用戰鬥相關按鈕
						spinBtn.disabled = true;
						stopBtn.disabled = true;
						
						// 禁用並重置自動旋轉按鈕
						const autoBtn = document.getElementById('auto-spin-btn'); 
						if (autoBtn) {
							autoBtn.disabled = true;
							autoBtn.textContent = '自動旋轉'; // 確保文字重置
							autoBtn.style.background = ''; // 重置背景色
						}
						
						// 啟用移動按鈕
						const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
						const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
						const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
						
						this.enemy.turnsToAttack = 3;
						
						// 戰鬥結束後生成新的方向提示
						this.generateDirectionHints();
					}
				}

		// 檢查敵人或玩家死亡
		// 已在戰鬥流程中處理敵人死亡與獎勵
		// 若玩家 HP 歸零，嘗試使用背包藥水復活；若無藥水則死亡
		if (this.player.hp <= 0) {
			if (this.player.potions > 0) {
				this.player.potions -= 1;
				this.player.hp = this.player.max_hp;
				this.player.stamina = this.player.max_stamina;
				showMessage(`HP 歸零，消耗一瓶藥水自動復活並回滿 HP/體力。剩餘藥水：${this.player.potions}`);
			} else {
				showMessage('你倒下了，遊戲結束。沒有藥水可用。請重新整理頁面以重玩。');
				// 停止自動旋轉
				try { stopAutoSpinLoop(); } catch(e) {}
				// 設置戰鬥狀態為 false
				this.inBattle = false;
				// 切換回探索音樂
				if (typeof MusicSystem !== 'undefined') {
					MusicSystem.switchTrack('exploration');
				}
				// 禁用按鈕
				spinBtn.disabled = true;
				stopBtn.disabled = true;
				// 禁用並重置自動旋轉按鈕
				const autoBtn = document.getElementById('auto-spin-btn'); 
				if (autoBtn) {
					autoBtn.disabled = true;
					autoBtn.textContent = '自動旋轉';
					autoBtn.style.background = '';
				}
			}
		}			this.updateStatus();
			
			// 在updateStatus後再次檢查戰鬥狀態，確保自動旋轉正確停止
			if (!this.inBattle && typeof stopAutoSpinLoop === 'function') {
				try { 
					stopAutoSpinLoop(); 
					// 強制禁用旋轉按鈕
					if (typeof spinBtn !== 'undefined') spinBtn.disabled = true;
					if (typeof stopBtn !== 'undefined') stopBtn.disabled = true;
				} catch(e) {
					console.error('強制停止自動旋轉失敗:', e);
				}
			}
		}
	}

	const game = new Game();
	game.updateStatus();
	
	// 顯示初始方向提示
	game.generateDirectionHints();
	
	// 全局遊戲引用
	window.game = game;
	
	// 如果音樂已啟用，嘗試播放（可能需要用戶互動）
	if (MusicSystem.isEnabled) {
		// 延遲播放以確保頁面完全載入
		setTimeout(() => {
			MusicSystem.play();
		}, 500);
	}

	// 控制旋轉的 interval
	const reelState = reels.map(()=>({interval:null, spinning:false}));

// 自動旋轉控制
let autoSpin = false;
let autoSpinTimer = null;
let autoSpinTimer2 = null; // 用於追蹤嵌套的第二個 timeout
let autoSpinActive = false;

function stopAutoSpinLoop() {
	autoSpin = false;
	// 清除所有可能的 timeout
	if (autoSpinTimer) { clearTimeout(autoSpinTimer); autoSpinTimer = null; }
	if (autoSpinTimer2) { clearTimeout(autoSpinTimer2); autoSpinTimer2 = null; }
	autoSpinActive = false;
	const btn = document.getElementById('auto-spin-btn'); 
	if (btn) {
		btn.textContent = '自動旋轉';
		// 強制移除可能的啟用狀態樣式
		btn.style.background = '';
		btn.classList.remove('active');
	}
}

function runAutoCycle() {
	// 每次執行前先檢查戰鬥狀態和 autoSpin 標記
	if (!autoSpin || !game.inBattle) { 
		autoSpinActive = false; 
		stopAutoSpinLoop();
		return; 
	}
	if (stopBtn && !stopBtn.disabled) {
		// currently stopping; schedule next attempt
		autoSpinTimer = setTimeout(runAutoCycle, 300);
		return;
	}
	if (!spinBtn.disabled && game.inBattle) {
		// 開始一次手動點擊流程（再次確認戰鬥狀態）
		spinBtn.click();
		const delay = 800 + Math.floor(Math.random()*600);
		autoSpinTimer = setTimeout(()=>{
			// 再次檢查是否需要停止
			if (!autoSpin || !game.inBattle) {
				stopAutoSpinLoop();
				return;
			}
			// 確保還在戰鬥中才點擊停止
			if (!stopBtn.disabled && game.inBattle) stopBtn.click();
			// schedule next cycle after slight pause to allow results
			autoSpinTimer2 = setTimeout(()=>{
				// 第三次檢查
				if (!autoSpin || !game.inBattle) {
					stopAutoSpinLoop();
					return;
				}
				runAutoCycle();
			}, 400);
		}, delay);
	} else {
		// 無法旋轉或不在戰鬥中，停止自動旋轉
		if (!game.inBattle) {
			stopAutoSpinLoop();
		} else {
			// 稍後重試
			autoSpinTimer = setTimeout(runAutoCycle, 500);
		}
	}
}

function startAutoSpinLoop() {
	if (autoSpinActive) return;
	autoSpinActive = true;
	runAutoCycle();
}

	function startSpin() {
		// 以快速改變 translateY 來模擬連續旋轉
		for (let i = 0; i < reels.length; i++) {
			const strip = reels[i].querySelector('.strip');
			if (!strip) continue;
			reelState[i].spinning = true;
			// 使用 requestAnimationFrame loop 來改變位置
			let speed = 30 + Math.random()*20; // px per frame-ish
			reelState[i].anim = {pos: parseFloat(strip.style.transform.replace(/[^-0-9.]/g,'')) || 0, speed};
			const loop = () => {
				if (!reelState[i].spinning) return;
				reelState[i].anim.pos += reelState[i].anim.speed;
				// 當 pos 超過一整組長度，回繞
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * 8; // repeats
				if (reelState[i].anim.pos >= totalHeight) reelState[i].anim.pos -= totalHeight;
				strip.style.transform = `translateY(-${reelState[i].anim.pos}px)`;
				reelState[i].raf = requestAnimationFrame(loop);
			};
			reelState[i].raf = requestAnimationFrame(loop);
		}
	}

	function stopSequentially() {
		// 禁用 stop 按鈕，依序停止每一軸
		stopBtn.disabled = true;
		const results = [];
		const targetSymbols = []; // 儲存每個輪軸的目標符號
		const stopOne = (index) => {
			return new Promise((resolve) => {
				// 隨機選擇一個符號作為目標
				const targetSymbol = pickWeightedSymbol();
				targetSymbols[index] = targetSymbol; // 儲存目標符號
				const strip = reels[index].querySelector('.strip');
				// 停止 spinning loop
				reelState[index].spinning = false;
				if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);

				// 計算目前 pos
				let currentPos = reelState[index].anim ? reelState[index].anim.pos : 0;
				const repeats = 8;
				const totalHeight = SYMBOLS.length * SYMBOL_HEIGHT * repeats;
				const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT; // one cycle height

				// 選擇目標符號
				const targetIdx = SYMBOLS.indexOf(targetSymbol);
				const symbolIndex = targetIdx >= 0 ? targetIdx : Math.floor(Math.random()*SYMBOLS.length);

				const extraRounds = Math.floor(Math.random()*3) + 1;

				// 高亮框在 top: 30px，高度 60px（覆蓋 30-90px）
				// 要讓符號 N 的頂部對齊到 30px：translateY(-(N * 60 + 30))
				// 即：strip 位置 = N * 60 + 30
				const baseCycle = Math.floor(currentPos / singleBlock);
				
				// 目標位置：符號索引 * 60 + 30（偏移到高亮框位置）
				let candidate = baseCycle * singleBlock + symbolIndex * SYMBOL_HEIGHT + 30;
				
				// 如果已經過了，移到下一個循環
				if (candidate <= currentPos) {
					candidate += singleBlock;
				}
				
				// 加上額外的旋轉圈數
				const targetPos = candidate + extraRounds * singleBlock;

				// 平滑轉到 targetPos
				const duration = 1000 + Math.random()*800; // ms
				const start = performance.now();
				const from = currentPos;
				const to = targetPos;

				const animateStop = (now) => {
					const t = Math.min(1, (now - start) / duration);
					const ease = 1 - Math.pow(1 - t, 3);
					const pos = from + (to - from) * ease;
					// 以 totalHeight 做模循環
					strip.style.transform = `translateY(-${pos % totalHeight}px)`;
					if (t < 1) requestAnimationFrame(animateStop);
					else {
						// 確保最終位置精確對齊到符號
						const finalPos = to % totalHeight;
						// 強制設定最終位置，確保符號對齊
						strip.style.transition = 'none';
						strip.style.transform = `translateY(-${finalPos}px)`;
						
						// 等待 DOM 更新後再記錄結果
						setTimeout(() => {
							// 直接使用預先決定的目標符號，確保顯示與結果一致
							results[index] = targetSymbol;
							console.log(`Reel ${index} stopped at symbol: ${targetSymbol}`);
							resolve();
						}, 100);
					}
				};
				requestAnimationFrame(animateStop);
			});
		};

		// 停第一軸，第一個停止後，第二第三軸直接停止（無動畫）
		stopOne(0).then(()=> {
			// 第二和第三軸直接停止，無延遲動畫
			const stopInstantly = (index) => {
				return new Promise((resolve) => {
					const targetSymbol = pickWeightedSymbol();
					targetSymbols[index] = targetSymbol; // 儲存目標符號
					const strip = reels[index].querySelector('.strip');
					reelState[index].spinning = false;
					if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);
					
					const targetIdx = SYMBOLS.indexOf(targetSymbol);
					const symbolIndex = targetIdx >= 0 ? targetIdx : 0;
					
					// 使用固定的循環位置（第2個循環），確保符號在可視範圍內
					const repeats = 8;
					const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT;
					const baseCycle = 2; // 固定使用第2個循環
					
					// 目標位置：符號頂部對齊到高亮框位置（30px）
					const finalPos = baseCycle * singleBlock + symbolIndex * SYMBOL_HEIGHT + 30;
					
					// 直接設定最終位置，不使用動畫，確保符號精確對齊
					strip.style.transition = 'transform 0.2s ease-out';
					strip.style.transform = `translateY(-${finalPos}px)`;
					
					// 等待動畫完成後確保位置正確
					setTimeout(() => {
						strip.style.transition = '';
						// 再次強制設定位置，確保符號對齊
						strip.style.transform = `translateY(-${finalPos}px)`;
						// 直接使用預先決定的目標符號，確保顯示與結果一致
						results[index] = targetSymbol;
						console.log(`Reel ${index} stopped at symbol: ${targetSymbol}`);
						resolve();
					}, 300);
				});
			};
			
			return Promise.all([stopInstantly(1), stopInstantly(2)]);
		}).then(()=> {
			// 再次等待確保所有動畫完成和DOM更新
			return new Promise(resolve => setTimeout(resolve, 200));
		}).then(()=> {
			// 從實際顯示位置讀取最終結果，確保顯示與判定一致
			console.log('=== Reading slot results from actual display ===');
			for (let i = 0; i < 3; i++) {
				const strip = reels[i].querySelector('.strip');
				if (!strip) {
					results[i] = targetSymbols[i] || '⚔️';
					console.log(`Reel ${i}: No strip found, using fallback ${results[i]}`);
					continue;
				}
				
				// 方法：直接檢查高亮框範圍內的符號元素
				const symbolElements = strip.querySelectorAll('.symbol');
				const reelRect = reels[i].getBoundingClientRect();
				const highlightTop = 30; // 高亮框頂部位置
				const highlightBottom = 90; // 高亮框底部位置（30 + 60）
				
				let foundSymbol = null;
				
				// 遍歷所有符號元素，找出在高亮框範圍內的
				symbolElements.forEach((el, idx) => {
					const elRect = el.getBoundingClientRect();
					const relativeTop = elRect.top - reelRect.top;
					const relativeBottom = relativeTop + el.offsetHeight;
					
					// 檢查符號是否在高亮框中央區域（允許±10px誤差）
					if (relativeTop >= highlightTop - 10 && relativeTop <= highlightTop + 10) {
						foundSymbol = el.textContent.trim();
						console.log(`Reel ${i}: Found symbol at idx=${idx}, top=${relativeTop.toFixed(1)}px, symbol=${foundSymbol}`);
					}
				});
				
				// 如果找到了符號，使用它；否則使用預定目標
				if (foundSymbol && SYMBOLS.includes(foundSymbol)) {
					results[i] = foundSymbol;
					console.log(`Reel ${i}: Using found symbol ${foundSymbol}`);
				} else {
					// 備用方案：從 translateY 計算
					const transform = strip.style.transform;
					const match = transform.match(/-?[\d.]+/);
					const currentPos = match ? parseFloat(match[0]) : 0;
					
					const singleBlock = SYMBOLS.length * SYMBOL_HEIGHT;
					const posInCycle = currentPos % singleBlock;
					let symbolIndex = Math.round((posInCycle - 30) / SYMBOL_HEIGHT);
					
					if (symbolIndex < 0) symbolIndex += SYMBOLS.length;
					symbolIndex = symbolIndex % SYMBOLS.length;
					
					results[i] = SYMBOLS[symbolIndex];
					console.log(`Reel ${i}: Using calculated symbol from pos=${currentPos.toFixed(1)}px -> ${results[i]}`);
				}
			}
			
			// 確保結果陣列完整
			console.log('Final results array:', results);
			if (results.length !== 3 || results.some(r => !r)) {
				console.error('Results array is incomplete:', results);
				// 如果結果不完整，使用 targetSymbols 作為備用
				for (let i = 0; i < 3; i++) {
					if (!results[i]) results[i] = targetSymbols[i] || '⚔️';
				}
			}
			showMessage(`插槽結果： ${results.join(' | ')}`);
			// 把結果傳給遊戲邏輯進行處理（attack/skill/defend/enemy）
			try {
				game.applySlotResults(results);
			} catch (e) {
				console.error(e);
			}
			
			// 檢查戰鬥是否已結束，如果已結束則停止自動旋轉
			if (!game.inBattle) {
				try { stopAutoSpinLoop(); } catch(e) {}
			}
			
			// 啟用 spin（如果還在戰鬥中）
			if (game.inBattle) {
				spinBtn.disabled = false;
			}
			stopBtn.disabled = true;
		});
	}
	
	// 事件
	spinBtn.addEventListener('click', ()=>{
		if (!game.inBattle) {
			showMessage('目前不在戰鬥中，無法使用旋轉。');
			return;
		}
		spinBtn.disabled = true;
		stopBtn.disabled = false;
		showMessage('開始旋轉...');
		startSpin();
	});

	stopBtn.addEventListener('click', ()=>{
		stopSequentially();
	});

	// 全局函數：啟用戰鬥按鈕
	window.enableBattleButtons = function() {
		if (game.inBattle) {
			spinBtn.disabled = false;
			const autoBtn = document.getElementById('auto-spin-btn');
			if (autoBtn) autoBtn.disabled = false;
		}
	};

	// 簡單的輸入處理（保留用戶原本的指令輸入框功能）
	button.addEventListener('click', function() {
		const cmd = input.value.trim();
		if (!cmd) { showMessage('請輸入指令。'); return; }
		showMessage(`你輸入了：${cmd}`);
		input.value = '';
	});

	input.addEventListener('keydown', function(e) {
		if (e.key === 'Enter') button.click();
	});

	// 移動按鈕
	const moveFront = document.getElementById('move-front');
	const moveLeft = document.getElementById('move-left');
	const moveRight = document.getElementById('move-right');
	if (moveFront) moveFront.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('前'); });
	if (moveLeft) moveLeft.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('左'); });
	if (moveRight) moveRight.addEventListener('click', ()=> { if (game.inBattle) { showMessage('目前在戰鬥中，無法移動。'); return; } game.moveStep('右'); });

	// 裝備按鈕行為
	const closeEquip = document.getElementById('close-equip');
	if (closeEquip) {
		closeEquip.addEventListener('click', ()=> { 
			const p = document.getElementById('equipment-panel'); 
			if (p) p.style.display = 'none'; 
		});
	}

		// 使用事件委派處理裝備按鈕，避免重複綁定
		document.addEventListener('click', function(e) {
			if (e.target.classList.contains('unequip-btn')) {
				const slot = e.target.getAttribute('data-slot');
				if (slot) game.unequipItem(slot);
			} else if (e.target.classList.contains('open-equip-btn')) {
				const slot = e.target.getAttribute('data-slot');
				if (slot) game.showEquipmentPanel(slot);
			}
		});

	// 自動旋轉與逃跑按鈕綁定
	const autoBtn = document.getElementById('auto-spin-btn');
	if (autoBtn) {
		autoBtn.addEventListener('click', ()=>{
			if (!game.inBattle) {
				showMessage('目前不在戰鬥中，無法使用自動旋轉。');
				return;
			}
			autoSpin = !autoSpin;
			autoBtn.textContent = autoSpin ? '停止自動' : '自動旋轉';
			if (autoSpin) startAutoSpinLoop(); else stopAutoSpinLoop();
		});
	}
	const fleeBtn = document.getElementById('flee-btn');
	if (fleeBtn) {
		fleeBtn.addEventListener('click', ()=>{ game.attemptFlee(); });
	}

	// 音樂控制按鈕
	const musicToggle = document.getElementById('music-toggle');
	const volumeSlider = document.getElementById('volume-slider');
	
	if (musicToggle) {
		musicToggle.addEventListener('click', ()=> {
			MusicSystem.toggle();
			updateUILanguage(); // 更新按鈕文字的多語言
		});
	}
	
	if (volumeSlider) {
		volumeSlider.addEventListener('input', (e) => {
			MusicSystem.setVolume(e.target.value);
			const volumeDisplay = document.getElementById('volume-display');
			if (volumeDisplay) {
				volumeDisplay.textContent = e.target.value + '%';
			}
		});
	}

	// 定期檢查戰鬥狀態，確保自動旋轉在戰鬥結束時停止
	setInterval(() => {
		if (!game.inBattle && autoSpin) {
			console.log('檢測到戰鬥已結束但自動旋轉未停止，強制停止');
			stopAutoSpinLoop();
		}
	}, 500); // 每500ms檢查一次	// 儲存/讀取功能
	const saveBtn = document.getElementById('save-btn');
	const loadBtn = document.getElementById('load-btn');

	if (saveBtn) {
		saveBtn.addEventListener('click', ()=> {
			try {
				const saveData = {
				player: game.player,
				enemy: game.enemy,
				inBattle: game.inBattle,
				consecutivePrimarySymbol: game.consecutivePrimarySymbol,
				consecutivePrimaryCount: game.consecutivePrimaryCount,
				map_steps: game.map_steps,
				map_goal: game.map_goal,
				difficulty: game.difficulty,
				inPyramid: game.inPyramid,
				pyramidSteps: game.pyramidSteps,
				pyramidMaxSteps: game.pyramidMaxSteps,
				normalMapSteps: game.normalMapSteps,
				timestamp: Date.now()
			};
			const saveString = JSON.stringify(saveData);
			localStorage.setItem('egypt_adventures_save', saveString);
			
			// 驗證儲存是否成功
			const verify = localStorage.getItem('egypt_adventures_save');
			if (verify && verify === saveString) {
				const saveDate = new Date(saveData.timestamp);
				showMessage(`💾 遊戲已儲存！(等級 ${game.player.level}, 金幣 ${game.player.gold}, 時間 ${saveDate.toLocaleTimeString('zh-TW')})`);
			} else {
				showMessage('⚠️ 儲存可能失敗，請檢查瀏覽器設定是否允許 localStorage');
			}
			} catch (e) {
				showMessage('❌ 儲存失敗：' + e.message);
				console.error('Save error:', e);
			}
		});
	}

	if (loadBtn) {
		loadBtn.addEventListener('click', ()=> {
			try {
				const saveData = localStorage.getItem('egypt_adventures_save');
			if (!saveData) {
				showMessage('❌ 找不到存檔！請先點擊「儲存」按鈕建立存檔。');
				return;
			}
			console.log('Load data length:', saveData.length);
			const data = JSON.parse(saveData);
			
			// 還原玩家狀態
			game.player = data.player;
			game.enemy = data.enemy;
			game.inBattle = data.inBattle;
			game.consecutivePrimarySymbol = data.consecutivePrimarySymbol;
			game.consecutivePrimaryCount = data.consecutivePrimaryCount;
			game.map_steps = data.map_steps;
			game.map_goal = data.map_goal;
			game.difficulty = data.difficulty;
			game.inPyramid = data.inPyramid || false;
			game.pyramidSteps = data.pyramidSteps || 0;
			game.pyramidMaxSteps = data.pyramidMaxSteps || 8;
			game.normalMapSteps = data.normalMapSteps || 0;
			
			// 更新UI狀態
			if (game.inBattle) {
				spinBtn.disabled = false;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			} else {
				spinBtn.disabled = true;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			}
			
			game.updateStatus();
			const saveDate = new Date(data.timestamp);
			showMessage(`📂 讀取成功！存檔時間：${saveDate.toLocaleString('zh-TW')}`);
			} catch (e) {
				showMessage('❌ 讀取失敗：' + e.message);
			}
		});
	}

	// 初始歡迎訊息已放在頁面上方（#welcome-panel），不重複顯示在訊息區。

	// ============================================
	// DEBUG MODE - Press Ctrl+D to toggle
	// ============================================
	let debugMode = false;
	const debugPanel = createDebugPanel();

	function createDebugPanel() {
		const panel = document.createElement('div');
		panel.id = 'debug-panel';
		panel.style.cssText = `
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: rgba(0, 0, 0, 0.95);
			color: #0f0;
			font-family: 'Courier New', monospace;
			font-size: 13px;
			border: 2px solid #0f0;
			border-radius: 8px;
			padding: 20px;
			z-index: 10000;
			display: none;
			max-width: 600px;
			max-height: 80vh;
			overflow-y: auto;
			box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
		`;

		panel.innerHTML = `
			<h2 style="margin-top: 0; color: #0f0; text-align: center; text-shadow: 0 0 10px #0f0;">🛠️ DEBUG MODE 🛠️</h2>
			<div style="margin-bottom: 16px; padding: 8px; background: rgba(0, 255, 0, 0.1); border-radius: 4px;">
				<div style="margin-bottom: 4px;">快捷鍵: <strong>Ctrl+Shift+D</strong> 開關除錯面板</div>
				<div>修改數值後會立即套用到遊戲狀態</div>
			</div>
			
			<div class="debug-section">
				<h3>玩家狀態</h3>
				<div class="debug-input-row">
					<label>HP: <input type="number" id="debug-hp" /></label>
					<label>最大HP: <input type="number" id="debug-max-hp" /></label>
				</div>
				<div class="debug-input-row">
					<label>體力: <input type="number" id="debug-stamina" /></label>
					<label>最大體力: <input type="number" id="debug-max-stamina" /></label>
				</div>
				<div class="debug-input-row">
					<label>護盾: <input type="number" id="debug-shield" /></label>
					<label>藥水: <input type="number" id="debug-potions" /></label>
				</div>
				<div class="debug-input-row">
					<label>金幣: <input type="number" id="debug-gold" /></label>
					<label>等級: <input type="number" id="debug-level" /></label>
				</div>
				<div class="debug-input-row">
					<label>經驗值: <input type="number" id="debug-xp" /></label>
					<label>戰鬥幸運: <input type="number" id="debug-luck-combat" /></label>
				</div>
				<div class="debug-input-row">
					<label>金幣幸運: <input type="number" id="debug-luck-gold" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>地圖狀態</h3>
				<div class="debug-input-row">
					<label>已移動步數: <input type="number" id="debug-map-steps" /></label>
					<label>目標步數: <input type="number" id="debug-map-goal" /></label>
				</div>
				<div class="debug-input-row">
					<label>難度: <input type="number" id="debug-difficulty" /></label>
					<label>
						金字塔模式: 
						<input type="checkbox" id="debug-in-pyramid" />
					</label>
				</div>
				<div class="debug-input-row">
					<label>金字塔步數: <input type="number" id="debug-pyramid-steps" /></label>
				</div>
			</div>

			<div class="debug-section">
				<h3>戰鬥狀態</h3>
				<div class="debug-input-row">
					<label>
						進行中: 
						<input type="checkbox" id="debug-in-battle" />
					</label>
				</div>
				<div id="debug-enemy-section">
					<div class="debug-input-row">
						<label>敵人HP: <input type="number" id="debug-enemy-hp" /></label>
						<label>敵人最大HP: <input type="number" id="debug-enemy-max-hp" /></label>
					</div>
					<div class="debug-input-row">
						<label>敵人攻擊: <input type="number" id="debug-enemy-attack" /></label>
						<label>攻擊倒數: <input type="number" id="debug-enemy-turns" /></label>
					</div>
					<div class="debug-input-row">
						<label>敵人強度: <input type="number" step="0.1" id="debug-enemy-strength" /></label>
					</div>
				</div>
			</div>

			<div class="debug-section">
				<h3>快速操作</h3>
				<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
					<button class="debug-btn" id="debug-heal-full">完全恢復</button>
					<button class="debug-btn" id="debug-add-gold">+1000金幣</button>
					<button class="debug-btn" id="debug-level-up">升級</button>
					<button class="debug-btn" id="debug-kill-enemy">秒殺敵人</button>
					<button class="debug-btn" id="debug-add-item">隨機裝備</button>
					<button class="debug-btn" id="debug-start-battle">開始戰鬥</button>
					<button class="debug-btn" id="debug-end-battle">結束戰鬥</button>
					<button class="debug-btn" id="debug-enter-pyramid">進入金字塔</button>
				</div>
			</div>

			<div style="margin-top: 16px; text-align: center;">
				<button class="debug-btn" id="debug-apply" style="background: #0a0; font-size: 1.1em; padding: 10px 20px;">套用變更</button>
				<button class="debug-btn" id="debug-close" style="background: #a00; font-size: 1.1em; padding: 10px 20px;">關閉</button>
			</div>
		`;

		// Add styles for debug panel elements
		const style = document.createElement('style');
		style.textContent = `
			.debug-section {
				margin: 16px 0;
				padding: 12px;
				background: rgba(0, 255, 0, 0.05);
				border: 1px solid rgba(0, 255, 0, 0.3);
				border-radius: 4px;
			}
			.debug-section h3 {
				margin: 0 0 12px 0;
				color: #0ff;
				font-size: 1.1em;
				text-shadow: 0 0 5px #0ff;
			}
			.debug-input-row {
				display: flex;
				gap: 12px;
				margin-bottom: 8px;
				flex-wrap: wrap;
			}
			.debug-input-row label {
				flex: 1;
				min-width: 120px;
				display: flex;
				align-items: center;
				gap: 8px;
			}
			.debug-input-row input[type="number"],
			.debug-input-row input[type="text"] {
				flex: 1;
				background: rgba(0, 255, 0, 0.1);
				border: 1px solid #0f0;
				color: #0f0;
				padding: 4px 8px;
				border-radius: 3px;
				font-family: 'Courier New', monospace;
			}
			.debug-input-row input[type="checkbox"] {
				width: 20px;
				height: 20px;
			}
			.debug-btn {
				background: rgba(0, 255, 0, 0.2);
				border: 1px solid #0f0;
				color: #0f0;
				padding: 6px 12px;
				border-radius: 4px;
				cursor: pointer;
				font-family: 'Courier New', monospace;
				font-weight: bold;
				transition: all 0.2s;
			}
			.debug-btn:hover {
				background: rgba(0, 255, 0, 0.4);
				box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
			}
			.debug-btn:active {
				transform: scale(0.95);
			}
		`;
		document.head.appendChild(style);

		document.body.appendChild(panel);
		return panel;
	}

	function loadDebugValues() {
		document.getElementById('debug-hp').value = game.player.hp;
		document.getElementById('debug-max-hp').value = game.player.max_hp;
		document.getElementById('debug-stamina').value = game.player.stamina;
		document.getElementById('debug-max-stamina').value = game.player.max_stamina;
		document.getElementById('debug-shield').value = game.player.shield;
		document.getElementById('debug-potions').value = game.player.potions;
		document.getElementById('debug-gold').value = game.player.gold;
		document.getElementById('debug-level').value = game.player.level;
		document.getElementById('debug-xp').value = game.player.xp;
		document.getElementById('debug-luck-combat').value = game.player.luck_combat;
		document.getElementById('debug-luck-gold').value = game.player.luck_gold;
		document.getElementById('debug-map-steps').value = game.map_steps;
		document.getElementById('debug-map-goal').value = game.map_goal;
		document.getElementById('debug-difficulty').value = game.difficulty;
		document.getElementById('debug-in-pyramid').checked = game.inPyramid;
		document.getElementById('debug-pyramid-steps').value = game.pyramidSteps;
		document.getElementById('debug-in-battle').checked = game.inBattle;
		document.getElementById('debug-enemy-hp').value = game.enemy.hp;
		document.getElementById('debug-enemy-max-hp').value = game.enemy.max_hp;
		document.getElementById('debug-enemy-attack').value = game.enemy.baseAttack;
		document.getElementById('debug-enemy-turns').value = game.enemy.turnsToAttack;
		document.getElementById('debug-enemy-strength').value = game.enemy.strength || 1;
	}

	function applyDebugChanges() {
		game.player.hp = parseInt(document.getElementById('debug-hp').value) || 0;
		game.player.max_hp = parseInt(document.getElementById('debug-max-hp').value) || 1;
		game.player.stamina = parseInt(document.getElementById('debug-stamina').value) || 0;
		game.player.max_stamina = parseInt(document.getElementById('debug-max-stamina').value) || 1;
		game.player.shield = parseInt(document.getElementById('debug-shield').value) || 0;
		game.player.potions = parseInt(document.getElementById('debug-potions').value) || 0;
		game.player.gold = parseInt(document.getElementById('debug-gold').value) || 0;
		game.player.level = parseInt(document.getElementById('debug-level').value) || 1;
		game.player.xp = parseInt(document.getElementById('debug-xp').value) || 0;
		game.player.luck_combat = parseInt(document.getElementById('debug-luck-combat').value) || 0;
		game.player.luck_gold = parseInt(document.getElementById('debug-luck-gold').value) || 0;
		game.map_steps = parseInt(document.getElementById('debug-map-steps').value) || 0;
		game.map_goal = parseInt(document.getElementById('debug-map-goal').value) || 30;
		game.difficulty = parseInt(document.getElementById('debug-difficulty').value) || 1;
		game.inPyramid = document.getElementById('debug-in-pyramid').checked;
		game.pyramidSteps = parseInt(document.getElementById('debug-pyramid-steps').value) || 0;
		
		const wasBattle = game.inBattle;
		game.inBattle = document.getElementById('debug-in-battle').checked;
		
		if (game.inBattle) {
			game.enemy.hp = parseInt(document.getElementById('debug-enemy-hp').value) || 0;
			game.enemy.max_hp = parseInt(document.getElementById('debug-enemy-max-hp').value) || 1;
			game.enemy.baseAttack = parseInt(document.getElementById('debug-enemy-attack').value) || 10;
			game.enemy.turnsToAttack = parseInt(document.getElementById('debug-enemy-turns').value) || 3;
			game.enemy.strength = parseFloat(document.getElementById('debug-enemy-strength').value) || 1;
			
			if (!wasBattle) {
				// Enable battle controls
				spinBtn.disabled = false;
				const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = false;
				const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
				const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
				const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;
			}
		} else if (wasBattle && !game.inBattle) {
			// Disable battle controls
			spinBtn.disabled = true;
			const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
		}
		
		game.updateStatus();
		showMessage('🛠️ Debug: 遊戲狀態已更新');
	}

	// Debug quick actions
	document.getElementById('debug-heal-full').addEventListener('click', () => {
		game.player.hp = game.player.max_hp;
		game.player.stamina = game.player.max_stamina;
		game.player.shield = 0;
		loadDebugValues();
		game.updateStatus();
		showMessage('🛠️ Debug: 完全恢復');
	});

	document.getElementById('debug-add-gold').addEventListener('click', () => {
		game.player.gold += 1000;
		loadDebugValues();
		game.updateStatus();
		showMessage('🛠️ Debug: +1000 金幣');
	});

	document.getElementById('debug-level-up').addEventListener('click', () => {
		game.player.level += 1;
		game.player.max_hp += 10;
		game.player.max_stamina += 5;
		game.player.hp = Math.min(game.player.max_hp, game.player.hp + 10);
		game.player.stamina = Math.min(game.player.max_stamina, game.player.stamina + 5);
		loadDebugValues();
		game.updateStatus();
		showMessage('🛠️ Debug: 升級');
	});

	document.getElementById('debug-kill-enemy').addEventListener('click', () => {
		if (game.inBattle) {
			game.enemy.hp = 0;
			loadDebugValues();
			game.updateStatus();
			showMessage('🛠️ Debug: 敵人HP歸零');
		} else {
			showMessage('🛠️ Debug: 目前不在戰鬥中');
		}
	});

	document.getElementById('debug-add-item').addEventListener('click', () => {
		const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
		const rarities = ['common', 'rare', 'epic'];
		const rarity = rarities[Math.floor(Math.random() * rarities.length)];
		const newItem = Object.assign({}, item, { rarity });
		game.player.inventory.push(newItem);
		showMessage(`🛠️ Debug: 獲得 ${game.formatItem(newItem)}`);
	});

	document.getElementById('debug-start-battle').addEventListener('click', () => {
		if (!game.inBattle) {
			game.battle('monster');
			loadDebugValues();
			showMessage('🛠️ Debug: 強制開始戰鬥');
		} else {
			showMessage('🛠️ Debug: 已在戰鬥中');
		}
	});

	document.getElementById('debug-end-battle').addEventListener('click', () => {
		if (game.inBattle) {
			game.inBattle = false;
			spinBtn.disabled = true;
			stopBtn.disabled = true;
			try { stopAutoSpinLoop(); } catch(e) {}
			const autoBtn = document.getElementById('auto-spin-btn'); if (autoBtn) autoBtn.disabled = true;
			const mf = document.getElementById('move-front'); if (mf) mf.disabled = false;
			const ml = document.getElementById('move-left'); if (ml) ml.disabled = false;
			const mr = document.getElementById('move-right'); if (mr) mr.disabled = false;
			loadDebugValues();
			game.updateStatus();
			showMessage('🛠️ Debug: 強制結束戰鬥');
		} else {
			showMessage('🛠️ Debug: 目前不在戰鬥中');
		}
	});

	document.getElementById('debug-enter-pyramid').addEventListener('click', () => {
		if (!game.inPyramid) {
			game.enterPyramid();
			loadDebugValues();
			showMessage('🛠️ Debug: 進入金字塔');
		} else {
			showMessage('🛠️ Debug: 已在金字塔中');
		}
	});

	document.getElementById('debug-apply').addEventListener('click', () => {
		applyDebugChanges();
	});

	document.getElementById('debug-close').addEventListener('click', () => {
		debugPanel.style.display = 'none';
	});

	// Keyboard shortcut: Ctrl+Shift+D to toggle debug panel
	document.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.shiftKey && e.key === 'D') {
			e.preventDefault();
			debugMode = !debugMode;
			if (debugMode) {
				loadDebugValues();
				debugPanel.style.display = 'block';
				showMessage('🛠️ Debug模式已啟動 (Ctrl+Shift+D 關閉)');
			} else {
				debugPanel.style.display = 'none';
				showMessage('🛠️ Debug模式已關閉');
			}
		}
	});

	// Initial message about debug mode
	console.log('%c🛠️ DEBUG MODE AVAILABLE', 'color: #0f0; font-size: 16px; font-weight: bold;');
	console.log('%cPress Ctrl+Shift+D to toggle debug panel', 'color: #0ff; font-size: 14px;');
});

