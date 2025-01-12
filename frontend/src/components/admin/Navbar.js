import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminNotificationDropdown from './navbar/NotificationDropdown';
import AdminProfileDropdown from './navbar/ProfileDropdown';

function AdminNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const role = JSON.parse(localStorage.getItem('role'));
		if (!token || !role || role !== 'Admin') {
			navigate('/login');
		}
	}, [navigate]);

	return (
		<nav className="md:h-[70px] z-10">
			<div className="container h-full flex flex-col md:flex-row items-center mx-auto px-4 py-6 md:py-4">
				<div className="w-full flex justify-between items-center gap-14">
					<div className="hidden w-full md:flex md:items-center md:justify-end">
						<div className="flex flex-row items-center gap-3">
							<AdminNotificationDropdown />

							<AdminProfileDropdown />
						</div>
					</div>
					{/* Mobile Menu Icon Start */}
					<div className="md:hidden">
						<button
							className="text-white focus:outline-none"
							onClick={() => setIsOpen(!isOpen)}
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16m-7 6h7"
									/>
								)}
							</svg>
						</button>
					</div>
					{/* Mobile Menu Icon End */}
				</div>
				{/* Mobile Menu Start */}
				<div className={`${isOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`}>
					<a href="/login" className="text-white text-xs">
						Login
					</a>
				</div>
				{/* Mobile Menu End */}
			</div>
		</nav>
	);
}

export default AdminNavbar;