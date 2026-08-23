export type Tuner = {
	id: string;
	ownerId: string;
	name: string;
	tunings: Tuning[];
};

export interface Tuning {
	position: string; // 1弦、2弦、3弦、4弦、5弦、6弦
	note: string;
}

export const DEFAULT_TUNERS: (Omit<Tuner, "id" | "ownerId"> & {
	key: string;
})[] = [
	{
		key: "regular",
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
		key: "half-step-down",
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
		key: "drop-d",
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
		key: "open-d",
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
		key: "dadgad",
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
