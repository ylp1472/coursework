import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article8() {
	return (
		<>
			<Navbar />

			{/* Header Section */}
			<header
				className="w-full bg-cover bg-center flex items-center justify-center mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h1 className="text-6xl font-bold text-white text-center">
					How to Update Account Information
				</h1>
			</header>

			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

					<p className="text-gray-600 mb-6">
						At <span className="font-semibold">FlavourDash</span>, we want
						to make it easy for you to manage your account and keep your
						information up to date. Here's a step-by-step guide:
					</p>

					{/* Update Email Address */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Updating Your Email Address
						</h2>
						<ol className="list-decimal list-inside text-gray-600 space-y-2">
							<li>Log in to your account on our website or mobile app.</li>
							<li>
								Go to your account settings by clicking on the "Account" or
								"Settings" button.
							</li>
							<li>
								Click on "Edit Profile" or "Update Profile" in the settings menu.
							</li>
							<li>Enter your new email address in the "Email Address" field.</li>
							<li>Click on "Save Changes" to update your email address.</li>
						</ol>
					</div>

					{/* Update Phone Number */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Updating Your Phone Number
						</h2>
						<ol className="list-decimal list-inside text-gray-600 space-y-2">
							<li>Log in to your account on our website or mobile app.</li>
							<li>
								Go to your account settings by clicking on the "Account" or
								"Settings" button.
							</li>
							<li>
								Click on "Edit Profile" or "Update Profile" in the settings menu.
							</li>
							<li>Enter your new phone number in the "Phone Number" field.</li>
							<li>Click on "Save Changes" to update your phone number.</li>
						</ol>
					</div>

					{/* Update Address */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Updating Your Address
						</h2>
						<ol className="list-decimal list-inside text-gray-600 space-y-2">
							<li>Log in to your account on our website or mobile app.</li>
							<li>
								Go to your account settings by clicking on the "Account" or
								"Settings" button.
							</li>
							<li>
								Click on "Edit Address" or "Update Address" in the settings menu.
							</li>
							<li>Enter your new address in the "Address" field.</li>
							<li>Click on "Save Changes" to update your address.</li>
						</ol>
					</div>

					{/* Update Password */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Updating Your Password
						</h2>
						<ol className="list-decimal list-inside text-gray-600 space-y-2">
							<li>Log in to your account on our website or mobile app.</li>
							<li>
								Go to your account settings by clicking on the "Account" or
								"Settings" button.
							</li>
							<li>Click on "Change Password" in the settings menu.</li>
							<li>Enter your current password in the "Current Password" field.</li>
							<li>Enter your new password in the "New Password" field.</li>
							<li>Click on "Save Changes" to update your password.</li>
						</ol>
					</div>

					{/* Troubleshooting */}
					<div>
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Troubleshooting Account Update Issues
						</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>
								<strong>Error message:</strong> Try logging out and logging back
								in.
							</li>
							<li>
								<strong>Changes not saved:</strong> Click on the "Save Changes"
								button again.
							</li>
							<li>
								<strong>Account locked:</strong> Contact our support team for
								assistance.
							</li>
						</ul>
					</div>

					{/* Contact Section */}
					<div className="mt-8">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Still Having Trouble?
						</h2>
						<p className="text-gray-600 mb-4">
							If you're still having trouble updating your account information,
							please contact our support team. We're here to help and ensure you
							have a great experience.
						</p>
						<ul className="mt-4 text-gray-600">
							<li>Email: <span className="text-red-500">contact@flavourdash.com</span></li>
						</ul>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article8;