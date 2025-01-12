import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RedLogo from '../assets/logo-red.svg';

function ResetPasswordResultPage() {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const status = params.get('status');

		localStorage.removeItem('email');

		if (status === 'success') {
			setMessage('Password reset successful');
		} else if (status === 'error') {
			setError('Failed to reset password');
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<>
			<div className="h-screen flex items-center justify-center bg-zinc-200">
				<div className="w-[460px] h-auto px-12 py-20 flex flex-col items-center justify-center gap-12 bg-white rounded">
					<Link to="/" className="md:w-auto block focus:outline-none">
						<img src={RedLogo} className="h-10" alt="logo" />
					</Link>

					{message && (
						<>
							<div className="w-full flex flex-row items-center justify-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check text-green-600">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
								</svg>
								<h2 className="text-gray-800 text-sm">
									{message}!
								</h2>
							</div>

							<div className="w-full flex items-center justify-center">
								<Link
									onClick={() => localStorage.removeItem('forgotPasswordStep')}
									to={`/login`}
									className="w-fit flex flex-row items-center justify-center gap-2 p-2.5 px-5 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium rounded transition-colors"
								>
									Login Now
									<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</Link>
							</div>
						</>
					)}

					{error && (
						<>
							<div className="w-full flex flex-row items-center justify-center gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-exclamation-circle text-red-600">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5 11.66a1 1 0 0 0 -1 1v.01a1 1 0 0 0 2 0v-.01a1 1 0 0 0 -1 -1m0 -7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0 -1 -1" />
								</svg>
								<h2 className="text-gray-800 text-sm">{error}!</h2>
							</div>

							<div className="w-full flex items-center justify-center">
								<Link
									onClick={() => localStorage.setItem('forgotPasswordStep', 'ForgotPassword')}
									to="/forgotpassword"
									className="w-fit flex flex-row items-center justify-center gap-2 p-2.5 px-5 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium rounded transition-colors"
								>
									Try Again
									<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default ResetPasswordResultPage;