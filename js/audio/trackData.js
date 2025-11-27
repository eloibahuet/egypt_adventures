// ===== trackData.js - Music Track ABC Notation =====
// Contains ABC notation strings for all music tracks
// Dependencies: None

const TrackData = {
	// ABC 記譜 - 探索音樂
	exploration: `
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
	battle: `
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
	victory: `
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
	}
};

// Expose globally
window.TrackData = TrackData;
