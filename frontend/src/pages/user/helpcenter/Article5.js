import React from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article5() {
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
					How to Cancel or Modify an Order
				</h1>
			</header>

			<div className="bg-gray-100 min-h-screen flex justify-center items-center py-12"> {/* Added py-12 for vertical padding */}
				<div className="max-w-4xl bg-white p-8 rounded-lg shadow-md">
					<p className="text-gray-700 mb-4">
						At <span className="font-semibold">FlavourDash</span>, we understand that circumstances change and you may need to cancel or modify your order. Here's a step-by-step guide on how to do so:
					</p>

					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancelling an Order</h2>

					<h3 className="text-xl font-semibold text-gray-800 mb-2">Online Orders</h3>
					<ol className="list-decimal list-inside space-y-2 text-gray-700">
						<li>Log in to your account on our website or mobile app.</li>
						<li>Go to your order history by clicking on the "Order History" or "My Orders" tab.</li>
						<li>Find the order you want to cancel and click on it to view the details.</li>
						<li>
							If the order is still in the "Pending" or "Processing" status, click on the "Cancel Order" button.
						</li>
						<li>Confirm cancellation by clicking on "Yes" when prompted.</li>
					</ol>

					<h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Phone Orders</h3>
					<ol className="list-decimal list-inside space-y-2 text-gray-700">
						<li>Call our restaurant directly to request a cancellation.</li>
						<li>Provide your order number to help our team locate your order.</li>
						<li>Our team will confirm that your order has been cancelled.</li>
					</ol>

					<h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Modifying an Order</h2>

					<h3 className="text-xl font-semibold text-gray-800 mb-2">Online Orders</h3>
					<ol className="list-decimal list-inside space-y-2 text-gray-700">
						<li>Log in to your account on our website or mobile app.</li>
						<li>Go to your order history by clicking on the "Order History" or "My Orders" tab.</li>
						<li>Find the order you want to modify and click on it to view the details.</li>
						<li>
							If the order is still in the "Pending" or "Processing" status, click on the "Modify Order" button.
						</li>
						<li>Make the necessary changes, such as adding or removing items, updating the delivery address, or changing the payment method.</li>
						<li>Confirm changes by clicking on "Save Changes."</li>
					</ol>

					<h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Phone Orders</h3>
					<ol className="list-decimal list-inside space-y-2 text-gray-700">
						<li>Call our restaurant directly to request a modification.</li>
						<li>Provide your order number to help our team locate your order.</li>
						<li>Request the desired changes and confirm them with our team.</li>
					</ol>

					<h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Important Notes</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Orders can only be cancelled or modified within certain time limits. If your order is "Out for Delivery," changes may not be possible.</li>
						<li>Cancelled orders will receive a full refund within 3-5 business days.</li>
						<li>Additional charges may apply for modifications.</li>
					</ul>

					<h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Troubleshooting Issues</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>
							If you can't cancel your order, it may already be "Out for Delivery" or being prepared. Please contact our support team for assistance.
						</li>
						<li>
							If you can't modify your order, it may already be in preparation. Contact our support team for help.
						</li>
					</ul>

					<h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
					<p className="text-gray-700 mb-2">We're here to help! Reach out to us through the following channels:</p>
					<ul className="mt-4 text-gray-600">
						<li>Email: <span className="text-red-500">contact@flavourdash.com</span></li>
					</ul>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article5;