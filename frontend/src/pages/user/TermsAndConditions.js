import React from 'react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const TermsAndConditions = () => {
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
					Terms & Conditions
				</h1>
			</header>

			{/* Content Section */}
			<main className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Introduction
					</h2>
					<p className="text-gray-600">
						These Terms and Conditions ("Terms") govern your use of the
						FlavourDash website ("Website") and the services offered through it
						("Services"). By using the Website or Services, you agree to be
						bound by these Terms. If you do not agree to these Terms, you may
						not use the Website or Services.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Definitions
					</h2>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>
							“You” means any person or entity accessing or using the Website
							or Services.
						</li>
						<li>“We,” “us,” or “our” refers to FlavourDash.</li>
						<li>
							“Content” means any text, images, videos, or other materials
							displayed on or made available through the Website or Services.
						</li>
						<li>“Account” means your registered account on the Website.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Account Registration
					</h2>
					<p className="text-gray-600">
						To access certain features of the Website or Services, you may be
						required to create an account. When registering for an account, you
						agree to:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>Provide accurate and up-to-date information about yourself.</li>
						<li>Maintain the confidentiality of your account password.</li>
						<li>Be responsible for all activities that occur under your account.</li>
						<li>Notify us immediately of any unauthorized use of your account.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Acceptable Use
					</h2>
					<p className="text-gray-600">
						You agree to use the Website and Services only for lawful purposes.
						You agree not to:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>
							Use the Website or Services in any way that could disrupt,
							damage, or impair the Website or interfere with another user's
							access.
						</li>
						<li>
							Use the Website or Services to transmit harmful, threatening, or
							objectionable content.
						</li>
						<li>Misrepresent your affiliation with any person or entity.</li>
						<li>
							Collect or store personal information about others without their
							explicit consent.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Orders and Payments
					</h2>
					<p className="text-gray-600">
						By placing an order through FlavourDash, you agree to provide
						accurate order details and payment information. All payments are
						processed securely. You are responsible for ensuring your payment
						method is valid at the time of purchase.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Delivery Policy
					</h2>
					<p className="text-gray-600">
						We strive to deliver your orders promptly and efficiently. While we
						aim for accuracy, delivery times may vary depending on external
						factors. FlavourDash is not liable for delays caused by unforeseen
						circumstances.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Limitation of Liability
					</h2>
					<p className="text-gray-600">We are not responsible for:</p>
					<ul className="list-disc list-inside space-y-2 text-gray-600">
						<li>
							Any indirect, incidental, or consequential damages arising from
							your use of the Website or Services.
						</li>
						<li>
							Losses resulting from unauthorized access to your account due to
							your failure to safeguard your login details.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Changes to the Terms
					</h2>
					<p className="text-gray-600">
						We may update these Terms periodically to reflect changes in our
						policies or services. We will notify you of significant updates
						through email or by posting a notice on the Website.
					</p>
				</section>

				{/* Updated Contact Us Section */}
				<section>
					<h2 className="text-2xl font-semibold text-red-600 text-center mb-4">
						Contact Us
					</h2>
					<p className="text-gray-600">
						If you have any questions or concerns about this Terms And Conditions,
						please contact us at:
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
						<p>Address: No. 123, Main Street, Colombo, Sri Lanka.</p>
					</address>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default TermsAndConditions;
