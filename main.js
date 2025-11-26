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

	// 讀取並暴露版本號（從 index.html 的 #version-display）
	const _versionEl = document.getElementById('version-display');
	const APP_VERSION = _versionEl ? _versionEl.textContent.trim() : 'Version 1.0.0';
	window.APP_VERSION = APP_VERSION; // 全域可取用
	console.log('App Version:', APP_VERSION);
	
	// 初始化音樂系統
	MusicSystem.init();
	
	// 調試信息：顯示螢幕尺寸和符號設定
	console.log('=== 螢幕尺寸診斷 ===');
	console.log(`視口寬度: ${window.innerWidth}px`);
	console.log(`視口高度: ${window.innerHeight}px`);
	console.log(`設備像素比: ${window.devicePixelRatio}`);
	console.log(`符號高度: ${getSymbolHeight()}px`);
	console.log(`高亮框位置: ${getHighlightTop()}px`);
	console.log(`UserAgent: ${navigator.userAgent}`);

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
const EVENTS = ['monster', 'elite', 'mini_boss', 'merchant', 'black_market', 'oasis', 'sandstorm', 'egyptian_god', 'pyramid', 'buried_treasure', 'dead_traveler', 'ancient_shrine', 'caravan_rest', 'mirage', 'nomad_camp', 'quicksand', 'scorpion_nest', 'ancient_ruins', 'mysterious_stranger', 'trading_post', 'empty', 'lost_merchant', 'cursed_shrine', 'bandit_ambush', 'ancient_puzzle', 'desert_oasis', 'sandstorm_shelter', 'wandering_alchemist', 'ancient_tablet', 'beast_pack', 'moonlight_altar', 'caravan_wreckage'];
const EVENT_WEIGHTS = [22,8,4,7,4,6,8,4,6,6,6,5,8,4,5,5,4,5,4,6,2,4,4,6,5,5,5,5,4,6,4,5];

// 敵人圖片 Mapping
// 建議把圖片放在 `images/enemies/` 資料夾內，檔名可參考下方 key
const ENEMY_IMAGE_MAP = {
	monster: 'images/enemies/monster.png',
	elite: 'images/enemies/elite.png',
	mini_boss: 'images/enemies/mini_boss.png',
	bandit_ambush: 'images/enemies/bandit.png',
	scorpion_nest: 'images/enemies/scorpion.png',
	nomad_camp: 'images/enemies/nomad.png',
	beast_pack: 'images/enemies/beast_pack.png',
	caravan_wreckage: 'images/enemies/wreckage.png',
	default: 'images/enemies/monster.png'
};

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
	// 動態獲取符號高度，根據螢幕寬度適配（與 CSS 同步）
	function getSymbolHeight() {
		const width = window.innerWidth;
		// iPhone 15: 390px, iPhone 15 Plus: 428px, iPhone 15 Pro Max: 430px
		// 極小螢幕（<= 400px）使用 41px
		if (width <= 400) return 41;
		// 手機版（<= 600px）使用 60px
		if (width <= 600) return 60;
		// 桌面版使用 60px
		return 60;
	}
	// 動態獲取高亮框頂部位置（與 CSS 同步）
	function getHighlightTop() {
		const width = window.innerWidth;
		// 極小螢幕：41px 符號，高亮框在 20.5px
		if (width <= 400) return 20.5;
		// 其他：60px 符號，高亮框在 30px
		return 30;
	}

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

function genEnemyName(type, lang = typeof currentLanguage !== 'undefined' ? currentLanguage : 'zh-TW') {
	// 支援多語系與怪物類型分類的敵人名稱生成器
	// 依 type (monster/elite/mini_boss) 使用不同名稱庫以增加變化
	const pools = {
		'zh-TW': {
			monster: {
				prefixes: ['古夫','阿努','賽特','卡夫','諾姆','塔魯','哈姆','賽努','納菲','索拉','克普','莫特','賽克','巴克','圖恩'],
				suffixes: ['守衛','戰士','祭司','哨兵','弓手','游俠','傭兵','盜賊','掘墓者','巡邏兵','斥候','劍士','槍兵','刀客','拳士'],
				adjectives: ['沙塵','血眼','影之','石裔','夜行','盲目','沉默','荒野','蒼白','破爛','枯骨','迷途','殘破','低語','徘徊'],
				epithets: ['流浪者','哨兵','遊魂','追獵者','守夜者','拾荒者','迷失者','遺民']
			},
			elite: {
				prefixes: ['拉','荷魯斯','賽特','阿蒙','梅特','伊西斯','涅夫特','巴斯','克特','賽莉','索貝克','穆特','塞赫邁特','貝斯','凱布利'],
				suffixes: ['執行者','審判者','守護者','掠奪者','術士','牧師','裁決者','統領','征服者','復仇者','劊子手','督軍','血衛','影刃','鐵衛'],
				adjectives: ['狂怒','金甲','烈焰','寒霜','焚燒','骨語','古老','血月','幽冥','鋼鐵','猩紅','暗影','毀滅','雷霆','狂風'],
				epithets: ['征服','復仇','毀滅','屠戮','審判','制裁','暴怒','殲滅']
			},
			mini_boss: {
				prefixes: ['奧西里斯','阿努比斯','托特','拉','荷魯斯','賽特','普塔','阿頓','蓋布','努特','舒','泰芙努特','阿佩普','索貝克','塞赫邁特'],
				suffixes: ['霸主','領主','大君','王者','暴君','魔王','督主','宗主','戰神','裁決者','毀滅者','屠夫','魔將','血王','暗主'],
				adjectives: ['不朽','永恆','至高','無上','毀滅','末日','深淵','煉獄','天罰','滅世','弒神','破天','裂地','魔化','墮落'],
				epithets: ['不死者','永生者','吞噬者','覺醒者','統治者','終結者','君王','暴君']
			},
			title: { monster: '敵人', elite: '精英', mini_boss: '小頭目' }
		},
		'en': {
			monster: {
				prefixes: ['Khufu','Anu','Set','Kaf','Nomu','Taru','Ham','Senu','Nafi','Sora','Kep','Mot','Sek','Bak','Tun'],
				suffixes: ['Guard','Warrior','Priest','Sentinel','Archer','Ranger','Mercenary','Rogue','Gravedigger','Patrol','Scout','Swordsman','Spearman','Blade','Fist'],
				adjectives: ['Dust','Blood-eye','Shade','Stoneborn','Nightwalker','Blind','Silent','Wilderness','Pale','Tattered','Bone','Lost','Broken','Whisper','Wandering'],
				epithets: ['Wanderer','Sentinel','Wraith','Hunter','Watcher','Scavenger','Forsaken','Remnant']
			},
			elite: {
				prefixes: ['Ra','Horus','Set','Amon','Met','Isis','Nephthys','Bast','Khet','Seli','Sobek','Mut','Sekhmet','Bes','Khepri'],
				suffixes: ['Enforcer','Inquisitor','Warden','Plunderer','Warlock','Cleric','Justiciar','Commander','Conqueror','Avenger','Executioner','Warlord','Blood Guard','Shadow Blade','Iron Guard'],
				adjectives: ['Rage','Gold-plate','Flame','Frost','Burning','Bone-whisper','Ancient','Blood Moon','Nether','Steel','Crimson','Shadow','Doom','Thunder','Storm'],
				epithets: ['Conqueror','Avenger','Destroyer','Slayer','Judge','Punisher','Fury','Annihilator']
			},
			mini_boss: {
				prefixes: ['Osiris','Anubis','Thoth','Ra','Horus','Set','Ptah','Aten','Geb','Nut','Shu','Tefnut','Apophis','Sobek','Sekhmet'],
				suffixes: ['Overlord','Lord','Emperor','Sovereign','Tyrant','Demon King','High Lord','Grandmaster','War God','Arbiter','Annihilator','Butcher','Archfiend','Blood King','Dark Lord'],
				adjectives: ['Immortal','Eternal','Supreme','Ultimate','Doom','Apocalypse','Abyssal','Infernal','Divine Wrath','World-ender','Godslayer','Heaven-breaker','Earth-shatterer','Corrupted','Fallen'],
				epithets: ['Undying','Everlasting','Devourer','Awakened','Sovereign','Ender','Monarch','Despot']
			},
			title: { monster: 'Enemy', elite: 'Elite', mini_boss: 'Mini-Boss' }
		}
	};

	const langPool = pools[lang] || pools['zh-TW'];
	const typePool = langPool[type] || langPool.monster;

	// 隨機抽取
	const p = typePool.prefixes[Math.floor(Math.random() * typePool.prefixes.length)];
	const s = typePool.suffixes[Math.floor(Math.random() * typePool.suffixes.length)];
	const a = typePool.adjectives[Math.floor(Math.random() * typePool.adjectives.length)];
	const e = typePool.epithets[Math.floor(Math.random() * typePool.epithets.length)];

	const title = langPool.title[type] || langPool.title.monster;

	// 多樣化命名樣式，根據語言使用不同標點與格式
	const patterns = (lang === 'en') ? [
		() => `${p} ${s} ${title}`,
		() => `${a} ${p} ${s}`,
		() => `${p} ${s} the ${e}`,
		() => `${p} ${s}, ${a}`,
		() => `${p} ${s} (${e})`
	] : [
		() => `${p}${s} ${title}`,
		() => `${a}${p}${s}`,
		() => `${p}${s}·${e}`,
		() => `${p}${s}，${a}之名`,
		() => `${p}${s} ${title}（${e}）`
	];

	// 提高精英/頭目產生更霸氣名稱的機率
	let choiceIndex = Math.floor(Math.random() * patterns.length);
	if (type === 'elite' && Math.random() < 0.6) {
		choiceIndex = 2 + Math.floor(Math.random() * (patterns.length - 2));
	} else if (type === 'mini_boss' && Math.random() < 0.7) {
		choiceIndex = Math.max(0, patterns.length - 2) + Math.floor(Math.random() * 2);
	}

	return patterns[choiceIndex]();
}

