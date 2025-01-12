import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article6() {
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
					How to Create an Account and Log In
				</h1>
			</header>

			<div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Creating an Account</h2>
						<ol className="list-decimal pl-6 text-gray-700">
							<li>Go to our website.</li>
							<li>Click on <strong>"Sign Up"</strong>: In the top right corner of the page, you'll see a "Sign Up" button. Click on this button to start the registration process.</li>
							<li>Enter your details: Fill out the registration form with your personal details, including your name, email address, and password.</li>
							<li>Verify your email address: We'll send a verification email to the email address you provided. Click on the link in the email to activate your account.</li>
							<li>Set up your account: Once your account is activated, you can set up your account by adding your address, phone number, and other details.</li>
						</ol>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Logging In</h2>
						<ol className="list-decimal pl-6 text-gray-700">
							<li>Go to our website.</li>
							<li>Click on <strong>"Log In"</strong>: In the top right corner of the page, you'll see a "Log In" button. Click on this button to log in to your account.</li>
							<li>Enter your email address and password: Enter the email address and password you used to create your account.</li>
							<li>Click on <strong>"Log In"</strong>: Click on the "Log In" button to access your account.</li>
						</ol>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
						<ol className="list-decimal pl-6 text-gray-700">
							<li>Go to our website.</li>
							<li>Click on <strong>"Log In"</strong>: In the top right corner of the page, you'll see a "Log In" button. Click on this button to log in to your account.</li>
							<li>Click on <strong>"Forgot Password"</strong>: Below the log in form, you'll see a "Forgot Password" link. Click on this link to reset your password.</li>
							<li>Enter your email address: Enter the email address associated with your account.</li>
							<li>Click on <strong>"Reset Password"</strong>: Click on the "Reset Password" button to receive a password reset email.</li>
							<li>Reset your password: Follow the instructions in the email to reset your password.</li>
						</ol>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Benefits of Creating an Account</h2>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Save your personal details: Creating an account allows you to save your personal details, making it easier to order online in the future.</li>
							<li>View your order history: You can view your previous orders and reorder your favorite dishes.</li>
							<li>Receive exclusive offers and discounts: We'll send you exclusive offers and discounts via email, so you can enjoy your favorite food at a lower price.</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Troubleshooting Log In Issues</h2>
						<ul className="list-disc pl-6 text-gray-700">
							<li>Invalid email address or password: If you're having trouble logging in, check that you're using the correct email address and password.</li>
							<li>Account not activated: If you haven't activated your account, you won't be able to log in. Check your email for the activation link and follow the instructions.</li>
							<li>Forgot password: If you've forgotten your password, follow the steps above to reset it.</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Having Trouble?</h2>
						<p className="text-gray-700 mb-4">
							If you're having trouble creating an account or logging in, please contact our support team for assistance. We're here to help and want to ensure that you have a great experience with FlavourDash.
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

export default Article6;