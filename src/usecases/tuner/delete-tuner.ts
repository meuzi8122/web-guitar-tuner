import type { TunerRepository } from "#/repositories/interfaces/tuner";

export async function deleteTuner(
	params: { id: string; ownerId: string },
	deps: { tunerRepository: TunerRepository },
) {
	const { id, ownerId } = params;
	const { tunerRepository } = deps;

	await tunerRepository.deleteTuner({ id, ownerId });
}
