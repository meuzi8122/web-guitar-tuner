import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "#/infrastructures/auth";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const handleLoginButtonClick = () => {
		authClient.signIn.social({
			provider: "google",
		});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen space-y-3">
			<p className="font-lg">ログインするとチューニング設定を保存できます</p>
			<div className="p-8 rounded bg-base-200 shadow-md w-full max-w-md">
				<button
					type="button"
					onClick={handleLoginButtonClick}
					className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
				>
					Googleアカウントでログイン
				</button>
			</div>
		</div>
	);
}
