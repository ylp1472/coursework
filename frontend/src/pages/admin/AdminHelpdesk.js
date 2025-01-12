import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';
import TicketEditModal from '../../components/admin/ticketsdashboard/TicketEditModal';

function AdminHelpdeskPage() {
	const [tickets, setTickets] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleEdit = (item) => {
		setSelectedItem(item);
		setIsModalOpen(true);
	};

	const handleSave = async (updatedItem) => {
		try {
			const payload = {
				status: updatedItem.status
			};
			await axios.put(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/tickets/update/${updatedItem._id}`, payload);
			await fetchTickets();
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error updating ticket:', error);
		}
	};

	const fetchTickets = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/tickets');
			setTickets(response.data);
		} catch (error) {
			console.error('Error fetching tickets:', error);
		}
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const fetchAllData = useCallback(async () => {
		await fetchTickets();
	}, [fetchTickets]);

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
									<h1 className="font-semibold">Support Tickets</h1>

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
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[300px]">Created At</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[200px]">Email Address</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[250px]">Subject</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[350px]">Description</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Status</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Actions</th>
										</tr>
									</thead>

									<tbody>
										{tickets.map((ticket) => (
											<tr key={ticket._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{ticket._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													{formatDate(ticket.date)}
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{ticket.email}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{ticket.subject}</td>
												<td className="border-t-2 text-sm px-4 py-4">{ticket.description}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex items-center justify-center">
														{ticket.status === 'Open' ? (
															<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-blue-100">
																<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-progress">
																	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																	<path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969" />
																	<path d="M14 3.223a9.003 9.003 0 0 1 0 17.554" />
																	<path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592" />
																	<path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305" />
																	<path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356" />
																</svg>
																Open
															</span>
														) : (
															<span className="flex flex-row items-center justify-center gap-1 text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-500 border-dashed bg-green-100">
																<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
																	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
																	<path d="M5 12l5 5l10 -10" />
																</svg>
																Closed
															</span>
														)}
													</span>
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														<button
															onClick={() => handleEdit(ticket)}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-blue-500 hover:bg-blue-400 focus:bg-blue-400"
														>
															Update Status
														</button>
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

			<TicketEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSave}
				item={selectedItem}
			/>
		</>
	);
}

export default AdminHelpdeskPage;