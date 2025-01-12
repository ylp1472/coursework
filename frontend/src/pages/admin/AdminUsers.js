import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';
import NewAdminModal from '../../components/admin/usersdashboard/NewAdminModal';
import UserEditModal from '../../components/admin/usersdashboard/UserEditModal';
import UserDeleteModal from '../../components/admin/usersdashboard/UserDeleteModal';

function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [isNewAdminModalOpen, setIsNewAdminModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedType, setSelectedType] = useState(null); // 'user' or 'admin'
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleNewAdmin = async (adminData) => {
		try {
			const payload = {
				name: adminData.name,
				email: adminData.email,
				password: adminData.password,
				role: 'Admin'
			};
			await axios.post('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/admins/create', payload);
			await fetchAdmins();
			setIsNewAdminModalOpen(false);
		} catch (error) {
			console.error('Error creating admin:', error);
		}
	};

	const handleEdit = (item, type) => {
		setSelectedItem(item);
		setSelectedType(type);
		setIsModalOpen(true);
	};

	const handleDelete = (item, type) => {
		setSelectedItem(item);
		setSelectedType(type);
		setIsDeleteModalOpen(true);
	};

	const handleSave = async (updatedItem) => {
		try {
			if (selectedType === 'user') {
				const payload = {
					name: updatedItem.name,
					email: updatedItem.email
				};
				await axios.put(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/users/update/${updatedItem._id}`, payload);
				await fetchUsers();
			} else {
				const payload = {
					name: updatedItem.name,
					email: updatedItem.email
				};
				await axios.put(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/admins/update/${updatedItem._id}`, payload);
				await fetchAdmins();
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error updating item:', error);
		}
	};

	const handleDeleteConfirm = async () => {
		try {
			if (selectedType === 'user') {
				await axios.delete(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/users/delete/${selectedItem._id}`);
				await fetchUsers();
			} else {
				await axios.delete(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/admins/delete/${selectedItem._id}`);
				await fetchAdmins();
			}
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	const fetchUsers = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/users');
			setUsers(response.data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	}, []);

	const fetchAdmins = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/admins');
			setAdmins(response.data);
		} catch (error) {
			console.error('Error fetching admins:', error);
		}
	}, []);

	const fetchAllData = useCallback(async () => {
		await fetchUsers();
		await fetchAdmins();
	}, [fetchUsers, fetchAdmins]);

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
									<h1 className="font-semibold">User Management</h1>

									<span className="flex flex-row items-center gap-2">
										<button onClick={fetchAllData} className="flex flex-row items-center justify-center gap-2 text-xs text-red-500 px-2 py-2 rounded outline-none bg-white hover:bg-gray-100 focus:bg-gray-100">
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-refresh">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
												<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
											</svg>
											Refresh
										</button>

										<button
											onClick={() => setIsNewAdminModalOpen(true)}
											className="flex flex-row items-center justify-center gap-2 text-xs text-white px-2 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
												<path d="M9 12h6" />
												<path d="M12 9v6" />
											</svg>
											Add Admin
										</button>
									</span>
								</span>
							</div>

							<div className="h-full w-full flex flex-col gap-4 container mx-auto text-black bg-white rounded overflow-auto">
								<table className="w-full table-auto">
									<thead className="sticky top-0 bg-white">
										<tr>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[100px]">ID</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Name</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Email Address</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Role</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Actions</th>
										</tr>
									</thead>

									<tbody>
										{admins.map((admin) => (
											<tr key={admin._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{admin._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{admin.name}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{admin.email}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{admin.role}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														<button
															onClick={() => handleEdit(admin, 'admin')}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-blue-500 hover:bg-blue-400 focus:bg-blue-400"
														>
															Edit
														</button>
														<button
															onClick={() => handleDelete(admin, 'admin')}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
														>
															Delete
														</button>
													</span>
												</td>
											</tr>
										))}

										{users.map((user) => (
											<tr key={user._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{user._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{user.name}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{user.email}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{user.role}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														<button
															onClick={() => handleEdit(user, 'user')}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-blue-500 hover:bg-blue-400 focus:bg-blue-400"
														>
															Edit
														</button>
														<button
															onClick={() => handleDelete(user, 'user')}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
														>
															Delete
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

			<NewAdminModal
				isOpen={isNewAdminModalOpen}
				onClose={() => setIsNewAdminModalOpen(false)}
				onSave={handleNewAdmin}
			/>

			<UserEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				type={selectedType}
				onSave={handleSave}
			/>

			<UserDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}
				item={selectedItem}
				type={selectedType}
			/>
		</>
	);
}

export default AdminUsersPage;