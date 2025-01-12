import React from 'react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const ReturnPolicy = () => {
	return (
		<div className="flex flex-col min-h-screen bg-[#f8faf8]">
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
					Return Policy
				</h1>
			</header>

			{/* Content Section */}
			<main className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Introduction
					</h2>
					<p className="text-gray-600">
						At FlavourDash, we are committed to providing our customers with a seamless and satisfying experience. If you encounter issues with your order or service, you may request a return, refund, or exchange within 14 days of the purchase date, subject to the conditions outlined below.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Return Eligibility
					</h2>
					<p className="text-gray-600">
						To be eligible for a return or refund, the following conditions must be met:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>The item or service must not have been fully consumed or rendered.</li>
						<li>The issue must be documented and reported to our customer service team within 24 hours of receipt.</li>
						<li>Accompanied by proof of purchase (order confirmation email, receipt, or invoice).</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Exceptions
					</h2>
					<p className="text-gray-600">
						Certain items and services are not eligible for return, refund, or exchange, including but not limited to:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>Customized or special menu items specifically prepared based on your request.</li>
						<li>Orders that have been fully consumed or used.</li>
						<li>Items or services where the issue arises from user error (e.g., incorrect delivery address or failure to pick up the order on time).</li>
						<li>Issues reported beyond the stipulated reporting window.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Return Process
					</h2>
					<p className="text-gray-600">
						To request a return, refund, or exchange, please follow these steps:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>
							<strong>Contact Us:</strong> Reach out to our customer service team via email or phone to explain the issue and provide any supporting documentation (e.g., photos, receipts, or descriptions of the problem).
						</li>
						<li>
							<strong>Verification:</strong> Our team will review your request and, if applicable, provide a return authorization or approve a refund/exchange.
						</li>
						<li>
							<strong>Resolution:</strong> For approved cases, we will process the refund or arrange for an exchange promptly.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Refunds and Exchanges
					</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>Refunds will be processed within 5-7 business days once the request is approved.</li>
						<li>Refunds will be issued to the original payment method used at checkout.</li>
						<li>Exchanges will be coordinated to ensure you receive a replacement as quickly as possible.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Shipping and Delivery Costs
					</h2>
					<p className="text-gray-600">
						Delivery fees are non-refundable, except in cases where the issue resulted from our error (e.g., incorrect or damaged items delivered). For exchanges, any additional delivery costs will be communicated to you upfront.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Additional Notes
					</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>We reserve the right to refuse returns or refunds for issues arising from customer negligence.</li>
						<li>Refunds and exchanges are processed in the original currency of the purchase.</li>
						<li>For large or high-value orders, additional documentation may be required for refund or exchange approval.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Contact Us
					</h2>
					<p className="text-gray-600">
						If you have any questions or concerns regarding our return policy, please contact our customer service team for assistance:
					</p>
					<address className="text-gray-600">
						<p>
							Email:{' '}
							<a
								href="mailto:flavourdashteam@gmail.com"
								className="text-red-600 hover:underline"
							>
								flavourdashteam@gmail.com
							</a>
						</p>
						<p>Address: No. 123, Main Street, Colombo, Sri Lanka</p>
					</address>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default ReturnPolicy;
