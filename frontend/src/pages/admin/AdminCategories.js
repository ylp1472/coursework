import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';
import NewCategoryModal from '../../components/admin/categoriesdashboard/NewCategoryModal';
import CategoryEditModal from '../../components/admin/categoriesdashboard/CategoryEditModal';
import CategoryDeleteModal from '../../components/admin/categoriesdashboard/CategoryDeleteModal';

function AdminCategoriesPage() {
	const [categories, setCategories] = useState([]);
	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleNewCategory = async (categoryData) => {
		try {
			const payload = {
				name: categoryData.name,
				image: categoryData.image
			};
			await axios.post('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories/create', payload);
			await fetchCategories();
			setIsNewCategoryModalOpen(false);
		} catch (error) {
			console.error('Error creating category:', error);
		}
	};

	const handleEdit = (item) => {
		setSelectedItem(item);
		setIsModalOpen(true);
	};

	const handleDelete = (item) => {
		setSelectedItem(item);
		setIsDeleteModalOpen(true);
	};

	const handleSave = async (updatedItem) => {
		try {
			const payload = {
				name: updatedItem.name,
				image: updatedItem.image
			};
			await axios.put(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories/update/${updatedItem._id}`, payload);
			await fetchCategories();
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error updating category:', error);
		}
	};

	const handleDeleteConfirm = async () => {
		try {
			await axios.delete(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories/delete/${selectedItem._id}`);
			await fetchCategories();
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error('Error deleting category:', error);
		}
	};

	const fetchCategories = useCallback(async () => {
		try {
			const response = await axios.get('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories');
			setCategories(response.data.categories);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	}, []);

	const fetchAllData = useCallback(async () => {
		await fetchCategories();
	}, [fetchCategories]);

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
									<h1 className="font-semibold">Category Management</h1>

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
											onClick={() => setIsNewCategoryModalOpen(true)}
											className="flex flex-row items-center justify-center gap-2 text-xs text-white px-2 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
												<path d="M9 12h6" />
												<path d="M12 9v6" />
											</svg>
											Add Category
										</button>
									</span>
								</span>
							</div>

							<div className="h-full w-full flex flex-col gap-4 container mx-auto text-black bg-white rounded overflow-auto">
								<table className="w-full table-auto">
									<thead className="sticky top-0 bg-white">
										<tr>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[100px]">ID</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[200px]">Category</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[350px]">Image</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Actions</th>
										</tr>
									</thead>

									<tbody>
										{categories.map((category) => (
											<tr key={category._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{category._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<a className="font-medium underline" href={`/categories/${category._id}`} target="_blank" rel="noreferrer">
														{category.name}
													</a>
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex items-center justify-center">
														<img src={category.image} className="h-[100px] w-full object-cover object-center rounded" alt={category.name} />
													</span>
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														<button
															onClick={() => handleEdit(category)}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-blue-500 hover:bg-blue-400 focus:bg-blue-400"
														>
															Edit
														</button>
														<button
															onClick={() => handleDelete(category)}
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

			<NewCategoryModal
				isOpen={isNewCategoryModalOpen}
				onClose={() => setIsNewCategoryModalOpen(false)}
				onSave={handleNewCategory}
			/>

			<CategoryEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				onSave={handleSave}
			/>

			<CategoryDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}
				item={selectedItem}
			/>

		</>
	);
}

export default AdminCategoriesPage;