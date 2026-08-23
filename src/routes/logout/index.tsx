import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/infrastructures/auth";

export const Route = createFileRoute("/logout/")({
	component: LogoutPage,
});

function LogoutPage() {
	const navigate = useNavigate();

	useEffect(() => {
		// クライアント側で signOut することで useSession のストアも更新され、
		// navbar の表示が即座に「ログイン」に切り替わる。
		authClient.signOut();
	}, []);

	const handleBackButtonClick = () => {
		navigate({ to: "/" });
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen space-y-3">
			<p className="font-lg">ログアウトしました</p>
			<div className="p-8 rounded bg-base-200 shadow-md w-full max-w-md">
				<button
					type="button"
					onClick={handleBackButtonClick}
					className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
				>
					トップページに戻る
				</button>
			</div>
		</div>
	);
}
