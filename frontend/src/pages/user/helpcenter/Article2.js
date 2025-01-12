import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article2() {
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
					Troubleshooting Payment Issues
				</h1>
			</header>


			<div className="min-h-screen bg-gray-100 py-8 px-4">
				<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">

					<p className="text-gray-600 mb-6">Having trouble completing a payment on our website? Don't worry, we're here to help! Below are some common payment issues and their solutions.</p>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Issue 1: Payment Method Not Accepted</h2>
						<p className="text-gray-600"><strong>Error Message:</strong> "Payment method not accepted" or "Card type not supported"</p>
						<p className="text-gray-600"><strong>Solution:</strong> Our website accepts [list accepted payment methods, e.g. Visa, Mastercard, PayPal]. If your payment method is not on this list, please try using an alternative method. If you're still having trouble, contact our support team for assistance.</p>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Issue 2: Card Declined</h2>
						<p className="text-gray-600"><strong>Error Message:</strong> "Card declined" or "Transaction failed"</p>
						<p className="text-gray-600"><strong>Solution:</strong> Check that your card details are correct, including the expiration date and security code. If your card is still being declined, contact your bank to ensure there are no issues with your account.</p>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Issue 3: Payment Processing Error</h2>
						<p className="text-gray-600"><strong>Error Message:</strong> "Payment processing error" or "Transaction failed"</p>
						<p className="text-gray-600"><strong>Solution:</strong> Try clearing your browser cache and cookies, then attempt the payment again. If the issue persists, contact our support team for assistance.</p>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Issue 4: PayPal Payment Issues</h2>
						<p className="text-gray-600"><strong>Error Message:</strong> "PayPal payment failed" or "PayPal transaction cancelled"</p>
						<p className="text-gray-600"><strong>Solution:</strong> Check your PayPal account to ensure you have sufficient funds and that your account is in good standing. If you're still having trouble, contact PayPal support for assistance.</p>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Issue 5: Discount or Promo Code Not Applied</h2>
						<p className="text-gray-600"><strong>Error Message:</strong> "Discount code not valid" or "Promo code not applied"</p>
						<p className="text-gray-600"><strong>Solution:</strong> Check that the discount or promo code is valid and has not expired. Ensure that you're entering the code correctly and that it's applicable to your order. If you're still having trouble, contact our support team for assistance.</p>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Additional Troubleshooting Steps</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>Check your internet connection: Ensure your internet connection is stable and working properly.</li>
							<li>Clear browser cache and cookies: Clearing your browser cache and cookies can resolve issues with payment processing.</li>
							<li>Try a different browser: If you're experiencing issues with one browser, try using a different browser to complete your payment.</li>
							<li>Contact your bank: If you're experiencing issues with your card or payment method, contact your bank to ensure there are no issues with your account.</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Still Having Trouble?</h2>
						<p className="text-gray-600">If none of the above solutions resolve your payment issue, please contact our support team for further assistance. We're here to help and want to ensure that you can complete your order successfully.</p>
						<p className="text-gray-600 mt-4">
							<strong>Contact Us:</strong>
						</p>
						<ul className="mt-4 text-gray-600">
							<li>Email: <span className="text-red-500">contact@flavourdash.com</span></li>
						</ul>
					</section>

					<p className="text-gray-600 mt-6">We hope this article has been helpful in guiding you through the process of viewing and tracking your orders on our website. If you have any further questions or concerns, please don't hesitate to contact us.</p>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article2;