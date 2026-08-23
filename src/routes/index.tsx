import { createFileRoute } from "@tanstack/react-router";
import {
	CommonTunerPage,
	type HandleSaveButtonClickArgs,
} from "#/features/tuner/components/common-tuner-page";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";
import { authClient } from "#/infrastructures/auth";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { data } = authClient.useSession();

	const navigate = Route.useNavigate();

	const { createCustomTuner } = useCustomTuners();

	const handleCreateCustomTunerButtonClick = (
		tuner: HandleSaveButtonClickArgs,
	) => {
		if (!data) {
			alert("チューニング設定を保存するにはログインが必要です");
			return;
		}

		const id = crypto.randomUUID();
		createCustomTuner({
			tuner: { ...tuner, id, ownerId: data.user.id },
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
