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
				<h1 className="text-6xl font-bold text-white text-center">
					Viewing and Tracking Orders
				</h1>
			</header>


			<div className="min-h-screen bg-gray-100 py-8 px-4">
				<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Viewing Your Orders</h2>
						<ol className="list-decimal list-inside space-y-2 text-gray-600">
							<li>
								<strong>Log in to your account:</strong> Click on the <span className="font-medium">"Log in"</span> button at the top right corner of our website and enter your email address and password.
							</li>
							<li>
								<strong>Access your order history:</strong> Once logged in, click on your name or profile picture at the top right corner, then select <span className="font-medium">"Order History"</span> from the dropdown menu.
							</li>
							<li>
								<strong>View order details:</strong> On the Order History page, click on the <span className="font-medium">"View Order"</span> button next to the order you want to view.
							</li>
							<li>
								<strong>Order summary:</strong> You will be taken to the Order Summary page, where you can view details such as items ordered, total cost, and order status.
							</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Tracking Your Orders</h2>
						<ol className="list-decimal list-inside space-y-2 text-gray-600">
							<li>
								<strong>Log in to your account:</strong> Follow the same steps as above to log in.
							</li>
							<li>
								<strong>Access your order history:</strong> Click on your name or profile picture at the top right corner, then select <span className="font-medium">"Order History"</span> from the dropdown menu.
							</li>
							<li>
								<strong>View order status:</strong> On the Order History page, you will see the status of each order next to the order number.
							</li>
							<li>
								<strong>Track order progress:</strong> Click on the <span className="font-medium">"Track Order"</span> button next to the order you want to track. You will see the progress of your order through stages like preparation, cooking, and delivery.
							</li>
						</ol>
					</section>

					<section className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Order Statuses</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li><strong>Pending:</strong> Your order has been received but not started yet.</li>
							<li><strong>Preparing:</strong> Your order is being prepared.</li>
							<li><strong>Cooking:</strong> Your order is being cooked.</li>
							<li><strong>Ready for collection:</strong> Your order is ready for pickup.</li>
							<li><strong>Out for delivery:</strong> Your order is on its way to you.</li>
							<li><strong>Delivered:</strong> Your order has been delivered.</li>
							<li><strong>Cancelled:</strong> Your order has been cancelled.</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-2 text-gray-700">Troubleshooting</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>Check your email for the order confirmation.</li>
							<li>Log out and log back in to refresh your order history.</li>
							<li>Contact customer support using the form on our website.</li>
						</ul>
					</section>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Article1;