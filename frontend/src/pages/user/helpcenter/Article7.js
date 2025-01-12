import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article7() {
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
					Troubleshooting Login Issues
				</h1>
			</header>

			<div className="p-6 bg-gray-50 min-h-screen">
				<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">

					<p className="text-gray-600 mb-4">
						At <span className="font-semibold">FlavourDash</span>, we want to make it easy for you to access your account and order your favorite food online. However, sometimes login issues can occur. Here's a step-by-step guide on how to troubleshoot common login issues:
					</p>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Forgot Password</h2>
						<ol className="list-decimal list-inside text-gray-600">
							<li>Go to our website.</li>
							<li>Click on "Log In": In the top right corner of the page, you'll see a "Log In" button. Click on this button to log in to your account.</li>
							<li>Click on "Forgot Password": Below the login form, you'll see a "Forgot Password" link. Click on this link to reset your password.</li>
							<li>Enter your email address: Enter the email address associated with your account.</li>
							<li>Click on "Reset Password": Click on the "Reset Password" button to receive a password reset email.</li>
							<li>Reset your password: Follow the instructions in the email to reset your password.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Account Locked</h2>
						<ol className="list-decimal list-inside text-gray-600">
							<li>Try logging in again: If your account is locked, try logging in again after a few minutes.</li>
							<li>Check your email: If your account is locked, we'll send you an email with instructions on how to unlock it.</li>
							<li>Contact our support team: If you're still having trouble, contact our support team for assistance.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Email Address or Password</h2>
						<ol className="list-decimal list-inside text-gray-600">
							<li>Check your email address: Make sure you're using the correct email address associated with your account.</li>
							<li>Check your password: Make sure you're using the correct password. If you've forgotten your password, follow the steps above to reset it.</li>
							<li>Try logging in again: If you're still having trouble, try logging in again.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Account Not Activated</h2>
						<ol className="list-decimal list-inside text-gray-600">
							<li>Check your email: If you haven't activated your account, check your email for the activation link.</li>
							<li>Activate your account: Follow the instructions in the email to activate your account.</li>
							<li>Try logging in again: Once your account is activated, try logging in again.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Browser Issues</h2>
						<ol className="list-decimal list-inside text-gray-600">
							<li>Clear your browser cache: Clearing your browser cache can resolve issues with logging in.</li>
							<li>Try a different browser: If you're having trouble logging in on one browser, try using a different browser.</li>
							<li>Check your browser settings: Make sure your browser is set to accept cookies and JavaScript.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold text-gray-800 mb-2">Still Having Trouble?</h2>
						<p className="text-gray-600">
							If you're still having trouble logging in, please contact our support team for assistance. We're here to help and want to ensure that you have a great experience with FlavourDash.
						</p>
						<ul className="mt-4 text-gray-600">
							<li>Email: <span className="text-red-500">contact@flavourdash.com</span></li>
						</ul>
					</section>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article7;