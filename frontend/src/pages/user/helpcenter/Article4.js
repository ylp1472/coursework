import React from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article1() {
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
				<h1 className="text-4xl font-bold text-white text-center">Order Status Guide</h1>
			</header>

			<div className="p-6 bg-gray-100 min-h-screen">
				<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
					<p className="text-gray-700 mb-6">At FlavourDash, we want to keep you informed about the status of your order. Here's a guide to understanding the different order statuses you may see:</p>

					{/* Order Statuses Section */}
					<div className="space-y-6 mb-8">
						<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Order Status Types</h2>

						<div className="space-y-4">
							<div className="pl-4">
								<h3 className="font-semibold mb-2">Status 1: Pending</h3>
								<p className="text-gray-700 pl-4">Your order has been received, but we haven't started processing it yet. This is usually because we're waiting for payment confirmation or because our team is reviewing your order.</p>
							</div>

							<div className="pl-4">
								<h3 className="font-semibold mb-2">Status 2: Processing</h3>
								<p className="text-gray-700 pl-4">We're preparing your order in our kitchen. This status means that our team is busy cooking, packing, and getting your order ready for delivery or pickup.</p>
							</div>

							<div className="pl-4">
								<h3 className="font-semibold mb-2">Status 3: Ready for Pickup</h3>
								<p className="text-gray-700 pl-4">Your order is ready for pickup at our restaurant. If you've chosen to pick up your order, this status means that it's ready and waiting for you.</p>
							</div>

							<div className="pl-4">
								<h3 className="font-semibold mb-2">Status 4: Out for Delivery</h3>
								<p className="text-gray-700 pl-4">Our delivery team is on the way to deliver your order. This status means that your order has left our restaurant and is en route to your doorstep.</p>
							</div>

							<div className="pl-4">
								<h3 className="font-semibold mb-2">Status 5: Delivered</h3>
								<p className="text-gray-700 pl-4">Your order has been successfully delivered to your doorstep. This status means that our delivery team has handed over your order to you or left it at your designated delivery address.</p>
							</div>
						</div>
					</div>

					{/* What to Expect Section */}
					<div className="space-y-6 mb-8">
						<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">What to Expect at Each Status</h2>

						<div className="space-y-4">
							{['Pending', 'Processing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'].map((status, index) => (
								<div key={status} className="pl-4">
									<h3 className="font-semibold mb-2">Status {index + 1}: {status}</h3>
									<p className="text-gray-700 pl-4">We'll send you an email or SMS to keep you updated about your order status. You'll receive notifications at each step of the process.</p>
								</div>
							))}
						</div>
					</div>

					{/* Troubleshooting Section */}
					<div className="space-y-6 mb-8">
						<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Troubleshooting Common Issues</h2>

						<div className="space-y-4">
							<div className="pl-4">
								<h3 className="font-semibold mb-2">Issue 1: Order Not Received</h3>
								<p className="text-gray-700 pl-4">If you haven't received your order and the status says "Delivered", please contact our support team for assistance. We'll investigate and resolve the issue as quickly as possible.</p>
							</div>

							<div className="pl-4">
								<h3 className="font-semibold mb-2">Issue 2: Order Delayed</h3>
								<p className="text-gray-700 pl-4">If your order is delayed and the status says "Processing" or "Out for Delivery", please contact our support team for an update. We'll provide you with an estimated delivery time.</p>
							</div>
						</div>
					</div>

					{/* Contact Section */}
					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Still Having Trouble?</h2>
						<p className="text-gray-700">If you're having trouble understanding your order status or have concerns about your order, please contact our support team for assistance.</p>
						<h3 className="font-semibold mb-2">Contact Us</h3>
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

export default Article1;