import React from 'react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const PrivacyPolicy = () => {
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
					Privacy Policy
				</h1>
			</header>

			{/* Content */}
			<div className="flex-grow relative">
				<main className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
					{/* Introduction */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Introduction</h2>
						<p className="text-gray-600">
							At FlavourDash, we value your privacy and are committed to protecting your personal information.
							This Privacy Policy outlines how we collect, use, and share your information when you visit our website or
							use our services. By accessing our website or using our services, you agree to the terms of this Privacy Policy.
						</p>
					</section>

					{/* Information We Collect */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Information We Collect</h2>
						<p className="text-gray-600 mb-4">
							We collect the following categories of information to provide and improve our services:
						</p>
						<h3 className="text-xl font-semibold text-gray-800">Information You Provide Directly</h3>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>Name</li>
							<li>Email address</li>
							<li>Phone number</li>
							<li>Delivery or billing address</li>
							<li>Payment details</li>
						</ul>
						<h3 className="text-xl font-semibold text-gray-800 mt-6">Automatically Collected Information</h3>
						<p className="text-gray-600">
							When you interact with our website, we automatically collect:
						</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>IP address</li>
							<li>Browser type and version</li>
							<li>Device information</li>
							<li>Usage patterns (e.g., pages visited, time spent on the website)</li>
						</ul>
						<p className="text-gray-600">
							This data is collected using cookies and similar tracking technologies.
						</p>
						<h3 className="text-xl font-semibold text-gray-800 mt-6">Third-Party Information</h3>
						<p className="text-gray-600">
							We may receive information from social media platforms, advertising partners, or other third-party sources
							about your interactions with our advertisements or services.
						</p>
					</section>

					{/* How We Use Your Information */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">How We Use Your Information</h2>
						<p className="text-gray-600 mb-4">We use your personal information to:</p>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>Fulfill your orders and process payments.</li>
							<li>Manage reservations and provide customer support.</li>
							<li>Enhance our website and optimize your user experience.</li>
							<li>Communicate promotional offers, updates, and restaurant-related announcements.</li>
							<li>Ensure the security and integrity of our website.</li>
						</ul>
					</section>

					{/* Sharing Your Information */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Sharing Your Information</h2>
						<p className="text-gray-600">
							We may share your information under the following circumstances:
						</p>
						<h3 className="text-xl font-semibold text-gray-800 mt-6">With Service Providers</h3>
						<p className="text-gray-600">
							Payment processors, delivery partners, and reservation management platforms to facilitate your transactions.
						</p>
						<h3 className="text-xl font-semibold text-gray-800 mt-6">With Marketing Partners</h3>
						<p className="text-gray-600">
							To provide targeted advertisements or promotional campaigns, only with your consent.
						</p>
						<h3 className="text-xl font-semibold text-gray-800 mt-6">To Comply with Legal Obligations</h3>
						<p className="text-gray-600">
							When required by law or to protect the rights, safety, and security of our customers, employees, or business.
						</p>
					</section>

					{/* Your Privacy Choices */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Your Privacy Choices</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-600">
							<li>
								<strong>Account Management:</strong> You can access, update, or delete your personal information by logging into your account or contacting us.
							</li>
							<li>
								<strong>Marketing Preferences:</strong> You can opt out of receiving promotional emails by clicking the "unsubscribe" link in any email.
							</li>
							<li>
								<strong>Cookies and Tracking:</strong> You can manage your cookie preferences through your browser settings.
							</li>
						</ul>
					</section>

					{/* Data Security */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Data Security</h2>
						<p className="text-gray-600">
							We take reasonable administrative, technical, and physical measures to protect your personal information
							against unauthorized access, alteration, or destruction. While we strive to protect your data, no method of
							transmission or storage is 100% secure, and we cannot guarantee absolute security.
						</p>
					</section>

					{/* Changes to This Privacy Policy */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Changes to This Privacy Policy</h2>
						<p className="text-gray-600">
							We may update this Privacy Policy periodically to reflect changes in our practices or for other operational,
							legal, or regulatory reasons. If significant changes are made, we will notify you via email or by posting a
							prominent notice on our website.
						</p>
					</section>

					{/* Contact Us */}
					<section>
						<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">Contact Us</h2>
						<p className="text-gray-600">
							If you have any questions or concerns about this Privacy Policy, please contact us at:
						</p>
						<address className="text-gray-600">
							<p>Email: <a href="mailto:flavourdashteam@gmail.com" className="text-red-600 hover:underline">flavourdashteam@gmail.com</a></p>
							<p>Address: No. 123, Main Street, Colombo, Sri Lanka.</p>
						</address>
					</section>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default PrivacyPolicy;
