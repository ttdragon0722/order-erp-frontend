"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

const ModalView = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const handleClose = () => {
		router.back(); // 回上一頁
	};

	// 鎖定背景滾動
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalStyle; // 還原
		};
	}, []);

	return (
		<div
			className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center"
			onClick={handleClose}
		>
			<div
				className="relative bg-white rounded-xl p-6 max-w-lg w-full shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={handleClose}
					className="absolute top-2 right-2 text-gray-600 hover:text-black"
				>
					<IoClose size={24} />
				</button>

				{children}
			</div>
		</div>
	);
};

export default ModalView;
