import { createFileRoute } from "@tanstack/react-router";
import {
	CommonTunerPage,
	type HandleSaveButtonClickArgs,
} from "#/features/tuner/components/common-tuner-page";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const navigate = Route.useNavigate();

	const { createCustomTuner } = useCustomTuners();

	const handleCreateCustomTunerButtonClick = (
		tuner: HandleSaveButtonClickArgs,
	) => {
		const id = crypto.randomUUID();
		createCustomTuner({
			tuner: { ...tuner, id },
		});
		navigate({
			to: "/tuners/$id",
			params: { id },
		});
		alert("チューニング設定を保存しました。");
	};

	return (
		<CommonTunerPage
			handleSaveButtonClick={handleCreateCustomTunerButtonClick}
		/>
	);
}
