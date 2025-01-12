import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

function ReviewsSlider() {
	const [reviews, setReviews] = useState([]);
	const [reviewsPage, setReviewsPage] = useState(1);
	const reviewsPerPage = 1;
	const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);

	const fetchReviews = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/reviews?sort=Approved');
			setReviews(response.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}, []);

	const reviewsToDisplay = reviews.slice(
		(reviewsPage - 1) * reviewsPerPage,
		reviewsPage * reviewsPerPage
	);

	function getStarIcons(rating) {
		const filled = Math.floor(rating);
		const half = rating % 1 >= 0.5 ? 1 : 0;
		const empty = 5 - filled - half;

		const stars = [];

		for (let i = 0; i < filled; i++) {
			stars.push(
				<svg key={`filled-${i}`} xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
				</svg>
			);
		}

		if (half) {
			stars.push(
				<svg key="half" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star-half">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 1a.993 .993 0 0 1 .823 .443l.067 .116l2.852 5.781l6.38 .925c.741 .108 1.08 .94 .703 1.526l-.07 .095l-.078 .086l-4.624 4.499l1.09 6.355a1.001 1.001 0 0 1 -1.249 1.135l-.101 -.035l-.101 -.046l-5.693 -3l-5.706 3c-.105 .055 -.212 .09 -.32 .106l-.106 .01a1.003 1.003 0 0 1 -1.038 -1.06l.013 -.11l1.09 -6.355l-4.623 -4.5a1.001 1.001 0 0 1 .328 -1.647l.113 -.036l.114 -.023l6.379 -.925l2.853 -5.78a.968 .968 0 0 1 .904 -.56zm0 3.274v12.476a1 1 0 0 1 .239 .029l.115 .036l.112 .05l4.363 2.299l-.836 -4.873a1 1 0 0 1 .136 -.696l.07 -.099l.082 -.09l3.546 -3.453l-4.891 -.708a1 1 0 0 1 -.62 -.344l-.073 -.097l-.06 -.106l-2.183 -4.424z" />
				</svg>
			);
		}

		for (let i = 0; i < empty; i++) {
			stars.push(
				<svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
				</svg>
			);
		}

		return stars;
	}

	const handleReviewsNextPage = () => {
		if (reviewsPage < totalReviewPages) {
			setReviewsPage(reviewsPage + 1);
		}
	};

	const handleReviewsPrevPage = () => {
		if (reviewsPage > 1) {
			setReviewsPage(reviewsPage - 1);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

	return (
		<div className="container flex flex-col items-center justify-center gap-10 mx-auto px-8 py-14">
			<h4 className="text-3xl font-bold">What Our Customers Say</h4>

			<div className="w-full h-[400px] flex flex-row items-center justify-center">
				<button
					onClick={handleReviewsPrevPage}
					disabled={reviewsPage === 1}
					className={reviewsPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-red-500 hover:text-red-600"}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M15 6l-6 6l6 6" />
					</svg>
				</button>
				<div
					className="w-2/12 h-5/6 flex items-center justify-center p-4 rounded-lg bg-cover bg-center opacity-30 ml-8 shadow-xl"
					style={{
						backgroundImage: `linear-gradient(#1E1E1ED0, #1E1E1ED0), url('https://i.postimg.cc/WbfVzPg1/reviews.webp')`,
					}}
				></div>
				{reviewsToDisplay.map((review) => (
					<div
						key={review._id}
						className="w-10/12 h-full flex flex-col items-center justify-center gap-4 p-10 rounded-lg ml-[-5px] mr-[-5px] text-white bg-cover bg-center z-[5] shadow-xl"
						style={{
							backgroundImage: `linear-gradient(#1E1E1EE0, #1E1E1EE0), url('https://i.postimg.cc/WbfVzPg1/reviews.webp')`,
						}}
					>
						<h5 className="font-semibold text-xl">{review.fullName}</h5>
						<span className="flex flex-row items-center justify-center gap-3">
							<div className="flex flex-row items-center justify-center gap-1.5 text-red-500">
								{getStarIcons(review.rating)}
							</div>
							{review.rating}
						</span>
						<p
							className="text-md text-center"
						>{review.description}</p>
					</div>
				))}
				<div
					className="w-2/12 h-5/6 flex items-center justify-center p-4 rounded-lg bg-cover bg-center opacity-30 mr-8 shadow-xl"
					style={{
						backgroundImage: `linear-gradient(#1E1E1ED0, #1E1E1ED0), url('https://i.postimg.cc/WbfVzPg1/reviews.webp')`,
					}}
				></div>
				<button
					onClick={handleReviewsNextPage}
					disabled={reviewsPage === totalReviewPages}
					className={reviewsPage === totalReviewPages ? "text-gray-300 cursor-not-allowed" : "text-red-500 hover:text-red-600"}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M9 6l6 6l-6 6" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default ReviewsSlider;