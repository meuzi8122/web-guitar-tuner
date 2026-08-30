import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
	CommonTunerPage,
	type HandleSaveButtonClickArgs,
} from "#/features/tuner/components/common-tuner-page";
import { useCustomTuners } from "#/features/tuner/hooks/use-custom-tuners";
import { authClient } from "#/infrastructures/auth";

export const Route = createFileRoute("/tuners/$id")({
	component: TunerDetailPage,
});

function TunerDetailPage() {
	const { id } = Route.useParams();

	const { data } = authClient.useSession();

	const { customTuners, isReady, updateCustomTuner, deleteCustomTuner } =
		useCustomTuners({ id });

	const navigate = Route.useNavigate();
	const isDeletingRef = useRef(false);
	useEffect(() => {
		// Only redirect once the collection has finished loading. Otherwise a
		// freshly-created tuner (collection still syncing) looks like it doesn't
		// exist and we bounce back to "/".
		if (isReady && customTuners.length === 0 && !isDeletingRef.current) {
			navigate({
				to: "/",
			});
		}
	}, [isReady, customTuners, navigate]);

	const handleSaveButtonClick = (tuner: HandleSaveButtonClickArgs) => {
		if (!data?.user.id) {
			alert("ログインしていません");
			return;
		}
		updateCustomTuner({ tuner: { ...tuner, id: id, ownerId: data.user.id } });
		alert("チューニング設定を更新しました");
	};

	const handleDeleteButtonClick = (id: string) => {
		isDeletingRef.current = true;
		deleteCustomTuner({ id });
		alert("チューニング設定を削除しました。");
		navigate({
			to: "/tuners",
		});
	};

	return (
		<CommonTunerPage
			customTuner={customTuners[0]}
			handleDeleteButtonClick={handleDeleteButtonClick}
			handleSaveButtonClick={handleSaveButtonClick}
		/>
	);
}
