import React from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

function Article10() {
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
					Understanding Account Types
				</h1>
			</header>

			<div className="bg-gray-100 min-h-screen flex justify-center items-center py-12">
				<div className="max-w-4xl bg-white p-8 rounded-lg shadow-md">
					<p className="text-gray-700 mb-8">
						At <span className="font-semibold">FlavourDash</span>, we have
						different types of accounts to cater to the needs of our customers and
						staff. Here's a guide to help you understand the different account
						types and their features:
					</p>

					{/* Account Types */}
					<div className="space-y-6">
						{/* Customer Account */}

						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Customer Account
						</h2>
						<p className="text-gray-600 mb-4">
							A customer account is for individuals who want to shop online from our restaurant.
						</p>
						<h3 className="font-semibold text-gray-700">Features:</h3>
						<ul className="list-disc list-inside text-gray-600 mb-4">
							<li>Place orders online</li>
							<li>View order history</li>
							<li>Save favorite products</li>
							<li>Receive exclusive offers and discounts</li>
							<li>Manage account information (e.g., email, password, address)</li>
						</ul>
						<p className="text-gray-600">
							<strong>Who is it for:</strong> Customers who want to shop online from our restaurant.
						</p>


						{/* Admin Account */}
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Admin Account
						</h2>
						<p className="text-gray-600 mb-4">
							An admin account is for authorized staff members who need to
							manage the restaurant's online presence.
						</p>
						<h3 className="font-semibold text-gray-700">Features:</h3>
						<ul className="list-disc list-inside text-gray-600 mb-4">
							<li>Manage product inventory and pricing</li>
							<li>View and manage orders</li>
							<li>Manage customer accounts</li>
							<li>Manage promotions and discounts</li>
							<li>View sales reports and analytics</li>
						</ul>
						<p className="text-gray-600">
							<strong>Who is it for:</strong> Authorized staff members who need
							to manage the restaurant's online presence.
						</p>


						{/* Staff Account */}
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Staff Account
						</h2>
						<p className="text-gray-600 mb-4">
							A staff account is for employees who need to access the
							restaurant's online system to perform their job duties.
						</p>
						<h3 className="font-semibold text-gray-700">Features:</h3>
						<ul className="list-disc list-inside text-gray-600 mb-4">
							<li>View and manage orders</li>
							<li>Manage customer accounts</li>
							<li>View product inventory and pricing</li>
							<li>Manage promotions and discounts</li>
						</ul>
						<p className="text-gray-600">
							<strong>Who is it for:</strong> Employees who need to access the
							restaurant's online system to perform their job duties.
						</p>


						{/* Owner Account */}
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Owner Account
						</h2>
						<p className="text-gray-600 mb-4">
							An owner account is for the restaurant owner or manager who needs
							to have full control over the online system.
						</p>
						<h3 className="font-semibold text-gray-700">Features:</h3>
						<ul className="list-disc list-inside text-gray-600 mb-4">
							<li>Manage all aspects of the online system</li>
							<li>View and manage orders</li>
							<li>Manage customer accounts</li>
							<li>Manage product inventory and pricing</li>
							<li>Manage promotions and discounts</li>
							<li>View sales reports and analytics</li>
						</ul>
						<p className="text-gray-600">
							<strong>Who is it for:</strong> The restaurant owner or manager
							who needs to have full control over the online system.
						</p>
					</div>

					{/* Troubleshooting */}
					<div className="mt-8">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Troubleshooting Account Type Issues
						</h2>
						<ul className="list-disc list-inside text-gray-600 space-y-2">
							<li>
								<strong>Error message:</strong> If you receive an error message,
								try logging out and logging back in.
							</li>
							<li>
								<strong>Incorrect account type:</strong> Ensure you're using the
								correct account type to access specific features.
							</li>
							<li>
								<strong>Account not activated:</strong> Contact our support team
								for assistance.
							</li>
						</ul>
					</div>

					{/* Contact Section */}
					<div className="mt-8">
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Still Having Trouble?
						</h2>
						<p className="text-gray-600 mb-4">
							If you're still having trouble understanding account types or
							accessing your account, please contact our support team. We're here
							to help!
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

export default Article10;