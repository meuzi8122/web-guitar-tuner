export type Tuner = {
	id: string;
	name: string;
	tunings: Tuning[];
};

export interface Tuning {
	position: string; // 1弦、2弦、3弦、4弦、5弦、6弦
	note: string;
}

export const DEFAULT_TUNERS: Tuner[] = [
	{
		id: "1",
		name: "レギュラーチューニング",
		tunings: [
			{ position: "1弦", note: "E4" },
			{ position: "2弦", note: "B3" },
			{ position: "3弦", note: "G3" },
			{ position: "4弦", note: "D3" },
			{ position: "5弦", note: "A2" },
			{ position: "6弦", note: "E2" },
		],
	},
	{
		id: "2",
		name: "半音下げ",
		tunings: [
			{ position: "1弦", note: "Eb4" },
			{ position: "2弦", note: "Bb3" },
			{ position: "3弦", note: "Gb3" },
			{ position: "4弦", note: "Db3" },
			{ position: "5弦", note: "Ab2" },
			{ position: "6弦", note: "Eb2" },
		],
	},
	{
		id: "3",
		name: "Drop D",
		tunings: [
			{ position: "1弦", note: "E4" },
			{ position: "2弦", note: "B3" },
			{ position: "3弦", note: "G3" },
			{ position: "4弦", note: "D3" },
			{ position: "5弦", note: "A2" },
			{ position: "6弦", note: "D2" },
		],
	},
	{
		id: "4",
		name: "Open D",
		tunings: [
			{ position: "1弦", note: "D4" },
			{ position: "2弦", note: "A3" },
			{ position: "3弦", note: "F#3" },
			{ position: "4弦", note: "D3" },
			{ position: "5弦", note: "A2" },
			{ position: "6弦", note: "D2" },
		],
	},
	{
		id: "5",
		name: "DADGAD",
		tunings: [
			{ position: "1弦", note: "D4" },
			{ position: "2弦", note: "A3" },
			{ position: "3弦", note: "G3" },
			{ position: "4弦", note: "D3" },
			{ position: "5弦", note: "A2" },
			{ position: "6弦", note: "D2" },
		],
	},
];
