import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';
import ReviewApproveModal from '../../components/admin/reviewsdashboard/ReviewApproveModal';
import ReviewDeclineModal from '../../components/admin/reviewsdashboard/ReviewDeclineModal';
import ReviewUndoModal from '../../components/admin/reviewsdashboard/ReviewUndoModal';

function AdminReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
	const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
	const [isUndoModalOpen, setIsUndoModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleApprove = (item) => {
		setSelectedItem(item);
		setIsApproveModalOpen(true);
	};

	const handleDecline = (item) => {
		setSelectedItem(item);
		setIsDeclineModalOpen(true);
	};

	const handleUndo = async (item) => {
		setSelectedItem(item);
		setIsUndoModalOpen(true);
	};

	const handleApproveConfirm = async () => {
		try {
			await axios.put(`http://localhost:8000/api/reviews/update/${selectedItem._id}`, { status: 'Approved' });
			await fetchReviews();
			setIsApproveModalOpen(false);
		} catch (error) {
			console.error('Error approving review:', error);
		}
	};

	const handleDeclineConfirm = async () => {
		try {
			await axios.put(`http://localhost:8000/api/reviews/update/${selectedItem._id}`, { status: 'Declined' });
			await fetchReviews();
			setIsDeclineModalOpen(false);
		} catch (error) {
			console.error('Error declining review:', error);
		}
	};

	const handleUndoConfirm = async () => {
		try {
			await axios.put(`http://localhost:8000/api/reviews/update/${selectedItem._id}`, { status: 'Pending' });
			await fetchReviews();
			setIsUndoModalOpen(false);
		} catch (error) {
			console.error('Error undoing review:', error);
		}
	};

	const fetchReviews = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/reviews');
			setReviews(response.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	}, []);

	const fetchAllData = useCallback(async () => {
		await fetchReviews();
	}, [fetchReviews]);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	return (
		<>
			<div className="h-screen w-full flex flex-row">
				<SideMenu />

				<div className="h-full w-4/5 flex flex-col bg-gray-100">
					<AdminNavbar />

					<div className="w-full flex" style={{ height: 'calc(100% - 70px)' }}>
						<div className="w-full h-full flex flex-col gap-4 container mx-auto p-4">
							<div className="w-full flex flex-col gap-4 container mx-auto p-4 text-black bg-white rounded">
								<span className="w-full flex flex-row justify-between items-center">
									<h1 className="font-semibold">Review Management</h1>

									<button onClick={fetchAllData} className="flex flex-row items-center justify-center gap-2 text-xs text-red-500 px-2 py-2 rounded outline-none bg-white hover:bg-gray-100 focus:bg-gray-100">
										<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
											<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
										</svg>
										Refresh
									</button>
								</span>
							</div>

							<div className="h-full w-full flex flex-col gap-4 container mx-auto text-black bg-white rounded overflow-auto">
								<table className="w-full table-auto">
									<thead className="sticky top-0 bg-white">
										<tr>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[100px]">ID</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[200px]">Full Name</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Rating</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[300px]">Description</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Actions</th>
										</tr>
									</thead>

									<tbody>
										{reviews.map((review) => (
											<tr key={review._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{review._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{review.fullName}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{review.rating}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{review.description}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														{review.status === 'Declined' ? (
															<span className="h-full w-full flex flex-row items-center justify-center gap-2">
																<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-red-100">
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M18 6l-12 12" />
																		<path d="M6 6l12 12" />
																	</svg>
																	Declined
																</span>
																<button
																	onClick={() => handleUndo(review)}
																	className="flex flex-row items-center justify-center gap-1 text-xs text-white px-1 py-1 rounded outline-none bg-gray-500 hover:bg-gray-400 focus:bg-gray-400"
																	title="Undo Decline"
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M9 14l-4 -4l4 -4" />
																		<path d="M5 10h11a4 4 0 1 1 0 8h-1" />
																	</svg>
																</button>
															</span>
														) : review.status === 'Approved' ? (
															<span className="h-full w-full flex flex-row items-center justify-center gap-2">
																<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-green-100">
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M5 12l5 5l10 -10" />
																	</svg>
																	Approved
																</span>
																<button
																	onClick={() => handleUndo(review)}
																	className="flex flex-row items-center justify-center gap-1 text-xs text-white px-1 py-1 rounded outline-none bg-gray-500 hover:bg-gray-400 focus:bg-gray-400"
																	title="Undo Approve"
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M9 14l-4 -4l4 -4" />
																		<path d="M5 10h11a4 4 0 1 1 0 8h-1" />
																	</svg>
																</button>
															</span>
														) : (
															<span className="h-full w-full flex flex-row items-center justify-center gap-2">
																<button
																	onClick={() => handleDecline(review)}
																	className="flex flex-row items-center justify-center gap-1 text-xs text-white px-2 py-1 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M18 6l-12 12" />
																		<path d="M6 6l12 12" />
																	</svg>
																	Decline
																</button>
																<button
																	onClick={() => handleApprove(review)}
																	className="flex flex-row items-center justify-center gap-1 text-xs text-white px-2 py-1 rounded outline-none bg-green-500 hover:bg-green-400 focus:bg-green-400"
																>
																	<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
																		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																		<path d="M5 12l5 5l10 -10" />
																	</svg>
																	Approve
																</button>
															</span>
														)}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ReviewApproveModal
				isOpen={isApproveModalOpen}
				onClose={() => setIsApproveModalOpen(false)}
				onConfirm={handleApproveConfirm}
			/>

			<ReviewDeclineModal
				isOpen={isDeclineModalOpen}
				onClose={() => setIsDeclineModalOpen(false)}
				onConfirm={handleDeclineConfirm}
			/>

			<ReviewUndoModal
				isOpen={isUndoModalOpen}
				onClose={() => setIsUndoModalOpen(false)}
				onConfirm={handleUndoConfirm}
			/>
		</>
	);
}

export default AdminReviewsPage;