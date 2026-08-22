import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import {
	CommonTunerPage,
	type HandleSaveButtonClickArgs,
} from "#/features/tuner/components/common-tuner-page";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";

export const Route = createFileRoute("/tuners/$id")({
	component: TunerDetailPage,
});

function TunerDetailPage() {
	const { id } = Route.useParams();

	const { customTuners, updateCustomTuner } = useCustomTuners({ id });

	const navigate = Route.useNavigate();
	useEffect(() => {
		if (customTuners.length === 0) {
			navigate({
				to: "/",
			});
		}
	}, [customTuners, navigate]);

	const handleSaveButtonClick = (tuner: HandleSaveButtonClickArgs) => {
		updateCustomTuner({ tuner: { ...tuner, id: id } });
		alert("チューニング設定を更新しました。");
	};

	return (
		<CommonTunerPage
			customTuner={customTuners[0]}
			handleSaveButtonClick={handleSaveButtonClick}
		/>
	);
}
