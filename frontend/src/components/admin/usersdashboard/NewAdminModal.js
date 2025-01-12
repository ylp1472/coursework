import React, { useState } from 'react';

function NewAdminModal({ isOpen, onClose, onSave }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		role: 'Admin'
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
		setFormData({ name: '', email: '', password: '', role: 'Admin' }); // Reset form
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded bg-white">
				<div className="w-full flex flex-col items-center justify-center gap-8">
					<h3 className="text-lg font-semibold text-black">
						Create New Admin
					</h3>

					<form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-10">
						<div className="w-full flex flex-col items-center justify-center gap-5">
							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label for="name" className="w-full text-xs text-gray-500">
									Name:
								</label>
								<input
									id="name"
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label for="email" className="w-full text-xs text-gray-500">
									Email Address:
								</label>
								<input
									id="email"
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>

							<span className="w-full flex flex-col items-center justify-center gap-2.5">
								<label for="password" className="w-full text-xs text-gray-500">
									Password:
								</label>
								<input
									id="password"
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
									required
								/>
							</span>
						</div>

						<div className="w-full flex flex-row items-center justify-center gap-4">
							<button
								type="button"
								onClick={onClose}
								className="text-xs text-white px-4 py-2 rounded outline-none bg-gray-500 hover:bg-gray-400 focus:bg-gray-400"
							>
								Cancel
							</button>

							<button
								type="submit"
								className="text-xs text-white px-4 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
							>
								Create Admin
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default NewAdminModal;