import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const ErrorPage = () => {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Navbar />

				<main
					className="flex-grow bg-gray-100 flex items-center justify-center px-4 py-12"
					style={{
						minHeight: 'calc(100vh - 5rem)'
					}}
				>
					<div className="max-w-2xl w-full bg-white shadow-lg rounded">
						<div className="p-8 py-16 text-center h-full flex flex-col justify-between">
							<div>
								<h1 className="text-8xl font-bold text-red-600 mb-6">404</h1>
								<h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
								<p className="text-md text-gray-600 mb-8">
									The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
								</p>
							</div>
							<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
								<Link
									to="/"
									className="flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded"
								>
									Go To Homepage
									<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</Link>
								<Link
									to="/helpcenter"
									className="flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium p-2.5 rounded"
								>
									Visit Help Center
									<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M9 6l6 6l-6 6" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>

			<Footer />
		</>
	);
};

export default ErrorPage;