// demo: 在遊戲中可呼叫 demoEnemyNames(lang, count) 顯示示例名稱
function demoEnemyNames(lang = typeof currentLanguage !== 'undefined' ? currentLanguage : 'zh-TW', count = 10) {
	const types = ['monster', 'elite', 'mini_boss'];
	for (let i = 0; i < count; i++) {
		const t = types[Math.floor(Math.random() * types.length)];
		const name = genEnemyName(t, lang);
		console.log(`${i+1}. [${t}] ${name}`);
		// 若頁面有訊息區，顯示前 8 個
		if (i < 8 && typeof showMessage === 'function') showMessage(`${i+1}. [${t}] ${name}`);
	}
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
		// 使用動態符號高度和高亮框位置
		const symbolHeight = getSymbolHeight();
		const initialOffset = symbolHeight * SYMBOLS.length * 2;
		// 確保 transform 設定正確，並清除任何可能的 CSS 預設值
		strip.style.transform = `translateY(-${initialOffset}px)`;
		strip.style.webkitTransform = `translateY(-${initialOffset}px)`;
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
			// 驛站追蹤：確保每張地圖至少出現一次
			this.hasEncounteredCaravanRest = false;
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
        
		// 計算閃避機率
		calculateDodgeChance(armorDodge) {
			const dodgeChance = Math.min(0.5, 0.03 + 0.02 * this.player.luck_combat + armorDodge / 100); // 最多 50% 閃避
			showMessage(`你閃避了敵人的自動攻擊！(戰鬥幸運 ${this.player.luck_combat})`);
			// 成功閃避後消耗一些戰鬥幸運，避免永久累積
			if (this.player.luck_combat && this.player.luck_combat > 0) {
				this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
				showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
			}
		}

		// Helper: 格式化物品屬性顯示
		formatItem(it) {
				if (!it) return '';
				const parts = [];
				if (it.atk) parts.push(`攻+${it.atk}`);
				if (it.def) parts.push(`防+${it.def}`);
				if (it.enhanceLevel) parts.unshift(`強化+${it.enhanceLevel}`);
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
				if (it.rarity === 'legendary') color = '#e67e22';
				else if (it.rarity === 'epic') color = '#9b59b6';
				else if (it.rarity === 'excellent') color = '#2ecc71';
				else if (it.rarity === 'rare') color = '#3498db'; // 稀有 藍色
				else if (it.rarity === 'excellent') color = '#2ecc71'; // 精良 綠色
				else if (it.rarity === 'epic') color = '#9b59b6'; // 史詩 紫色
				else if (it.rarity === 'legendary') color = '#e67e22'; // 傳說 橙色
				
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
				let rarityText = '';
				if (setBonus.rarity === 'rare') rarityText = currentLanguage === 'zh-TW' ? '稀有' : currentLanguage === 'fr' ? 'Rare' : 'Rare';
				else if (setBonus.rarity === 'excellent') rarityText = currentLanguage === 'zh-TW' ? '精良' : currentLanguage === 'fr' ? 'Excellent' : 'Excellent';
				else if (setBonus.rarity === 'epic') rarityText = currentLanguage === 'zh-TW' ? '史詩' : currentLanguage === 'fr' ? 'Épique' : 'Epic';
				else if (setBonus.rarity === 'legendary') rarityText = currentLanguage === 'zh-TW' ? '傳說' : currentLanguage === 'fr' ? 'Légendaire' : 'Legendary';
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
					let rarityText = '';
					if (setBonus.rarity === 'rare') rarityText = '稀有';
					else if (setBonus.rarity === 'excellent') rarityText = '精良';
					else if (setBonus.rarity === 'epic') rarityText = '史詩';
					else if (setBonus.rarity === 'legendary') rarityText = '傳說';
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
						<span class="equip-label">${currentLanguage === 'zh-TW' ? '武器' : currentLanguage === 'fr' ? 'Arme' : 'Weapon'}: ${this.player.equipment.weapon ? this.formatItem(this.player.equipment.weapon) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')}</span>
						<div class="equip-buttons">
							<button class="open-equip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button>
							<button class="unequip-btn" data-slot="weapon">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button>
						</div>
					</div>
					<div class="equip-row">
						<span class="equip-label">${currentLanguage === 'zh-TW' ? '防具' : currentLanguage === 'fr' ? 'Armure' : 'Armor'}: ${this.player.equipment.armor ? this.formatItem(this.player.equipment.armor) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')}</span>
						<div class="equip-buttons">
							<button class="open-equip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button>
							<button class="unequip-btn" data-slot="armor">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button>
						</div>
					</div>
					<div class="equip-row">
						<span class="equip-label">${currentLanguage === 'zh-TW' ? '護符' : currentLanguage === 'fr' ? 'Amulette' : 'Amulet'}: ${this.player.equipment.amulet ? this.formatItem(this.player.equipment.amulet) : (currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None')}</span>
						<div class="equip-buttons">
							<button class="open-equip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? '裝備' : currentLanguage === 'fr' ? 'Équiper' : 'Equip'}</button>
							<button class="unequip-btn" data-slot="amulet">${currentLanguage === 'zh-TW' ? '卸下' : currentLanguage === 'fr' ? 'Enlever' : 'Unequip'}</button>
						</div>
					</div>
				`;
			}
			
			// 更新敵人狀態到右側面板
			if (enemyStatusEl) {
				const enemyPct = this.enemy && this.enemy.max_hp ? Math.max(0, Math.min(100, Math.floor((this.enemy.hp / this.enemy.max_hp) * 100))) : 0;
				const enemyLabel = currentLanguage === 'zh-TW' ? '敵人' : currentLanguage === 'fr' ? 'Ennemi' : 'Enemy';
				const noneLabel = currentLanguage === 'zh-TW' ? '無' : currentLanguage === 'fr' ? 'Aucun' : 'None';
				const attackCountdown = currentLanguage === 'zh-TW' ? '攻擊倒數' : currentLanguage === 'fr' ? 'Attaque dans' : 'Attack in';
				const strength = currentLanguage === 'zh-TW' ? '強度' : currentLanguage === 'fr' ? 'Force' : 'Strength';
				
                // 根據敵人類型選擇對應圖片
                let enemyImage = '';
                if (this.inBattle && this.enemy.type) {
                    if (this.enemy.type === 'monster') {
                        enemyImage = '<div style="text-align: center; margin-top: 5px;"><img src="m1.png" alt="普通敵人" style="max-width: 100%; width: 120px; height: auto; opacity: 0.9; mix-blend-mode: multiply;"></div>';
                    } else if (this.enemy.type === 'elite') {
                        enemyImage = '<div style="text-align: center; margin-top: 5px;"><img src="m3.png" alt="菁英敵人" style="max-width: 100%; width: 120px; height: auto; opacity: 0.9; mix-blend-mode: multiply;"></div>';
                    } else if (this.enemy.type === 'mini_boss') {
                        enemyImage = '<div style="text-align: center; margin-top: 5px;"><img src="m4.png" alt="小頭目" style="max-width: 100%; width: 120px; height: auto; opacity: 0.9; mix-blend-mode: multiply;"></div>';
                    }
                }				enemyStatusEl.innerHTML = `
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
		// 處理綠洲祝福效果（自動恢復）
		if (this.player.oasisBlessing && this.player.oasisBlessing > 0) {
			const healAmount = Math.floor(this.player.max_hp * 0.05);
			const staminaAmount = Math.floor(this.player.max_stamina * 0.05);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + healAmount);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaAmount);
			this.player.oasisBlessing--;
			showMessage(`🌴 綠洲祝福：自動恢復 ${healAmount} HP 和 ${staminaAmount} 體力（剩餘 ${this.player.oasisBlessing} 次）`);
		}
		
		// 為每個方向預先決定事件和可能的支線
		const directions = {
			'前': this.generateBranchPath(),
			'左': this.generateBranchPath(),
			'右': this.generateBranchPath()
		};
		
		// 驛站保證機制：確保每張地圖至少出現一次驛站
		if (!this.inPyramid && !this.hasEncounteredCaravanRest) {
			const progressRatio = this.map_steps / this.map_goal;
			const dirKeys = Object.keys(directions);
			
			// 如果地圖進度超過60%還沒遇到驛站，強制其中一個方向出現驛站
			if (progressRatio >= 0.6) {
				const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
				directions[targetDir].main = 'caravan_rest';
				directions[targetDir].branches = [];
				showMessage('🏪 你感覺前方不遠處有驛站的氣息...');
			} else if (progressRatio >= 0.3 && Math.random() < 0.4) {
				// 地圖進度30%後，有40%機率在某個方向出現驛站
				const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
				directions[targetDir].main = 'caravan_rest';
			}
		}
		
		// 強盜情報效果：提高好事件機率
		if (this.player.banditInfo && this.player.banditInfo > 0) {
			const goodEvents = ['merchant', 'oasis', 'buried_treasure', 'ancient_shrine', 'caravan_rest', 'trading_post', 'desert_oasis'];
			// 將一個方向替換為好事件
			const dirKeys = Object.keys(directions);
			const targetDir = dirKeys[Math.floor(Math.random() * dirKeys.length)];
			const goodEvent = goodEvents[Math.floor(Math.random() * goodEvents.length)];
			directions[targetDir].main = goodEvent;
			showMessage(`🗺️ 強盜情報：你感覺${targetDir}方似乎有好東西...（剩餘 ${this.player.banditInfo} 次）`);
			this.player.banditInfo--;
		}
		
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
			'lost_merchant': ['🐪 迷失的商隊呼救聲', '商隊的旗幟在風中飄揚', '你聽到駱駝的哀鳴'],
			'cursed_shrine': ['⚠️ 不祥的氣息', '神殿散發詭異光芒', '低語聲從廢墟中傳來'],
			'bandit_ambush': ['⚔️ 沙丘後有人影移動', '刀劍碰撞的聲音', '你感覺被人盯上了'],
			'ancient_puzzle': ['🧩 神秘的石碑', '古老的象形文字', '謎題的氣息'],
			'desert_oasis': ['🌴 清新的水汽', '茂密的植被', '綠洲的芬芳', '生命的氣息'],
			// 針對「空」事件使用具體描述文字（避免顯示『什麼都沒有』）
			'empty': [
				t('hintEmpty1'),
				t('hintEmpty2'),
				t('hintEmpty3'),
				t('hintEmpty4'),
				t('hintEmpty5')
			]
		};
		
		// 指南針效果：顯示更詳細的提示
		const hasCompass = this.player.compassEffect && this.player.compassEffect > 0;
		
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
			// 過濾掉可能會顯示為「什麼都沒有」的翻譯字串（例如 t('hintNothing')），
			// 優先使用其他更有描述性的提示文字以改善玩家體驗。
			const filteredPool = hintPool.filter(h => {
				if (!h) return false;
				const normalized = String(h).trim();
				if (!normalized) return false;
				// 避免直接字面匹配已知的空提示（中文）或翻譯 key 的輸出
				if (normalized === t('hintNothing')) return false;
				if (normalized === '什麼都沒有') return false;
				return true;
			});
			// 若過濾後沒有任何可用提示，使用具體備援提示（中文句子）
			const finalPool = (filteredPool.length > 0) ? filteredPool : [
				t('hintEmptyFallback1'),
				t('hintEmptyFallback2'),
				t('hintEmptyFallback3')
			];
			const hint = finalPool[Math.floor(Math.random() * finalPool.length)];
			
			// 指南針效果：顯示事件類型
			let compassInfo = '';
			if (hasCompass) {
				const eventNames = {
					'monster': '普通敵人',
					'elite': '精英敵人',
					'mini_boss': '小頭目',
					'merchant': '商人',
					'black_market': '黑市',
					'oasis': '綠洲',
					'sandstorm': '沙塵暴',
					'pyramid': '金字塔',
					'buried_treasure': '寶藏',
					'dead_traveler': '旅者遺體',
					'ancient_shrine': '神殿',
					'caravan_rest': '驛站',
					'lost_merchant': '迷失商隊',
					'cursed_shrine': '詛咒神殿',
					'bandit_ambush': '強盜',
					'ancient_puzzle': '古老謎題',
					'desert_oasis': '沙漠綠洲',
					'trading_post': '交易站',
					'empty': '平靜路段'
				};
				compassInfo = ` 🧭[${eventNames[event] || event}]`;
			}
			
			// 如果有支線，添加額外提示
			let branchHint = '';
			if (eventPath.branches && eventPath.branches.length > 0) {
				branchHint = ' ✨';
				if (eventPath.branches.length > 1) branchHint = ' ⭐';
			}
			
			// 根據語言調整格式
			if (currentLanguage === 'zh-TW') {
				message += `${directionTexts[dir]} ${hint}${compassInfo}${branchHint}。\n`;
			} else {
				// 英文和法文：方向詞首字母大寫，提示已包含完整句子
				message += `${directionTexts[dir]} ${hint}${compassInfo}${branchHint}.\n`;
			}
		});
		
		// 消耗指南針效果
		if (hasCompass) {
			this.player.compassEffect--;
			if (this.player.compassEffect > 0) {
				showMessage(`🧭 沙漠指南針剩餘 ${this.player.compassEffect} 次使用`);
			} else {
				showMessage('🧭 沙漠指南針效果已消失');
			}
		}
		
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
            
            // 檢查是否完成金字塔或正常地圖（僅在非戰鬥狀態下執行，避免最後一步遇到敵人時提前離開）
            if (!this.inBattle) {
                if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
                    this.exitPyramid();
                } else if (!this.inPyramid && this.map_steps >= this.map_goal) {
                    this.nextMap();
                }
            }
            
            this.updateStatus();
            
            // 如果不是戰鬥事件且不在商店中，立即生成下一組方向提示
            if (!this.inBattle && !this.inShop) {
                this.generateDirectionHints();
            }
        }		// 處理支線事件
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
		// 重置驛站追蹤，確保新地圖會出現驛站
		this.hasEncounteredCaravanRest = false;
		this.updateStatus();
	}		handleEvent(event) {
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
				this.hasEncounteredCaravanRest = true;
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
			} else if (event === 'lost_merchant') {
				this.lostMerchant();
			} else if (event === 'cursed_shrine') {
				this.cursedShrine();
			} else if (event === 'bandit_ambush') {
				this.banditAmbush();
			} else if (event === 'ancient_puzzle') {
				this.ancientPuzzle();
			} else if (event === 'desert_oasis') {
				this.desertOasis();
			} else if (event === 'sandstorm_shelter') {
				this.sandstormShelter();
			} else if (event === 'wandering_alchemist') {
				this.wanderingAlchemist();
			} else if (event === 'ancient_tablet') {
				this.ancientTablet();
			} else if (event === 'beast_pack') {
				this.beastPack();
			} else if (event === 'moonlight_altar') {
				this.moonlightAltar();
			} else if (event === 'caravan_wreckage') {
				this.caravanWreckage();
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
			// 根據類型調整敵人血量與攻擊力
			// 金字塔內敵人隨地圖難度增強：HP x(3+難度*0.5), ATK x(2.5+難度*0.3), 強度x(1.5+難度*0.2)
			// 非金字塔：按使用者要求提升強度（strength +0.5）與血量加倍（HP x2）
			let hpMultiplier = this.inPyramid ? (3.0 + this.difficulty * 0.5) : 2.0;
			let atkMultiplier = this.inPyramid ? (2.5 + this.difficulty * 0.3) : 1.0;
			let strengthBonus = this.inPyramid ? (1.5 + this.difficulty * 0.2) : 1.5;
			
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

		// 敵人自動攻擊
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
				showMessage(`你閃避了敵人的自動攻擊！(戰鬥幸運 ${this.player.luck_combat})`);
				// 成功閃避後消耗一些戰鬥幸運，避免永久累積
				if (this.player.luck_combat && this.player.luck_combat > 0) {
					this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
					showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
				}
			} else {
				const consumedShield = Math.min(this.player.shield, dmg);
				const mitigated = Math.max(0, dmg - this.player.shield);
				this.player.shield -= consumedShield;
				this.player.hp -= mitigated;
				showMessage(`敵人自動攻擊，造成 ${dmg} 傷害（護盾吸收 ${consumedShield}），玩家 HP -${mitigated}。`);
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
			const rarityWeights = [{r:'common',w:40},{r:'rare',w:30},{r:'excellent',w:20},{r:'epic',w:8},{r:'legendary',w:2}];
			function pickRarity(){
				let total = rarityWeights.reduce((s,i)=>s+i.w,0);
				let r = Math.random()*total; let acc=0;
				for (const rw of rarityWeights){ acc+=rw.w; if (r<acc) return rw.r; }
				return 'common';
			}
			function cloneItem(base, rarity, isPyramid = false){
				const it = Object.assign({}, base);
				it.rarity = rarity;
						// 調整屬性幅度：根據稀有度選擇倍率
						const _scale = rarity === 'rare' ? 1.5 : (rarity === 'excellent' ? 1.8 : (rarity === 'epic' ? 2.2 : (rarity === 'legendary' ? 3.0 : 1)));
						if (it.atk) it.atk = Math.max(1, Math.round(it.atk * _scale));
						if (it.def) it.def = Math.max(1, Math.round(it.def * _scale));
						if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * _scale));
						if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * _scale));
						if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * _scale));
				
				// 根據品質添加額外屬性（依使用者要求：rare 應高於 excellent）
				const bonusCountByRarity = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
				const bonusCount = bonusCountByRarity[rarity] || 0;
				if (bonusCount > 0 && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
					const pool = QUALITY_BONUS[it.slot][rarity].slice(); // copy to avoid mutating source
					for (let n = 0; n < bonusCount && pool.length > 0; n++) {
						const idx = Math.floor(Math.random() * pool.length);
						const bonus = pool.splice(idx, 1)[0];
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
			const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
			const rarityWeights = [70, 20, 6, 3, 1];
			// pick rarity by weights
			let totalW = rarityWeights.reduce((s,w) => s + w, 0);
			let rr = Math.random() * totalW;
			let acc = 0;
			let rarity = 'common';
			for (let i = 0; i < rarities.length; i++) {
				acc += rarityWeights[i];
				if (rr < acc) { rarity = rarities[i]; break; }
			}
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
		// 直接調用完整的驛站功能（含裝備強化）
		this.tradingPost();
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
		}
	}
	scorpion() {
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
		}
		const total2 = outcomes.reduce((s, o) => s + o.weight, 0);
		let r2 = Math.random() * total2;
		let result2 = null;
		for (const o of outcomes) {
			r2 -= o.weight;
			if (r2 <= 0) { result2 = o; break; }
		}

		if (result2.type === 'gamble') {
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
		} else if (result2.type === 'gift') {
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
		} else if (result2.type === 'prophecy') {
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
		} else if (result2.type === 'curse') {
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
						<button class="tp-buy-btn" data-item="potion" data-price="200" style="padding: 5px 10px; background: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9em; white-space: nowrap;">200金幣</button>
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
				<h3 style="margin: 0 0 8px 0; color: #e74c3c; font-size: 1em;">💼 裝備管理</h3>
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

			// 建立包含已裝備和背包物品的完整列表
			const equippedSlots = ['weapon', 'armor', 'amulet'];
			const equippedItems = [];
			equippedSlots.forEach(slot => {
				if (this.player.equipment[slot]) {
					equippedItems.push({ item: this.player.equipment[slot], slot: slot, isEquipped: true });
				}
			});

			const inventoryItems = this.player.inventory.map((item, idx) => ({ item, idx, isEquipped: false }));
			const allItems = [...equippedItems, ...inventoryItems];

			if (allItems.length === 0) {
				invDiv.innerHTML = `<div style="text-align: center; color: #999; padding: 20px;">${t('inventoryEmpty')}</div>`;
				return;
			}

			let html = '';
			allItems.forEach((entry) => {
				const item = entry.item;
				const isEquipped = entry.isEquipped;

				// 計算出售價格：根據稀有度
				let basePrice = 20;
				if (item.rarity === 'rare') basePrice = 80;
				else if (item.rarity === 'excellent') basePrice = 130;
				else if (item.rarity === 'epic') basePrice = 200;
				else if (item.rarity === 'legendary') basePrice = 500;

				// 根據屬性加成調整價格
				if (item.atk) basePrice += item.atk * 5;
				if (item.def) basePrice += item.def * 5;
				if (item.max_hp_bonus) basePrice += item.max_hp_bonus * 2;

				const rarityColor = item.rarity === 'legendary' ? '#e67e22' : (item.rarity === 'epic' ? '#9b59b6' : (item.rarity === 'excellent' ? '#2ecc71' : (item.rarity === 'rare' ? '#3498db' : '#95a5a6')));

				// 裝備指示器
				const equippedBadge = isEquipped ? `<span style="background: #27ae60; color: white; padding: 1px 5px; border-radius: 3px; font-size: 0.7em; margin-left: 5px;">${t('equipped')}</span>` : '';

				// 資料屬性：已裝備用 slot，背包用 idx
				const dataAttr = isEquipped ? `data-slot="${entry.slot}"` : `data-idx="${entry.idx}"`;

				html += `
					<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: ${isEquipped ? '#e8f6e8' : '#f8f8f8'}; border-radius: 4px; margin-bottom: 5px; border-left: 3px solid ${rarityColor};">
						<div style="flex: 1; min-width: 0;">
							<div style="font-weight: bold; font-size: 0.9em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}${item.enhanceLevel ? ' +' + item.enhanceLevel : ''}${equippedBadge}</div>
							<div style="font-size: 0.75em; color: #666;">${item.rarity}${item.isPyramid ? ' 🔺' : ''}</div>
						</div>
						<div style="display:flex; gap:6px; align-items:center;">
							<button class="tp-enhance-btn" ${dataAttr} style="padding: 5px 10px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap;">強化</button>
							${isEquipped ? '' : `<button class="tp-sell-btn" data-idx="${entry.idx}" data-price="${basePrice}" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap;">賣出 ${basePrice}金</button>`}
						</div>
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

			// 綁定強化按鈕
			Array.from(invDiv.querySelectorAll('.tp-enhance-btn')).forEach(btn => {
				btn.addEventListener('click', () => {
					// 支援已裝備物品（data-slot）和背包物品（data-idx）
					const slot = btn.getAttribute('data-slot');
					const idx = btn.getAttribute('data-idx');
					let item;
					if (slot) {
						item = this.player.equipment[slot];
					} else {
						item = this.player.inventory[parseInt(idx)];
					}
					if (!item) return;
					// 設定基礎屬性以便回復/重新計算
					if (typeof item._enhance_base_atk === 'undefined') item._enhance_base_atk = item.atk || 0;
					if (typeof item._enhance_base_def === 'undefined') item._enhance_base_def = item.def || 0;
					const currentLevel = item.enhanceLevel || 0;
					const targetLevel = currentLevel + 1;
					// 計算消耗（隨等級成長）
					const cost = Math.floor(100 * Math.pow(1.6, currentLevel));
					if (this.player.gold < cost) { showMessage('❌ 金幣不足，無法強化。'); return; }
					this.player.gold -= cost;
					document.getElementById('tp-gold').textContent = this.player.gold;
					// 成功機率：1~3 級必成功；4~12 降低（最小 5%）
					let success = false;
					if (targetLevel <= 3) success = true;
					else {
						const prob = Math.max(0.05, 1 - (targetLevel - 3) * 0.12);
						success = Math.random() < prob;
					}
					const atkPer = 2; const defPer = 1;
					if (success) {
						item.enhanceLevel = targetLevel;
						item.atk = (item._enhance_base_atk || 0) + item.enhanceLevel * atkPer;
						item.def = (item._enhance_base_def || 0) + item.enhanceLevel * defPer;
						showMessage(`✨ 強化成功！${item.name} 強化等級 +1（目前 +${item.enhanceLevel}）`);
					} else {
						// 失敗則減 1 等，但不低於 0
						item.enhanceLevel = Math.max(0, currentLevel - 1);
						item.atk = (item._enhance_base_atk || 0) + item.enhanceLevel * atkPer;
						item.def = (item._enhance_base_def || 0) + item.enhanceLevel * defPer;
						showMessage(`💥 強化失敗，${item.name} 強化等級 -1（目前 +${item.enhanceLevel}）`);
					}
					updateInventory();
					this.updateStatus();
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

	// 迷失商隊事件 - 引導玩家尋找正確方向
	lostMerchant() {
		showMessage('🐪 你遇到一支迷失的商隊！');
		showMessage('商隊領隊焦急地說：「我們在沙漠中迷路了，你能幫助我們找到出路嗎？」');
		
		const outcomes = [
			{ type: 'help', weight: 60 },
			{ type: 'trade', weight: 40 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'help') {
			showMessage('📍 你憑藉經驗，為商隊指出正確的方向！');
			showMessage('💡 提示：在沙漠中，向前方通常能找到更多機會...');
			
			// 獎勵：金幣+指南針效果（顯示3次方向提示的品質）
			const goldReward = Math.floor(150 * this.difficulty * (1 + Math.random() * 0.5));
			this.player.gold += goldReward;
			this.player.compassEffect = 3; // 3次方向提示增強
			
			showMessage(`✨ 商隊感激不盡！獲得 ${goldReward} 金幣`);
			showMessage('🧭 獲得「沙漠指南針」效果：接下來3次移動將顯示更詳細的方向資訊！');
		} else {
			showMessage('🛒 商隊願意與你進行特殊交易！');
			showMessage('💰 他們以優惠價格出售稀有物品...');
			
			// 提供一件打折的稀有裝備
			const rareItem = generateItem('rare', this.difficulty);
			const price = Math.floor(120 * this.difficulty);
			
			showMessage(`商隊提供：${rareItem.name}（稀有品質）- 只需 ${price} 金幣！`);
			
			if (this.player.gold >= price) {
				this.player.gold -= price;
				this.player.inventory.push(rareItem);
				showMessage(`✅ 購買成功！獲得 ${rareItem.name}`);
			} else {
				showMessage('❌ 金幣不足，錯過了這次交易機會...');
			}
		}
	}

	// 詛咒神殿事件 - 風險與收益並存
	cursedShrine() {
		showMessage('⚠️ 你發現一座散發著不祥氣息的神殿！');
		showMessage('神殿內部傳來陣陣低語...這裡可能藏著寶藏，也可能充滿危險。');
		
		const outcomes = [
			{ type: 'treasure', weight: 35 },
			{ type: 'battle', weight: 30 },
			{ type: 'curse', weight: 20 },
			{ type: 'blessing', weight: 15 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'treasure') {
			showMessage('💎 你小心翼翼地探索神殿，找到了一個寶箱！');
			const goldReward = Math.floor(200 * this.difficulty * (1 + Math.random()));
			this.player.gold += goldReward;
			
			// 高機率掉落裝備
			if (Math.random() < 0.7) {
				const quality = Math.random() < 0.3 ? 'epic' : 'rare';
				const item = generateItem(quality, this.difficulty);
				this.player.inventory.push(item);
				showMessage(`✨ 獲得 ${goldReward} 金幣 和 ${item.name}（${item.rarity}）！`);
			} else {
				showMessage(`✨ 獲得 ${goldReward} 金幣！`);
			}
		} else if (result.type === 'battle') {
			showMessage('⚔️ 神殿守護者甦醒了！準備戰鬥！');
			showMessage('💀 這是一個強大的精英敵人...');
			this.battle('elite');
		} else if (result.type === 'curse') {
			showMessage('🌑 你觸發了神殿的詛咒！');
			const curseEffects = [
				{ type: 'hp', desc: '生命力流失' },
				{ type: 'stamina', desc: '體力虛弱' },
				{ type: 'gold', desc: '財富流失' }
			];
			const curse = curseEffects[Math.floor(Math.random() * curseEffects.length)];
			
			if (curse.type === 'hp') {
				const hpLoss = Math.floor(this.player.max_hp * 0.2);
				this.player.hp = Math.max(1, this.player.hp - hpLoss);
				showMessage(`⚠️ ${curse.desc}！HP -${hpLoss}`);
			} else if (curse.type === 'stamina') {
				const staminaLoss = Math.floor(this.player.max_stamina * 0.3);
				this.player.stamina = Math.max(0, this.player.stamina - staminaLoss);
				showMessage(`⚠️ ${curse.desc}！體力 -${staminaLoss}`);
			} else {
				const goldLoss = Math.floor(this.player.gold * 0.15);
				this.player.gold = Math.max(0, this.player.gold - goldLoss);
				showMessage(`⚠️ ${curse.desc}！失去 ${goldLoss} 金幣`);
			}
			showMessage('💡 建議：前往綠洲或休息站恢復狀態...');
		} else {
			showMessage('✨ 神殿中傳來神秘的光芒...');
			showMessage('🌟 這是古老神祇的祝福！');
			
			const blessings = [
				{ type: 'stats', desc: '力量提升' },
				{ type: 'luck', desc: '幸運加持' },
				{ type: 'heal', desc: '完全治癒' }
			];
			const blessing = blessings[Math.floor(Math.random() * blessings.length)];
			
			if (blessing.type === 'stats') {
				this.player.base_atk += 3;
				this.player.base_def += 2;
				showMessage(`⚡ ${blessing.desc}！攻擊力 +3，防禦力 +2`);
			} else if (blessing.type === 'luck') {
				this.player.luck_combat += 2;
				this.player.luck_gold += 2;
				showMessage(`🍀 ${blessing.desc}！戰鬥幸運 +2，金幣幸運 +2`);
			} else {
				this.player.hp = this.player.max_hp;
				this.player.stamina = this.player.max_stamina;
				const hpBonus = Math.floor(30 * Math.pow(2, this.difficulty - 1));
				this.player.max_hp += hpBonus;
				this.player.hp = this.player.max_hp;
				showMessage(`💚 ${blessing.desc}！HP和體力完全恢復，最大HP +${hpBonus}`);
			}
		}
	}

	// 強盜伏擊事件 - 戰鬥或談判
	banditAmbush() {
		showMessage('⚔️ 一群沙漠強盜突然出現，包圍了你！');
		showMessage('💰 強盜頭目：「識相的話，留下一半金幣，否則別想活著離開！」');
		
		const hasGold = this.player.gold >= 100 * this.difficulty;
		
		if (!hasGold) {
			showMessage('強盜們發現你身無分文，憤怒地發動攻擊！');
			this.battle('elite');
			return;
		}
		
		const outcomes = [
			{ type: 'negotiate', weight: 25 },
			{ type: 'fight', weight: 40 },
			{ type: 'escape', weight: 20 },
			{ type: 'intimidate', weight: 15 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'negotiate') {
			const payment = Math.floor(this.player.gold * 0.4);
			this.player.gold -= payment;
			showMessage(`💰 你決定支付 ${payment} 金幣作為「通行費」...`);
			showMessage('🤝 強盜們拿到錢後滿意地離開了。');
			showMessage('📍 臨走前，強盜頭目指向一個方向：「那邊有個好地方，算是給你的情報。」');
			
			// 獲得方向提示增強
			this.player.banditInfo = 2;
			showMessage('🗺️ 獲得「強盜情報」：接下來2次移動有更高機率遇到好事件！');
		} else if (result.type === 'fight') {
			showMessage('⚔️ 你決定與強盜戰鬥！');
			showMessage('💡 戰鬥提示：擊敗強盜可獲得他們搶奪的財寶！');
			
			// 標記這是特殊戰鬥
			this.banditsLoot = Math.floor(300 * this.difficulty * (1 + Math.random()));
			this.battle('elite');
		} else if (result.type === 'escape') {
			showMessage('💨 你趁強盜不注意，成功逃脫了！');
			const goldLoss = Math.floor(this.player.gold * 0.15);
			this.player.gold -= goldLoss;
			showMessage(`⚠️ 逃跑時掉落了 ${goldLoss} 金幣...`);
			showMessage('💡 提示：繼續向前方探索，尋找安全的地方。');
		} else {
			showMessage('😎 你展示了你的實力和裝備...');
			showMessage('💪 強盜們被你的氣勢震懾，不敢輕舉妄動！');
			
			if (Math.random() < 0.6) {
				showMessage('🏃 強盜們嚇得落荒而逃！');
				const foundGold = Math.floor(150 * this.difficulty * (1 + Math.random() * 0.5));
				this.player.gold += foundGold;
				showMessage(`✨ 你在強盜營地找到 ${foundGold} 金幣！`);
			} else {
				showMessage('⚔️ 強盜頭目不服，向你發起挑戰！');
				this.battle('elite');
			}
		}
	}

	// 古老謎題事件 - 智力挑戰
	ancientPuzzle() {
		showMessage('🧩 你發現了一座古老的石碑，上面刻滿了象形文字...');
		showMessage('這似乎是某種謎題，破解它可能會獲得獎勵。');
		
		const puzzles = [
			{
				question: '「太陽從何處升起？」',
				answers: ['東方', '西方', '南方', '北方'],
				correct: 0,
				hint: '（前方通常代表東方，是太陽升起的方向）'
			},
			{
				question: '「三個神祇守護金字塔，何者掌管冥界？」',
				answers: ['拉（Ra）', '阿努比斯（Anubis）', '荷魯斯（Horus）', '伊西斯（Isis）'],
				correct: 1,
				hint: '（阿努比斯是死神和木乃伊之神）'
			},
			{
				question: '「沙漠中最珍貴的資源是什麼？」',
				answers: ['黃金', '寶石', '水源', '武器'],
				correct: 2,
				hint: '（綠洲是沙漠旅者的救命之地）'
			}
		];
		
		const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
		showMessage(`📜 石碑上的問題：${puzzle.question}`);
		showMessage(`💡 提示：${puzzle.hint}`);
		
		// 隨機決定玩家是否答對（60%機率，受幸運值影響）
		const luckBonus = this.player.luck_gold * 0.05;
		const successChance = 0.6 + luckBonus;
		const success = Math.random() < successChance;
		
		if (success) {
			showMessage(`✅ 你憑藉智慧破解了謎題！答案是：${puzzle.answers[puzzle.correct]}`);
			showMessage('🌟 石碑發出金色光芒，地面出現一個寶箱！');
			
			const goldReward = Math.floor(250 * this.difficulty * (1 + Math.random()));
			this.player.gold += goldReward;
			
			// 高機率獲得優良或史詩裝備
			const quality = Math.random() < 0.4 ? 'epic' : 'excellent';
			const item = generateItem(quality, this.difficulty);
			this.player.inventory.push(item);
			
			// 獲得智慧屬性提升
			this.player.luck_combat += 1;
			this.player.luck_gold += 1;
			
			showMessage(`🎁 獲得：${goldReward} 金幣、${item.name}（${item.rarity}）`);
			showMessage('📚 智慧提升：戰鬥幸運 +1，金幣幸運 +1');
			showMessage('💡 解謎心得：保持探索精神，向不同方向前進會有不同發現！');
		} else {
			showMessage('❌ 謎題太過複雜，你無法解開...');
			showMessage('⚠️ 石碑發出紅光，觸發了防禦機制！');
			
			const trapDamage = Math.floor(20 + Math.random() * 20);
			this.player.hp = Math.max(1, this.player.hp - trapDamage);
			
			showMessage(`💥 陷阱造成 ${trapDamage} 點傷害！`);
			showMessage('💡 建議：提升幸運值可以增加解謎成功率。');
		}
	}

	// 沙漠綠洲事件 - 完整恢復與選擇
	desertOasis() {
		showMessage('🌴 你發現了一片隱藏的沙漠綠洲！');
		showMessage('清澈的泉水、茂密的棕櫚樹...這是沙漠中的奇蹟！');
		
		const outcomes = [
			{ type: 'full_rest', weight: 40 },
			{ type: 'explore', weight: 35 },
			{ type: 'meditate', weight: 25 }
		];
		const total = outcomes.reduce((s, o) => s + o.weight, 0);
		let r = Math.random() * total;
		let result = null;
		for (const o of outcomes) {
			r -= o.weight;
			if (r <= 0) { result = o; break; }
		}

		if (result.type === 'full_rest') {
			showMessage('😌 你決定在綠洲充分休息...');
			
			// 完全恢復
			this.player.hp = this.player.max_hp;
			this.player.stamina = this.player.max_stamina;
			
			// 額外獎勵
			const hpBonus = Math.floor(25 * Math.pow(2, this.difficulty - 1));
			const staminaBonus = Math.floor(15 * Math.pow(2, this.difficulty - 1));
			this.player.max_hp += hpBonus;
			this.player.max_stamina += staminaBonus;
			this.player.hp = this.player.max_hp;
			this.player.stamina = this.player.max_stamina;
			
			// 獲得綠洲祝福
			this.player.oasisBlessing = 5; // 5次移動內提升恢復效果
			
			showMessage('💚 完全恢復！HP和體力全滿！');
			showMessage(`⬆️ 最大HP +${hpBonus}，最大體力 +${staminaBonus}`);
			showMessage('✨ 獲得「綠洲祝福」：接下來5次移動，每次自動恢復少量HP和體力！');
			showMessage('💡 探索提示：休息好後，可以大膽探索更危險的區域！');
		} else if (result.type === 'explore') {
			showMessage('🔍 你決定探索綠洲周圍...');
			showMessage('🌟 在棕櫚樹下，你發現了一個隱藏的寶藏！');
			
			// 中等恢復
			const hpRecover = Math.floor(this.player.max_hp * 0.6);
			const staminaRecover = Math.floor(this.player.max_stamina * 0.6);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpRecover);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaRecover);
			
			// 獲得豐厚獎勵
			const goldReward = Math.floor(200 * this.difficulty * (1 + Math.random()));
			this.player.gold += goldReward;
			
			// 必定掉落一件優良以上裝備
			const quality = Math.random() < 0.3 ? 'epic' : 'excellent';
			const item = generateItem(quality, this.difficulty);
			this.player.inventory.push(item);
			
			showMessage(`💚 恢復 ${hpRecover} HP 和 ${staminaRecover} 體力`);
			showMessage(`🎁 獲得：${goldReward} 金幣、${item.name}（${item.rarity}）`);
			showMessage('💡 綠洲守護者的話：「勇敢的冒險者，繼續向前吧！」');
		} else {
			showMessage('🧘 你在綠洲邊緣盤坐冥想...');
			showMessage('💫 沙漠的寧靜讓你的心靈得到昇華...');
			
			// 中等恢復
			const hpRecover = Math.floor(this.player.max_hp * 0.5);
			const staminaRecover = Math.floor(this.player.max_stamina * 0.5);
			this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpRecover);
			this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaRecover);
			
			// 獲得強大的永久屬性提升
			this.player.base_atk += 4;
			this.player.base_def += 3;
			this.player.luck_combat += 2;
			
			showMessage(`💚 恢復 ${hpRecover} HP 和 ${staminaRecover} 體力`);
			showMessage('⚡ 冥想收穫：攻擊力 +4，防禦力 +3，戰鬥幸運 +2');
			showMessage('🌟 你感受到內在力量的成長！');
			showMessage('💡 智者的教誨：「力量來自內心，而非外物。」');
		}
		
		showMessage('🗺️ 探索建議：綠洲周圍可能還有其他秘密，多探索不同方向！');
	}

	sandstormShelter() {
		showMessage('🌪️ 巨大的沙塵暴即將來襲！你發現了一個避難所...');
		const choices = [
			{ id: 'enter_cave', label: '進入洞穴避難（安全但可能遇到居民）', weight: 35 },
			{ id: 'ruins_shelter', label: '躲進廢墟（可搜尋物資但不穩固）', weight: 35 },
			{ id: 'brave_storm', label: '硬撐沙塵暴繼續前進（消耗體力但節省時間）', weight: 30 }
		];
		this.showChoicePanel(
			'沙塵暴來襲！',
			choices,
			(choiceId) => {
				let needsDirectionHints = false;
				
				if (choiceId === 'enter_cave') {
					const caveRoll = Math.random();
					if (caveRoll < 0.5) {
						showMessage('🏔️ 洞穴空無一人，你安全地度過了沙塵暴。');
						this.player.hp = Math.min(this.player.max_hp, this.player.hp + 30);
						this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 20);
						showMessage('💤 趁機休息，恢復 30 HP 和 20 體力。');
						needsDirectionHints = true;
					} else if (caveRoll < 0.8) {
						showMessage('👴 洞穴中住著一位隱士，他分享了食物和故事。');
						this.player.hp = this.player.max_hp;
						const xp = 40 + Math.floor(Math.random() * 40);
						this.addXP(xp);
						showMessage(`📖 你從隱士的故事中學到了很多！`);
						if (Math.random() < 0.4) {
							const item = this.generateItem('common');
							this.player.inventory.push(item);
							showMessage(`🎁 隱士送給你一件禮物：${this.formatItem(item)}`);
						}
						needsDirectionHints = true;
					} else {
						showMessage('🐺 洞穴是野獸的巢穴！你必須戰鬥！');
						this.battle('elite');
					}
				} else if (choiceId === 'ruins_shelter') {
					showMessage('🏛️ 你躲進了古老的廢墟中...');
					const ruinsRoll = Math.random();
					if (ruinsRoll < 0.4) {
						const gold = 60 + Math.floor(Math.random() * 80);
						this.player.gold += gold;
						showMessage(`💰 在廢墟中搜尋時，你發現了 ${gold} 金幣！`);
						if (Math.random() < 0.6) {
							const item = this.generateItem(Math.random() < 0.3 ? 'rare' : 'common');
							this.player.inventory.push(item);
							showMessage(`⚔️ 還找到了 ${this.formatItem(item)}！`);
						}
					} else if (ruinsRoll < 0.7) {
						const damage = 15 + Math.floor(Math.random() * 15);
						this.player.hp = Math.max(1, this.player.hp - damage);
						showMessage(`💥 廢墟部分坍塌！你受到 ${damage} 點傷害。`);
						showMessage('🏃 你趕緊逃出廢墟，沙塵暴已經過去。');
					} else {
						showMessage('🌪️ 廢墟很穩固，你安全地躲過了沙塵暴。');
						showMessage('但廢墟中沒有找到任何有價值的東西。');
					}
					needsDirectionHints = true;
				} else if (choiceId === 'brave_storm') {
					showMessage('💪 你決定勇敢面對沙塵暴！');
					const stormDamage = 20 + Math.floor(Math.random() * 20);
					const staminaCost = 25 + Math.floor(Math.random() * 15);
					this.player.hp = Math.max(1, this.player.hp - stormDamage);
					this.player.stamina = Math.max(0, this.player.stamina - staminaCost);
					showMessage(`🌪️ 沙塵暴很猛烈！你損失了 ${stormDamage} HP 和 ${staminaCost} 體力。`);
					if (Math.random() < 0.6) {
						this.player.luck_combat += 1;
						showMessage('💎 在暴風中前行鍛鍊了你的意志，戰鬥幸運 +1！');
					}
					this.map_steps += 1;
					showMessage(`🏃 你成功穿越了沙塵暴區域，地圖進度額外 +1（${this.map_steps}/${this.map_goal}）！`);
					needsDirectionHints = true;
				}
				
				if (needsDirectionHints) {
					this.updateStatus();
					this.generateDirectionHints();
				}
			}
		);
	}

	wanderingAlchemist() {
		showMessage('🧙 你遇到了一位流浪的煉金術師...');
		const choices = [
			{ id: 'buy_potion', label: `購買藥水（${80} 金幣/瓶）`, weight: 30 },
			{ id: 'trade_gold', label: '用金幣換取特殊藥劑', weight: 35 },
			{ id: 'learn_alchemy', label: '學習煉金知識（消耗時間但獲得永久效果）', weight: 35 }
		];
		this.showChoicePanel(
			'煉金術師的提議',
			choices,
			(choiceId) => {
				if (choiceId === 'buy_potion') {
					const potionPrice = 80;
					const maxPotions = Math.floor(this.player.gold / potionPrice);
					if (maxPotions === 0) {
						showMessage('💸 你的金幣不夠購買藥水。');
						showMessage('🧙 煉金術師：「等你有錢了再來吧。」');
					} else {
						const buyCount = Math.min(3, maxPotions);
						const totalCost = buyCount * potionPrice;
						this.player.gold -= totalCost;
						this.player.potions += buyCount;
						showMessage(`🧪 你花費 ${totalCost} 金幣購買了 ${buyCount} 瓶高品質藥水！`);
					}
					this.updateStatus();
					this.generateDirectionHints();
				} else if (choiceId === 'trade_gold') {
					const elixirCost = 150;
					if (this.player.gold < elixirCost) {
						showMessage('💸 你沒有足夠的金幣（需要 150 金幣）。');
					} else {
						this.player.gold -= elixirCost;
						const elixirType = Math.random();
						if (elixirType < 0.33) {
							this.player.max_hp += 40;
							this.player.hp = Math.min(this.player.max_hp, this.player.hp + 40);
							showMessage('💪 你獲得了力量藥劑！最大HP永久 +40！');
						} else if (elixirType < 0.66) {
							this.player.max_stamina += 30;
							this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 30);
							showMessage('🏃 你獲得了敏捷藥劑！最大體力永久 +30！');
						} else {
							this.player.luck_combat += 3;
							this.player.luck_gold += 2;
							showMessage('🍀 你獲得了幸運藥劑！戰鬥幸運 +3，金幣幸運 +2！');
						}
					}
					this.updateStatus();
					this.generateDirectionHints();
				} else if (choiceId === 'learn_alchemy') {
					showMessage('📚 煉金術師開始教導你煉金的奧秘...');
					const xp = 70 + Math.floor(Math.random() * 50);
					this.addXP(xp);
					this.player.stamina = Math.max(0, this.player.stamina - 20);
					showMessage('😓 學習很累人，消耗 20 體力。');
					if (!this.player.alchemyKnowledge) {
						this.player.alchemyKnowledge = true;
						showMessage('✨ 你學會了基礎煉金術！');
						showMessage('🧪 從現在開始，使用藥水時額外恢復 20% HP！');
					} else {
						this.player.potions += 2;
						showMessage('📖 你的煉金知識更加精進，獲得 2 瓶藥水！');
					}
					this.updateStatus();
					this.generateDirectionHints();
				}
			}
		);
	}

	ancientTablet() {
		showMessage('📜 你發現了一塊刻有古老文字的石碑...');
		const choices = [
			{ id: 'study', label: '仔細研讀（獲得大量經驗）', weight: 40 },
			{ id: 'touch', label: '觸摸石碑（可能觸發魔法）', weight: 30 },
			{ id: 'ignore', label: '無視石碑繼續前進', weight: 30 }
		];
		this.showChoicePanel(
			'古代石碑',
			choices,
			(choiceId) => {
				if (choiceId === 'study') {
					showMessage('🔍 你努力解讀石碑上的文字...');
					const studyRoll = Math.random();
					if (studyRoll < 0.6) {
						const xp = 80 + Math.floor(Math.random() * 70);
						this.addXP(xp);
						showMessage('💡 你成功解讀了古老的知識！');
						const bonusType = Math.random();
						if (bonusType < 0.4) {
							this.player.max_hp += 25;
							this.player.hp = Math.min(this.player.max_hp, this.player.hp + 25);
							showMessage('📖 石碑記載了古老的體能訓練法，最大HP +25！');
						} else if (bonusType < 0.7) {
							this.player.luck_combat += 2;
							showMessage('📖 石碑記載了戰鬥技巧，戰鬥幸運 +2！');
						} else {
							this.player.luck_gold += 2;
							showMessage('📖 石碑記載了寶藏的位置線索，金幣幸運 +2！');
						}
					} else {
						const xp = 30 + Math.floor(Math.random() * 30);
						this.addXP(xp);
						showMessage('😕 文字太古老了，你只能理解一小部分。');
						showMessage('但你仍然學到了一些東西。');
					}
				} else if (choiceId === 'touch') {
					showMessage('✋ 你的手觸碰到了石碑...');
					const touchRoll = Math.random();
					if (touchRoll < 0.35) {
						showMessage('✨ 石碑散發出溫暖的光芒！');
						this.player.hp = this.player.max_hp;
						this.player.stamina = this.player.max_stamina;
						this.player.shield += 30;
						showMessage('💫 你的生命和體力完全恢復，並獲得 30 點護盾！');
						const xp = 50;
						this.addXP(xp);
					} else if (touchRoll < 0.65) {
						showMessage('🌀 石碑的魔法將你傳送到了另一個地方！');
						this.map_steps += 2;
						showMessage(`📍 地圖進度 +2（${this.map_steps}/${this.map_goal}）`);
						const gold = 50 + Math.floor(Math.random() * 50);
						this.player.gold += gold;
						showMessage(`💰 你在新地點發現了 ${gold} 金幣！`);
					} else {
						showMessage('⚠️ 石碑是個陷阱！');
						const damage = 25 + Math.floor(Math.random() * 20);
						this.player.hp = Math.max(1, this.player.hp - damage);
						showMessage(`💥 魔法能量爆發，你受到 ${damage} 點傷害！`);
					}
                } else if (choiceId === 'ignore') {
                    showMessage('🚶 你決定不理會石碑，繼續你的旅程。');
                    showMessage('安全第一總是沒錯的。');
                    this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 10);
                    showMessage('體力恢復 10 點。');
                }
                this.updateStatus();
                this.generateDirectionHints();
            }
        );
    }	beastPack() {
		showMessage('🐺 你遭遇了一群沙漠野獸！');
		const choices = [
			{ id: 'fight', label: '迎戰（正面戰鬥）', weight: 35 },
			{ id: 'scare', label: '嚇跑牠們（需要消耗體力）', weight: 30 },
			{ id: 'negotiate', label: '用食物安撫（消耗藥水）', weight: 35 }
		];
		this.showChoicePanel(
			'野獸群來襲！',
			choices,
			(choiceId) => {
				if (choiceId === 'fight') {
					showMessage('⚔️ 你決定迎擊野獸群！');
					this.enemy.isBeastPack = true;
					this.enemy.beastPackRemaining = 2;
					this.battle('monster');
				} else if (choiceId === 'scare') {
					const staminaCost = 30;
					if (this.player.stamina < staminaCost) {
						showMessage('😓 你的體力不足以嚇跑野獸！');
						showMessage('🐺 野獸們嗅到了你的虛弱，發起攻擊！');
						this.battle('elite');
					} else {
						const scareRoll = Math.random();
						if (scareRoll < 0.7) {
							this.player.stamina -= staminaCost;
							showMessage(`💪 你展現出強大的氣勢，成功嚇跑了野獸！（消耗 ${staminaCost} 體力）`);
							if (Math.random() < 0.5) {
								const gold = 30 + Math.floor(Math.random() * 40);
								this.player.gold += gold;
								showMessage(`💰 野獸逃跑時掉落了 ${gold} 金幣！`);
							}
							this.updateStatus();
							this.generateDirectionHints();
						} else {
							this.player.stamina -= staminaCost;
							showMessage(`😰 嚇唬失敗！野獸更加憤怒了！（消耗 ${staminaCost} 體力）`);
							this.battle('elite');
						}
					}
				} else if (choiceId === 'negotiate') {
					if (this.player.potions < 1) {
						showMessage('🧪 你沒有藥水可以當作食物！');
						showMessage('🐺 野獸們向你撲來！');
						this.battle('monster');
					} else {
						this.player.potions -= 1;
						showMessage('🍖 你用藥水中的草藥安撫了野獸。');
						showMessage('🐺 野獸們吃飽後滿意地離開了。');
						const giftRoll = Math.random();
						if (giftRoll < 0.4) {
							const item = this.generateItem(Math.random() < 0.4 ? 'rare' : 'common');
							this.player.inventory.push(item);
							showMessage(`🎁 野獸頭領留下了一件物品：${this.formatItem(item)}！`);
						} else {
							const gold = 40 + Math.floor(Math.random() * 60);
							this.player.gold += gold;
							showMessage(`💰 野獸離開時留下了 ${gold} 金幣。`);
						}
                        const xp = 40;
                        this.addXP(xp);
                        this.updateStatus();
                        this.generateDirectionHints();
                    }
                }
            }
        );
    }	moonlightAltar() {
		showMessage('🌙 在月光下，你發現了一座神秘的祭壇...');
		const choices = [
			{ id: 'pray', label: '虔誠祈禱（可能獲得祝福）', weight: 35 },
			{ id: 'offer_gold', label: `獻上金幣（${100} 金幣）`, weight: 30 },
			{ id: 'take_treasure', label: '拿走祭壇上的寶物（冒險）', weight: 35 }
		];
		this.showChoicePanel(
			'月光祭壇',
			choices,
			(choiceId) => {
				if (choiceId === 'pray') {
					showMessage('🙏 你跪在祭壇前虔誠祈禱...');
					const prayRoll = Math.random();
					if (prayRoll < 0.5) {
						showMessage('✨ 月神回應了你的祈禱！');
						this.player.moonBlessing = 5;
						showMessage('🌙 你獲得月神祝福，接下來 5 場戰鬥暴擊率大幅提升！');
						const xp = 60 + Math.floor(Math.random() * 40);
						this.addXP(xp);
					} else if (prayRoll < 0.8) {
						showMessage('🌟 月光照耀著你。');
						this.player.hp = Math.min(this.player.max_hp, this.player.hp + 40);
						this.player.luck_combat += 1;
						showMessage('恢復 40 HP，戰鬥幸運 +1。');
					} else {
						showMessage('...');
						showMessage('月神似乎沒有回應，但祈禱讓你內心平靜。');
						this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 15);
					}
				} else if (choiceId === 'offer_gold') {
					const offerCost = 100;
					if (this.player.gold < offerCost) {
						showMessage('💸 你沒有足夠的金幣獻祭。');
						showMessage('🌙 但月神欣賞你的誠意。');
						this.player.luck_gold += 1;
						showMessage('金幣幸運 +1。');
					} else {
						this.player.gold -= offerCost;
						showMessage(`💰 你獻上了 ${offerCost} 金幣。`);
						showMessage('✨ 祭壇綻放出耀眼的光芒！');
						const rewardType = Math.random();
						if (rewardType < 0.4) {
							const goldReturn = offerCost * 3;
							this.player.gold += goldReturn;
							showMessage(`💎 月神慷慨地回饋你 ${goldReturn} 金幣！`);
						} else if (rewardType < 0.7) {
							const item = this.generateItem(Math.random() < 0.5 ? 'epic' : 'rare');
							this.player.inventory.push(item);
							showMessage(`⚔️ 月神賜予你一件珍貴的裝備：${this.formatItem(item)}！`);
						} else {
							this.player.max_hp += 35;
							this.player.max_stamina += 25;
							this.player.hp = Math.min(this.player.max_hp, this.player.hp + 35);
							this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + 25);
							showMessage('🌙 月神的力量強化了你的身體！最大HP +35，最大體力 +25！');
						}
					}
				} else if (choiceId === 'take_treasure') {
					showMessage('👁️ 你伸手去拿祭壇上的寶物...');
					const takeRoll = Math.random();
					if (takeRoll < 0.3) {
						showMessage('🎉 沒有觸發任何機關！');
						const item = this.generateItem(Math.random() < 0.6 ? 'rare' : 'epic');
						this.player.inventory.push(item);
						const gold = 80 + Math.floor(Math.random() * 120);
						this.player.gold += gold;
						showMessage(`💰 你獲得了 ${gold} 金幣和 ${this.formatItem(item)}！`);
						this.updateStatus();
						this.generateDirectionHints();
					} else if (takeRoll < 0.6) {
						showMessage('⚠️ 祭壇的守護魔法觸發了！');
						const item = this.generateItem('rare');
						this.player.inventory.push(item);
						showMessage(`⚔️ 你拿到了 ${this.formatItem(item)}`);
						const curse = 20 + Math.floor(Math.random() * 15);
						this.player.hp = Math.max(1, this.player.hp - curse);
						this.player.max_hp = Math.max(50, this.player.max_hp - 10);
						showMessage(`😈 但受到詛咒！損失 ${curse} HP 和 10 最大HP！`);
						this.updateStatus();
						this.generateDirectionHints();
					} else {
						showMessage('👹 祭壇的守護者被喚醒了！');
						this.battle('mini_boss');
					}
					return;
				}
				// pray 和 offer_gold 都需要生成方向提示
				this.updateStatus();
				this.generateDirectionHints();
			}
		);
	}

	caravanWreckage() {
		showMessage('🐪 你發現了一處商隊遺骸...');
		const choices = [
			{ id: 'search_carefully', label: '仔細搜尋（耗時但安全）', weight: 35 },
			{ id: 'quick_loot', label: '快速搜刮（可能遺漏物品）', weight: 30 },
			{ id: 'check_survivors', label: '檢查是否有倖存者', weight: 35 }
		];
		this.showChoicePanel(
			'商隊遺骸',
			choices,
			(choiceId) => {
				if (choiceId === 'search_carefully') {
					showMessage('🔍 你仔細搜索每一個角落...');
					this.player.stamina = Math.max(0, this.player.stamina - 15);
					showMessage('😓 仔細搜索消耗了 15 體力。');
					const gold = 100 + Math.floor(Math.random() * 150);
					this.player.gold += gold;
					showMessage(`💰 你找到了 ${gold} 金幣！`);
					
					const itemCount = 1 + (Math.random() < 0.5 ? 1 : 0);
					for (let i = 0; i < itemCount; i++) {
						const rarity = Math.random() < 0.3 ? 'rare' : 'common';
						const item = this.generateItem(rarity);
						this.player.inventory.push(item);
						showMessage(`⚔️ 找到了 ${this.formatItem(item)}！`);
					}
					
					if (Math.random() < 0.4) {
						const potions = 1 + Math.floor(Math.random() * 2);
						this.player.potions += potions;
						showMessage(`🧪 還找到了 ${potions} 瓶藥水！`);
					}
					this.updateStatus();
					this.generateDirectionHints();
				} else if (choiceId === 'quick_loot') {
					showMessage('💨 你快速搜刮了一遍...');
					const quickRoll = Math.random();
					if (quickRoll < 0.5) {
						const gold = 50 + Math.floor(Math.random() * 80);
						this.player.gold += gold;
						showMessage(`💰 你找到了 ${gold} 金幣。`);
						if (Math.random() < 0.4) {
							const item = this.generateItem('common');
							this.player.inventory.push(item);
							showMessage(`⚔️ 還找到了 ${this.formatItem(item)}。`);
						}
						this.updateStatus();
						this.generateDirectionHints();
					} else if (quickRoll < 0.8) {
						showMessage('💥 你觸發了殘留的陷阱！');
						const damage = 20 + Math.floor(Math.random() * 15);
						this.player.hp = Math.max(1, this.player.hp - damage);
						showMessage(`受到 ${damage} 點傷害。`);
						const gold = 30 + Math.floor(Math.random() * 40);
						this.player.gold += gold;
						showMessage(`💰 匆忙中你還是撿到了 ${gold} 金幣。`);
						this.updateStatus();
						this.generateDirectionHints();
					} else {
						showMessage('⚠️ 其他掠奪者也盯上了這裡！');
						this.battle('monster');
					}
				} else if (choiceId === 'check_survivors') {
					showMessage('🔍 你檢查商隊成員的狀況...');
					const survivorRoll = Math.random();
					if (survivorRoll < 0.3) {
						showMessage('😊 你找到了一位倖存者！');
						const gold = 150;
						this.player.gold += gold;
						showMessage(`💰 倖存者感激地給了你 ${gold} 金幣作為酬謝。`);
						const item = this.generateItem(Math.random() < 0.5 ? 'rare' : 'excellent');
						this.player.inventory.push(item);
						showMessage(`🎁 還送給你一件珍貴物品：${this.formatItem(item)}！`);
						const xp = 80 + Math.floor(Math.random() * 40);
						this.addXP(xp);
						showMessage('😌 救人一命讓你心情愉悅。');
						this.updateStatus();
						this.generateDirectionHints();
					} else if (survivorRoll < 0.7) {
						showMessage('😔 所有人都已經罹難了...');
						showMessage('📖 你找到了商隊隊長的日記。');
						const xp = 50 + Math.floor(Math.random() * 50);
						this.addXP(xp);
						showMessage('從日記中你學到了一些沙漠生存技巧。');
						const gold = 60 + Math.floor(Math.random() * 60);
						this.player.gold += gold;
						showMessage(`💰 你找到了他們的共同基金 ${gold} 金幣。`);
						this.updateStatus();
						this.generateDirectionHints();
					} else {
						showMessage('😨 「倖存者」突然站起來攻擊你！');
						showMessage('原來是盜賊的陷阱！');
						this.battle('elite');
					}
				}
			}
		);
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
	}

	showChoicePanel(title, choices, callback) {
		// 禁用移動按鈕
		const mf = document.getElementById('move-front'); if (mf) mf.disabled = true;
		const ml = document.getElementById('move-left'); if (ml) ml.disabled = true;
		const mr = document.getElementById('move-right'); if (mr) mr.disabled = true;

		// 創建選擇對話框
		const panel = document.createElement('div');
		panel.id = 'encounter-choice-panel';
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
			min-width: 320px;
			max-width: 90vw;
			text-align: center;
		`;

		// 生成選項按鈕 HTML
		const choicesHtml = choices.map(choice => `
			<button class="choice-btn" data-choice-id="${choice.id}" style="
				display: block;
				width: 100%;
				padding: 12px 16px;
				margin: 8px 0;
				font-size: 1em;
				background: linear-gradient(180deg, #f5f5f5, #e0e0e0);
				color: #333;
				border: 2px solid #d4a855;
				border-radius: 6px;
				cursor: pointer;
				transition: all 0.2s;
			">${choice.label}</button>
		`).join('');

		panel.innerHTML = `
			<h2 style="color: #8b4513; margin-top: 0; margin-bottom: 16px;">🏜️ ${title}</h2>
			<div style="text-align: left;">
				${choicesHtml}
			</div>
		`;

		document.body.appendChild(panel);

		// 綁定選項按鈕事件
		const choiceBtns = panel.querySelectorAll('.choice-btn');
		choiceBtns.forEach(btn => {
			btn.addEventListener('mouseenter', () => {
				btn.style.background = 'linear-gradient(180deg, #e8b44c, #d4a02e)';
				btn.style.color = 'white';
			});
			btn.addEventListener('mouseleave', () => {
				btn.style.background = 'linear-gradient(180deg, #f5f5f5, #e0e0e0)';
				btn.style.color = '#333';
			});
			btn.addEventListener('click', () => {
				const choiceId = btn.getAttribute('data-choice-id');
				// 移除面板
				if (panel.parentNode) {
					panel.parentNode.removeChild(panel);
				}
				// 恢復移動按鈕
				if (mf) mf.disabled = false;
				if (ml) ml.disabled = false;
				if (mr) mr.disabled = false;
				// 執行回調
				if (callback) {
					callback(choiceId);
				}
			});
		});
	}

	showPyramidChoice() {
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
					const critChance = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate / 100); // cap 75%, base 8%, per-luck 5%
					let isCrit = Math.random() < critChance;
					let finalDmg = isCrit ? Math.floor(baseDmg * 2.0) : baseDmg;
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
					const critChance2 = Math.min(0.75, 0.08 + 0.05 * this.player.luck_combat + weaponCritRate2 / 100); // cap 75%, base 8%, per-luck 5%
					let isCrit2 = Math.random() < critChance2;
					let finalDmg2 = isCrit2 ? Math.floor(baseDmg * 2.2) : baseDmg;
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
					// 藥水效果隨地圖難度遞增：基礎值 + (難度 * 10)
					const baseHpPerSymbol = 90 + (this.difficulty * 10); // 地圖1: 100, 地圖2: 110, 地圖3: 120...
					let hpGain = baseHpPerSymbol * matchCount;
					// 套用三連加成
					hpGain = Math.round(hpGain * tripleBonus);
					hpGain = Math.max(1, Math.round(hpGain * comboMultiplier));
					this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
					// 同時恢復體力（每格 +30 體力，也隨難度遞增）
					const baseStaminaPerSymbol = 30 + (this.difficulty * 8); // 地圖1: 38, 地圖2: 46, 地圖3: 54...
					let staminaGain = baseStaminaPerSymbol * matchCount;
					// 套用三連加成
					staminaGain = Math.round(staminaGain * tripleBonus);
					staminaGain = Math.max(1, Math.round(staminaGain * comboMultiplier));
					this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + staminaGain);
					showMessage(`使用紅色水瓶 x${matchCount}（連擊 x${effectiveCombo}，地圖${this.difficulty}），回復 HP ${hpGain}、體力 ${staminaGain}。`);
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
						// 成功閃避後消耗一些戰鬥幸運，避免永久累積
						if (this.player.luck_combat && this.player.luck_combat > 0) {
							this.player.luck_combat = Math.max(0, this.player.luck_combat - 1);
							showMessage(`戰鬥幸運 -1（剩餘 ${this.player.luck_combat}）。`);
						}
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
						// 延遲觸發敵人攻擊，讓插槽效果與訊息先完整呈現
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
						
						// 檢查是否為強盜戰利品
						if (this.player.banditsLoot) {
							const banditGold = this.player.banditsLoot;
							this.player.gold += banditGold;
							showMessage(`💰 從強盜那裡奪回了戰利品：${banditGold} 金幣！`);
							this.player.banditsLoot = 0;
						}
						
					// 定義 cloneItem 函數來正確處理裝備屬性加成
					const cloneItem = (base, rarity, isPyramid = false) => {
						const it = Object.assign({}, base);
						it.rarity = rarity;
						// 調整屬性幅度（明確 mapping，確保 rare > excellent）
						const _scale = rarity === 'rare' ? 1.8 : (rarity === 'excellent' ? 1.5 : (rarity === 'epic' ? 2.2 : (rarity === 'legendary' ? 3.0 : 1)));
						if (it.atk) it.atk = Math.max(1, Math.round(it.atk * _scale));
						if (it.def) it.def = Math.max(1, Math.round(it.def * _scale));
						if (it.luck_gold) it.luck_gold = Math.max(1, Math.round(it.luck_gold * _scale));
						if (it.luck_combat) it.luck_combat = Math.max(1, Math.round(it.luck_combat * _scale));
						if (it.max_hp_bonus) it.max_hp_bonus = Math.max(1, Math.round(it.max_hp_bonus * _scale));
						
						// 根據品質添加額外屬性（可抽取多個不重複加成，數量依稀有度而定）
						const bonusCountByRarity_inner = { common: 0, rare: 2, excellent: 1, epic: 3, legendary: 4 };
						const bonusCount_inner = bonusCountByRarity_inner[rarity] || 0;
						if (bonusCount_inner > 0 && QUALITY_BONUS[it.slot] && QUALITY_BONUS[it.slot][rarity]) {
							const pool2 = QUALITY_BONUS[it.slot][rarity].slice();
							for (let n = 0; n < bonusCount_inner && pool2.length > 0; n++) {
								const idx2 = Math.floor(Math.random() * pool2.length);
								const bonus2 = pool2.splice(idx2, 1)[0];
								Object.assign(it, bonus2);
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
							// 正常地圖掉落（改用權重，支援 common/rare/excellent/epic/legendary）
							const rarities = ['common','rare','excellent','epic','legendary'];
							function pickWeightedRarity(weights) {
								let total = weights.reduce((s,w)=>s+w,0);
								let r = Math.random()*total; let acc = 0;
								for (let i=0;i<weights.length;i++){ acc += weights[i]; if (r < acc) return rarities[i]; }
								return 'common';
							}

							if (enemyTypeMultiplier === 3) { // mini_boss - 很高的稀有率
								const weights = [10,50,10,25,5]; // common, rare, excellent, epic, legendary
								const dropCount = 1 + Math.floor(Math.random() * 2);
								showMessage(`💎 小頭目掉落 ${dropCount} 件裝備！`);
								for (let i = 0; i < dropCount; i++) {
									const rarity = pickWeightedRarity(weights);
									const baseItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
									dropped = cloneItem(baseItem, rarity);
									this.player.inventory.push(dropped);
									showMessage(`  獲得 ${this.formatItem(dropped)}`);
								}
							} else if (enemyTypeMultiplier === 2) { // elite
								const weights = [15,40,15,20,10]; // 更好但不如小頭目
								const dropCount = 1 + Math.floor(Math.random() * 2);
								const dropRoll = Math.random() * 100;
								const dropChance = 85;
								console.log(`Elite drop check: roll=${dropRoll}, chance=${dropChance}, count=${dropCount}`);
								if (dropRoll < dropChance) {
									showMessage(`⚔️ 精英掉落 ${dropCount} 件裝備！`);
									for (let i = 0; i < dropCount; i++) {
										const rarity = pickWeightedRarity(weights);
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
								const weights = [70,20,6,3,1];
								const rollRarity = pickWeightedRarity(weights);
								if (rollRarity !== 'common') {
									const baseItem = ITEMS[Math.floor(Math.random()*ITEMS.length)];
									dropped = cloneItem(baseItem, rollRarity);
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
                    
                    // 戰鬥結束後檢查是否達到金字塔或地圖目標
                    if (this.inPyramid && this.pyramidSteps >= this.pyramidMaxSteps) {
                        this.exitPyramid();
                    } else if (!this.inPyramid && this.map_steps >= this.map_goal) {
                        this.nextMap();
                    } else {
                        // 只有在未離開金字塔/地圖時才生成方向提示
                        this.generateDirectionHints();
                    }
                }
            }		// 檢查敵人或玩家死亡
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

// 新增事件處理方法（附加到 Game.prototype，確保現有實例也可使用）
Game.prototype.lostMerchant = function() {
	showMessage('你遇到了一位迷路的商人，他似乎丟失了一些貨物。');
	const roll = Math.random();
	if (roll < 0.45) {
		const gold = 60 + Math.floor(Math.random() * 90);
		this.player.gold += gold;
		showMessage(`幫助商人取回貨品，商人感激地給你 ${gold} 金幣作為回報。`);
	} else if (roll < 0.8) {
		this.player.potions += 1;
		showMessage('商人送你一瓶藥水作為謝禮。');
	} else {
		// 交易選項：簡單販賣/購買
		showMessage('商人希望與你交易：他願意用一件普通物品交換 120 金幣。');
		if (this.player.inventory.length > 0 && this.player.gold < 120) {
			const idx = Math.floor(Math.random() * this.player.inventory.length);
			const it = this.player.inventory.splice(idx, 1)[0];
			this.player.gold += 120;
			showMessage(`你出售 ${it.name} 給商人，獲得 120 金幣。`);
		} else {
			showMessage('你覺得交易條件不划算，商人離開了。');
		}
	}
	this.updateStatus();
};

Game.prototype.cursedShrine = function() {
	showMessage('你發現了一座帶有詭異符文的祭壇。');
	if (Math.random() < 0.6) {
		const hpLoss = 10 + Math.floor(Math.random() * 20);
		this.player.hp = Math.max(1, this.player.hp - hpLoss);
		showMessage(`祭壇釋放詛咒，失去 ${hpLoss} 點 HP。`);
		if (Math.random() < 0.4) {
			// 解除詛咒獎勵
			this.player.luck_combat += 1;
			showMessage('你找到方法削弱了詛咒，獲得 戰鬥幸運 +1 作為補償。');
		}
	} else {
		const shieldGain = 20 + Math.floor(Math.random() * 30);
		this.player.shield += shieldGain;
		showMessage(`祭壇反而祝福了你：護盾 +${shieldGain}。`);
	}
	this.updateStatus();
};

Game.prototype.banditAmbush = function() {
	showMessage('一群強盜突然跳出來攔截你！你被迫戰鬥或逃跑。');
	if (Math.random() < 0.5) {
		showMessage('你成功躲過一部分攻擊，但仍受些傷。');
		const dmg = 8 + Math.floor(Math.random() * 12);
		this.player.hp = Math.max(1, this.player.hp - dmg);
		this.player.gold = Math.max(0, this.player.gold - 20);
		showMessage(`HP -${dmg}，被搶走 20 金幣。`);
	} else {
		showMessage('你被迫進入戰鬥（立即觸發一場小型戰鬥）。');
		this.battle('bandit');
	}
	this.updateStatus();
};

Game.prototype.ancientPuzzle = function() {
	showMessage('你發現了一個古老的機關謎題。解開它可能有豐厚獎勵。');
	const choice = Math.random();
	if (choice < 0.5) {
		const xp = 20 + Math.floor(Math.random() * 40);
		this.addXP(xp);
		showMessage(`你巧妙解開了謎題：獲得經驗值 +${xp}。`);
	} else if (choice < 0.85) {
		this.player.potions += 2;
		showMessage('謎題吐出了一些補給：藥水 x2。');
	} else {
		// 小陷阱
		const dmg = 12 + Math.floor(Math.random() * 18);
		this.player.hp = Math.max(1, this.player.hp - dmg);
		showMessage(`機關反噬：受到 ${dmg} 點傷害。`);
	}
	this.updateStatus();
};

Game.prototype.desertOasis = function() {
	showMessage('你發現了一處綠洲，短暫休息可以恢復狀態或遇到旅人。');
	if (Math.random() < 0.5) {
		const hpGain = Math.floor(this.player.max_hp * 0.3);
		const stamGain = Math.floor(this.player.max_stamina * 0.3);
		this.player.hp = Math.min(this.player.max_hp, this.player.hp + hpGain);
		this.player.stamina = Math.min(this.player.max_stamina, this.player.stamina + stamGain);
		showMessage(`短暫休息：HP +${hpGain}，體力 +${stamGain}。`);
	} else {
		const gold = 30 + Math.floor(Math.random() * 60);
		this.player.gold += gold;
		showMessage(`你在綠洲救助一名旅人，他感謝你並給予 ${gold} 金幣。`);
	}
	this.updateStatus();
};
	
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
		// 使用動態符號高度以適配不同螢幕尺寸
		const symbolHeight = getSymbolHeight();
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
				// 當 pos 超過一整組長度，回繞（使用動態符號高度）
				const totalHeight = SYMBOLS.length * symbolHeight * 8; // repeats
				if (reelState[i].anim.pos >= totalHeight) reelState[i].anim.pos -= totalHeight;
				strip.style.transform = `translateY(-${reelState[i].anim.pos}px)`;
				strip.style.webkitTransform = `translateY(-${reelState[i].anim.pos}px)`;
				reelState[i].raf = requestAnimationFrame(loop);
			};
			reelState[i].raf = requestAnimationFrame(loop);
		}
	}

	function stopSequentially() {
		// 禁用 stop 按鈕，依序停止每一軸
		stopBtn.disabled = true;
		const results = [];
		
		// 統一的停止函數，確保符號精確對齊
		const stopReel = (index, withAnimation = true) => {
			return new Promise((resolve) => {
				// 隨機選擇一個符號作為目標
				const targetSymbol = pickWeightedSymbol();
				const strip = reels[index].querySelector('.strip');
				
				// 停止 spinning loop
				reelState[index].spinning = false;
				if (reelState[index].raf) cancelAnimationFrame(reelState[index].raf);

				// 找到目標符號在 SYMBOLS 陣列中的索引
				const symbolIndex = SYMBOLS.indexOf(targetSymbol);
				if (symbolIndex === -1) {
					console.error(`Symbol ${targetSymbol} not found in SYMBOLS array`);
					resolve();
					return;
				}
				
				// 計算目標位置（動態適配不同螢幕尺寸）
				// strip 中有 8 個重複的 SYMBOLS 陣列
				// 使用第 3 個循環（中間位置）來確保符號在可視範圍內
				const symbolHeight = getSymbolHeight();
				const highlightTop = getHighlightTop();
				const singleBlock = SYMBOLS.length * symbolHeight; // 動態計算單個循環長度
				const targetCycle = 3; // 使用第 3 個循環
				
				// 目標位置計算：符號頂部對齊到高亮框頂部
				// strip 移動到 cycle × singleBlock + index × symbolHeight - highlightTop
				const targetPos = targetCycle * singleBlock + symbolIndex * symbolHeight - highlightTop;
				
				// 偵測螢幕資訊
				const screenWidth = window.innerWidth;
				const isMobile = screenWidth <= 600;
				const isTinyScreen = screenWidth <= 400;
				
				console.log(`Reel ${index}: Target=${targetSymbol}, symbolIndex=${symbolIndex}, targetPos=${targetPos}px, symbolHeight=${symbolHeight}px, highlightTop=${highlightTop}px, mobile=${isMobile}, tiny=${isTinyScreen}, screenWidth=${screenWidth}`);
				
				if (withAnimation) {
					// 第一個輪軸：帶動畫
					const currentPos = reelState[index].anim ? reelState[index].anim.pos : 0;
					const duration = 1000 + Math.random() * 500;
					const start = performance.now();
					
					const animate = (now) => {
						const t = Math.min(1, (now - start) / duration);
						const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
						const pos = currentPos + (targetPos - currentPos) * ease;
						strip.style.transform = `translateY(-${pos}px)`;
						strip.style.webkitTransform = `translateY(-${pos}px)`;
						
						if (t < 1) {
							requestAnimationFrame(animate);
						} else {
							// 動畫結束，強制設定精確位置（包括 webkit 前綴）
							strip.style.transform = `translateY(-${targetPos}px)`;
							strip.style.webkitTransform = `translateY(-${targetPos}px)`;
							results[index] = targetSymbol;
							console.log(`Reel ${index}: Animation complete, final position=${targetPos}px, symbol=${targetSymbol}`);
							setTimeout(resolve, 50);
						}
					};
					requestAnimationFrame(animate);
				} else {
					// 第二、三個輪軸：快速停止
					strip.style.transition = 'transform 0.3s ease-out';
					strip.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					strip.style.transform = `translateY(-${targetPos}px)`;
					strip.style.webkitTransform = `translateY(-${targetPos}px)`;
					
					setTimeout(() => {
						strip.style.transition = '';
						strip.style.webkitTransition = '';
						// 再次確認位置（包括 webkit 前綴）
						strip.style.transform = `translateY(-${targetPos}px)`;
						strip.style.webkitTransform = `translateY(-${targetPos}px)`;
						results[index] = targetSymbol;
						console.log(`Reel ${index}: Quick stop complete, final position=${targetPos}px, symbol=${targetSymbol}`);
						resolve();
					}, 350);
				}
			});
		};

		// 依序停止三個輪軸
		stopReel(0, true).then(() => {
			return Promise.all([
				stopReel(1, false),
				stopReel(2, false)
			]);
		}).then(() => {
			// 等待 DOM 完全更新
			return new Promise(resolve => setTimeout(resolve, 100));
		}).then(() => {
			// 驗證結果並顯示位置資訊
			console.log('=== Final verification ===');
			let positionInfo = '';
			for (let i = 0; i < 3; i++) {
				const strip = reels[i].querySelector('.strip');
				if (strip) {
					// 取得 transform 的實際計算值，支援 translateY(...)、matrix(...) 與 matrix3d(...)
					const comp = window.getComputedStyle(strip).transform || strip.style.transform || '';
					let currentPos = 0;
					if (comp.startsWith('matrix3d')) {
						// matrix3d(a1,...,a16) --> ty 在第 14 個位置（index 13）
						const nums = comp.match(/matrix3d\(([^)]+)\)/);
						if (nums && nums[1]) {
							const vals = nums[1].split(',').map(s => parseFloat(s.trim()));
							if (vals.length >= 14 && !isNaN(vals[13])) currentPos = Math.round(Math.abs(vals[13]));
						}
					} else if (comp.startsWith('matrix')) {
						// matrix(a, b, c, d, tx, ty)
						const nums = comp.match(/matrix\(([^)]+)\)/);
						if (nums && nums[1]) {
							const vals = nums[1].split(',').map(s => parseFloat(s.trim()));
							if (vals.length >= 6 && !isNaN(vals[5])) currentPos = Math.round(Math.abs(vals[5]));
						}
					} else {
						// 其他情況（如 translateY(-123px)），使用 regex 抽取數字
						const m = comp.match(/-?[\d.]+/g);
						if (m && m.length > 0) {
							currentPos = parseFloat(m[m.length - 1]);
							// translateY 用負值表示，上面邏輯期望正數
							currentPos = Math.abs(currentPos);
						} else {
							currentPos = 0;
						}
					}
					
					// 動態獲取當前螢幕的符號高度和高亮框位置
					const symbolHeight = getSymbolHeight();
					const highlightTop = getHighlightTop();
					
					// 計算符號在高亮框中的索引
					// strip 位置 = cycle × singleBlock + symbolIndex × symbolHeight - highlightTop
					// 反推：symbolIndex = ((currentPos + highlightTop) / symbolHeight) % SYMBOLS.length
					const symbolIndexInView = (Math.round((currentPos + highlightTop) / symbolHeight) % SYMBOLS.length + SYMBOLS.length) % SYMBOLS.length;
					const expectedSymbol = SYMBOLS[symbolIndexInView];
					
					console.log(`Reel ${i}: pos=${currentPos}px, symbolHeight=${symbolHeight}px, highlightTop=${highlightTop}px, symbolIndex=${symbolIndexInView}, expected=${expectedSymbol}, actual=${results[i]}`);
					positionInfo += `\n輪${i+1}: ${currentPos}px (H:${symbolHeight}) → ${results[i]}`;
					
					// 檢查對齊（使用動態符號高度）
					const alignedPos = Math.round((currentPos + highlightTop) / symbolHeight) * symbolHeight - highlightTop;
					// 在行動裝置上允許更大的容差（3px），以避免子像素或 matrix 計算誤差導致誤判
					if (Math.abs(currentPos - alignedPos) > 3) {
						console.warn(`Reel ${i}: Misaligned! Current=${currentPos}, should be=${alignedPos}, symbolHeight=${symbolHeight}`);
					}
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
		// Use bubbling-phase handler and avoid calling preventDefault()
		// to ensure native touch/scroll behavior on mobile is not blocked.
		document.addEventListener('click', function(e) {
			const button = e.target.closest('.unequip-btn, .open-equip-btn');

			if (button) {
				// stopPropagation is enough to isolate the click handling
				// for these buttons; do NOT call preventDefault here as it
				// can interfere with touch interactions on mobile browsers.
				e.stopPropagation();

				const slot = button.getAttribute('data-slot');

				if (button.classList.contains('unequip-btn')) {
					if (slot) {
						game.unequipItem(slot);
					}
				} else if (button.classList.contains('open-equip-btn')) {
					if (slot) {
						game.showEquipmentPanel(slot);
					}
				}
			}
		}, false);

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
				hasEncounteredCaravanRest: game.hasEncounteredCaravanRest,
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
			game.hasEncounteredCaravanRest = data.hasEncounteredCaravanRest || false;
			
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
		const rarities = ['common', 'rare', 'excellent', 'epic', 'legendary'];
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

