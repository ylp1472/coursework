import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article3() {
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
					How to Apply Promo Codes and Discounts
				</h1>
			</header>

			<div className="min-h-screen bg-gray-100 py-8 px-4">
				<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">

					<p className="text-gray-600 mb-6">At FlavourDash, we love to reward our customers with exclusive promo codes and discounts. Here's a step-by-step guide on how to apply promo codes and discounts to your order:</p>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Where to Find Promo Codes and Discounts</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li><strong>Email Newsletter:</strong> We regularly send out exclusive promo codes and discounts to our email subscribers. Sign up for our newsletter to stay up-to-date on our latest offers.</li>
							<li><strong>Social Media:</strong> Follow us on social media to stay informed about our latest promotions and discounts.</li>
							<li><strong>Website Banners:</strong> Keep an eye on our website banners for promo codes and discounts.</li>
							<li><strong>Partner Websites:</strong> We sometimes partner with other websites to offer exclusive promo codes and discounts.</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">How to Apply a Promo Code</h2>
						<ol className="list-decimal list-inside space-y-2 text-gray-600">
							<li><strong>Add items to your cart:</strong> Start by adding the items you'd like to order to your cart.</li>
							<li><strong>Proceed to checkout:</strong> Click on the "Checkout" button to proceed to the checkout page.</li>
							<li><strong>Enter promo code:</strong> On the checkout page, you'll see a field labeled "Promo Code" or "Discount Code". Enter your promo code in this field.</li>
							<li><strong>Apply promo code:</strong> Click on the "Apply" button to apply the promo code to your order.</li>
							<li><strong>Verify discount:</strong> If the promo code is valid, you'll see the discount applied to your order total.</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Types of Promo Codes and Discounts</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li><strong>Percentage Off:</strong> A percentage off your total order (e.g. 10% off).</li>
							<li><strong>Fixed Amount Off:</strong> A fixed amount off your total order (e.g. $5 off).</li>
							<li><strong>Free Delivery:</strong> Free delivery on your order.</li>
							<li><strong>Buy One Get One Free (BOGO):</strong> Buy one item and get another item of equal or lesser value for free.</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Promo Code Terms and Conditions</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li><strong>Expiry Date:</strong> Promo codes and discounts are only valid for a limited time. Make sure to check the expiry date before applying the code.</li>
							<li><strong>Minimum Order Value:</strong> Some promo codes and discounts may require a minimum order value to be eligible.</li>
							<li><strong>Excluded Items:</strong> Some items may be excluded from promo codes and discounts.</li>
							<li><strong>One-Time Use:</strong> Some promo codes and discounts may only be used once per customer.</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Troubleshooting Promo Code Issues</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li><strong>Invalid Promo Code:</strong> If you receive an error message stating that your promo code is invalid, check that you've entered the code correctly and that it hasn't expired.</li>
							<li><strong>Promo Code Not Applied:</strong> If your promo code isn't being applied to your order, check that you've met the minimum order value and that the code is valid for the items in your cart.</li>
						</ul>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Still Having Trouble?</h2>
						<p className="text-gray-600">If you're having trouble applying a promo code or discount, please contact our support team for assistance. We're here to help and want to ensure that you can enjoy our delicious food at the best possible price.</p>
						<p className="text-gray-600 mt-4">
							<strong>Contact Us:</strong>
						</p>
						<ul className="mt-4 text-gray-600">
							<li>Email: <span className="text-red-500">contact@flavourdash.com</span></li>
						</ul>
					</section>

					<p className="text-gray-600 mt-6">Thank you for choosing FlavourDash! We hope you enjoy your meal! If you have any further questions or concerns, please don't hesitate to contact us.</p>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article3;