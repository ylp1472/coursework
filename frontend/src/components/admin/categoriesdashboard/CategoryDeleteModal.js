import React from 'react';

function CategoryDeleteModal({ isOpen, onClose, onConfirm }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded bg-white">
				<div className="w-full flex flex-col items-center justify-center gap-4">
					<h3 className="text-lg font-semibold text-black">
						Delete Confirmation
					</h3>

					<div className="px-7 py-3">
						<p className="text-sm text-center text-gray-500">
							Are you sure you want to delete this category? This action cannot be undone
						</p>
					</div>

					<div className="w-full flex flex-row items-center justify-center gap-4">
						<button
							onClick={onClose}
							className="text-xs text-white px-4 py-2 rounded outline-none bg-gray-500 hover:bg-gray-400 focus:bg-gray-400"
						>
							Cancel
						</button>

						<button
							onClick={onConfirm}
							className="text-xs text-white px-4 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryDeleteModal;