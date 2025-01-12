import React, { useState } from 'react';
import axios from 'axios';

function PasswordUpdateModal({ isOpen, onClose }) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');

		if (newPassword !== confirmPassword) {
			setError("New passwords don't match");
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const response = await axios.put('http://localhost:8000/api/auth/update-password', { newPassword }, {
				headers: { Authorization: `Bearer ${token}` }
			});

			if (response.data.success) {
				setSuccess('Password updated successfully');
				setTimeout(() => {
					onClose();
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					localStorage.removeItem('loggedIn');
					window.location.href = '/login';
				}, 2000);
			}
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to update password');
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded bg-white">
				<div className="w-full flex flex-col items-center justify-center gap-8">
					<h3 className="text-lg font-semibold text-black">Update Password</h3>

					<form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-10">
						<div className="w-full flex flex-col items-center justify-center gap-5">
							<input
								type="password"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								placeholder="Current Password"
								required
							/>
							<input
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								placeholder="New Password"
								required
							/>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="w-full px-4 py-3 text-xs rounded-md border-2 border-gray-100 bg-gray-100 focus:border-black focus:bg-white focus:outline-none"
								placeholder="Confirm New Password"
								required
							/>
						</div>

						{error && <div className="text-red-500 text-sm">{error}</div>}
						{success && <div className="text-green-500 text-sm">{success}</div>}

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
								Update Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default PasswordUpdateModal;