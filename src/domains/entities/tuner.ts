export type Tuner = {
	id: string;
	tunings: Tuning[];
};

export interface Tuning {
	name: string;
	note: string;
}
