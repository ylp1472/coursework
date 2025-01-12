import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article9() {
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
					How to Reset Password
				</h1>
			</header>

			<div className="min-h-screen bg-gray-100 py-10 px-4">
				<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">

					<p className="text-gray-600 mb-6">
						At <span className="font-semibold">FlavourDash</span>, we make
						it easy for you to manage your account and keep your information
						secure. If you've forgotten your password, follow the steps below:
					</p>

					{/* Reset Password Steps */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Resetting Your Password
						</h2>
						<ol className="list-decimal list-inside text-gray-600 space-y-2">
							<li>Go to our website.</li>
							<li>
								Click on "Log In": In the top right corner of the page, you'll see
								a "Log In" button. Click on this button.
							</li>
							<li>
								Click on "Forgot Password": Below the login form, click on the
								"Forgot Password" link.
							</li>
							<li>
								Enter your email address: In the "Email Address" field, enter the
								email address associated with your account.
							</li>
							<li>
								Click on "Reset Password": Click the "Reset Password" button to
								receive a password reset email.
							</li>
							<li>
								Check your email: Look for a message from us with a password reset
								link.
							</li>
							<li>
								Click on the password reset link: Follow the link in the email to
								reset your password.
							</li>
							<li>
								Enter your new password: Enter a new password in the "New
								Password" field.
							</li>
							<li>
								Confirm your new password: Re-enter the password in the "Confirm
								New Password" field.
							</li>
							<li>
								Click on "Save Changes": Save your changes to update your
								password.
							</li>
						</ol>
					</div>

					{/* Troubleshooting */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Troubleshooting Password Reset Issues
						</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>
								<strong>Error message:</strong> Try logging out and logging back
								in.
							</li>
							<li>
								<strong>Password reset link not received:</strong> Check your spam
								folder or contact our support team.
							</li>
							<li>
								<strong>Password reset link expired:</strong> Request a new
								password reset link.
							</li>
						</ul>
					</div>

					{/* Tips for a Strong Password */}
					<div className="mb-6">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Tips for Choosing a Strong Password
						</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>
								<strong>Use a combination of characters:</strong> Include
								uppercase, lowercase, numbers, and special characters.
							</li>
							<li>
								<strong>Avoid easily guessable information:</strong> Don't use
								your name, birthdate, or common words.
							</li>
							<li>
								<strong>Use a password manager:</strong> Consider using a
								password manager for secure, unique passwords.
							</li>
						</ul>
					</div>

					{/* Contact Section */}
					<div>
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Still Having Trouble?
						</h2>
						<p className="text-gray-600 mb-4">
							If you're still having trouble resetting your password, contact our
							support team for assistance. We're here to help!
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

export default Article9;