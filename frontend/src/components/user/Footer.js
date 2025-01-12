import { Link } from 'react-router-dom';

import RedLogo from '../../assets/logo-red.svg';

function Footer() {
	return (
		<footer className="bg-zinc-900">
			<div className="container flex flex-col md:flex-row items-center mx-auto py-8 md:py-10 px-6">
				<div className="w-full flex flex-col md:flex-row justify-between items-start gap-14">
					<div className="w-full md:w-1/3 flex flex-col gap-10">
						<div className="w-full flex flex-col gap-3">
							<Link
								to="/" className="md:w-auto block focus:outline-none"
							>
								<img src={RedLogo} className="h-6" alt="logo" />
							</Link>

							<p className="text-white text-xs font-normal">
								Taste Delivered™
							</p>
						</div>

						<div className="w-full flex flex-col gap-2.5">
							<div className="flex flex-row items-center gap-2">
								<span className="text-white bg-red-600 p-1.5 rounded-md">
									<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
									</svg>
								</span>

								<p className="text-white text-xs font-normal">
									No. 123, Main Street, Colombo, Sri Lanka
								</p>
							</div>

							<div className="flex flex-row items-center gap-2">
								<span className="text-white bg-red-600 p-1.5 rounded-md">
									<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-mail">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
										<path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
									</svg>
								</span>

								<p className="text-white text-xs font-normal">
									flavourdashteam@gmail.com
								</p>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col gap-6 md:w-2/3">
						<h1 className="text-red-600 text-md font-bold">Quick Links</h1>

						<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
							<Link
								to="/"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Home
							</Link>
							<Link
								to="/categories"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Categories
							</Link>
							<Link
								to="/checkout"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Checkout
							</Link>
							<Link
								to="/profile"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Profile
							</Link>
							<Link
								to="/orders"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Orders
							</Link>
							<Link
								to="/reservations"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Reservations
							</Link>
							<Link
								to="/feedback"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Feedback
							</Link>
							<Link
								to="/helpcenter"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Help Center
							</Link>
							<Link
								to="/helpchat"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Help Chat
							</Link>
							<Link
								to="/privacypolicy"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Privacy Policy
							</Link>
							<Link
								to="/termsandconditions"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Terms & Conditions
							</Link>
							<Link
								to="/returnpolicy"
								className="w-fit text-white hover:text-red-500 text-sm font-normal"
							>
								Return Policy
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full bg-zinc-950 py-4 text-white text-center text-sm font-normal">
				&copy; FlavourDash 2024 • All Rights Reserved
			</div>
		</footer>
	);
}

export default Footer;