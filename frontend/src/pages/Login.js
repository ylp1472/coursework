import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import RedLogo from '../assets/logo-red.svg';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [hasError, setHasError] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setHasError(false);

		try {
			const response = await axios.post('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/auth/login', {
				email,
				password
			});

			// Store token and user info
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('role', JSON.stringify(response.data.user.role));

			// Redirect based on login type
			if (response.data.role === 'Admin') {
				navigate('/admin');
			} else {
				navigate('/');
			}
		} catch (err) {
			setError(err.response?.data?.error || 'Login failed');
			setHasError(true);
			console.error('Login error:', err);
		}
	};

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

					<form onSubmit={handleSubmit} className="w-full h-auto flex flex-col items-center gap-14">
						<div className="w-full flex flex-col items-center justify-center gap-4">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`w-full px-4 py-3 text-xs rounded-md border-2
									${hasError
										? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-100 bg-gray-100 focus:border-black'
									} 
								focus:bg-white focus:outline-none`}
								placeholder="Email Address"
								required
							/>

							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`w-full px-4 py-3 text-xs rounded-md border-2
									${hasError
										? 'border-red-500 bg-red-50 focus:border-red-500' : 'border-gray-100 bg-gray-100 focus:border-black'
									} 
								focus:bg-white focus:outline-none`}
								placeholder="Password"
								required
							/>

							<div className="w-full flex items-center gap-2">
								<span className="text-xs font-light">Forgot Password?</span>
								<Link
									to="/forgotpassword"
									className="text-red-600 text-xs font-medium"
								>Reset</Link>
							</div>
						</div>

						<div className="w-full flex items-center justify-center">
							<button
								type="submit"
								className="w-fit flex flex-row items-center justify-center gap-2 p-2.5 px-5 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium rounded transition-colors"
							>
								Login
								<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M9 6l6 6l-6 6" />
								</svg>
							</button>
						</div>
					</form>

					<div className="w-full flex items-center justify-center gap-2">
						<span className="text-xs font-light">New User?</span>
						<Link
							to="/register"
							className="text-red-600 text-xs font-medium"
						>Register</Link>
					</div>
				</div>
			</div>

			<div className="w-full absolute bottom-8 flex items-center justify-center">
				{error && (
					<div className="flex flex-row items-center justify-center gap-2 shadow-xl text-red-600 text-sm px-3 py-2 rounded-md border border-red-300 bg-red-50">
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							<path d="M12 9v4" />
							<path d="M12 16v.01" />
						</svg>
						{error}
					</div>
				)}
			</div>
		</>
	);
}

export default LoginPage;