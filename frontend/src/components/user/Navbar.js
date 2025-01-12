import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WhiteLogo from '../../assets/logo-white.svg';

import CategoryDropdown from './navbar/CategoryDropdown';
import NotificationDropdown from './navbar/NotificationDropdown';
import CartDropdown from './navbar/CartDropdown';
import ProfileDropdown from './navbar/ProfileDropdown';

function Navbar() {
	const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		const searchTerms = e.target[0].value;

		if (searchTerms.trim() === '' || searchTerms.trim() === ' ' || searchTerms.trim().length === 0 || searchTerms.trim().length < 3) {
			alert('Please enter more than 2 characters to search');
			return;
		}

		console.log('Search terms:', searchTerms);
		navigate(`/search?query=${searchTerms}`);
	};

	return (
		<nav className="bg-red-600 md:h-[70px] sticky top-0 z-10">
			<div className="container h-full flex flex-col md:flex-row items-center mx-auto px-4 py-6 md:py-4">
				<div className="w-full flex justify-between items-center gap-14">
					<Link
						to="/"
						className="md:w-auto block focus:outline-none"
					>
						<img src={WhiteLogo} className="h-5" alt="logo" />
					</Link>
					<div className="hidden w-full md:flex md:items-center md:justify-between">
						<div className="flex flex-row items-center gap-14">
							<CategoryDropdown />

							<form className="flex flex-row rounded-md border-2 border-transparent text-white bg-red-500 focus-within:border-white" onSubmit={handleSearch}>
								<input
									type="text"
									className="w-[300px] px-3 py-1.5 text-xs bg-transparent focus:outline-none placeholder:text-white"
									placeholder="Search"
								/>
								<button type="submit" className="text-white text-xs px-2 py-1 focus:text-red-500 focus:bg-white focus:outline-none">
									<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-zoom">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
										<path d="M21 21l-6 -6" />
									</svg>
								</button>
							</form>
						</div>
						<div className="flex flex-row items-center gap-3">
							<NotificationDropdown />

							<CartDropdown />

							<ProfileDropdown />
						</div>
					</div>
					{/* Mobile Menu Icon Start */}
					<div className="md:hidden">
						<button
							className="text-white focus:outline-none"
							onClick={() => setIsMobileNavigationOpen(!isMobileNavigationOpen)}
						>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								{isMobileNavigationOpen ? (
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
				<div className={`${isMobileNavigationOpen ? 'block' : 'hidden'} w-full md:hidden mt-4`}>
					<a href="/login" className="text-white text-xs">
						Login
					</a>
				</div>
				{/* Mobile Menu End */}
			</div>
		</nav>
	);
}

export default Navbar;