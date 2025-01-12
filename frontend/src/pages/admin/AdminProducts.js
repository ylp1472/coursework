import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';
import NewProductModal from '../../components/admin/productsdashboard/NewProductModal';
import ProductEditModal from '../../components/admin/productsdashboard/ProductEditModal';
import ProductDeleteModal from '../../components/admin/productsdashboard/ProductDeleteModal';

function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleNewProduct = async (productData) => {
		try {
			const payload = {
				name: productData.name,
				price: productData.price,
				discount: productData.discount,
				quantity: productData.quantity,
				description: productData.description,
				foodType: productData.foodType,
				category: productData.category,
				portion: productData.portion,
				image: productData.image
			};
			await axios.post('http://localhost:8000/api/products/create', payload);
			await fetchProducts();
			setIsNewProductModalOpen(false);
		} catch (error) {
			console.error('Error creating product:', error);
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
				price: updatedItem.price,
				discount: updatedItem.discount,
				quantity: updatedItem.quantity,
				description: updatedItem.description,
				foodType: updatedItem.foodType,
				category: updatedItem.category,
				portion: updatedItem.portion,
				image: updatedItem.image
			};
			await axios.put(`http://localhost:8000/api/products/update/${updatedItem._id}`, payload);
			await fetchProducts();
			setIsModalOpen(false);
		} catch (error) {
			console.error('Error updating product:', error);
		}
	};

	const handleDeleteConfirm = async () => {
		try {
			await axios.delete(`http://localhost:8000/api/products/delete/${selectedItem._id}`);
			await fetchProducts();
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	const fetchProducts = useCallback(async () => {
		try {
			const response = await axios.get('http://localhost:8000/api/products');
			setProducts(response.data.products);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	}, []);

	const fetchAllData = useCallback(async () => {
		await fetchProducts();
	}, [fetchProducts]);

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
									<h1 className="font-semibold">Product Management</h1>

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
											onClick={() => setIsNewProductModalOpen(true)}
											className="flex flex-row items-center justify-center gap-2 text-xs text-white px-2 py-2 rounded outline-none bg-red-500 hover:bg-red-400 focus:bg-red-400"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
												<path d="M9 12h6" />
												<path d="M12 9v6" />
											</svg>
											Add Product
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
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Price (LKR)</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Discount (%)</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Quantity</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[300px]">Description</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Food Type</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Category</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Portion</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[300px]">Image</th>
											<th className="text-red-500 bg-red-100 text-sm px-4 py-4 min-w-[150px]">Actions</th>
										</tr>
									</thead>

									<tbody>
										{products.map((product) => (
											<tr key={product._id}>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product._id}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<a className="font-medium underline" href={`/products/${product._id}`} target="_blank" rel="noreferrer">{product.name}</a>
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.price}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.discount}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.quantity}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.description}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.foodType}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.category}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">{product.portion}</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex items-center justify-center">
														<img src={product.image} className="h-[100px] w-full object-cover object-center rounded" alt={product.name} />
													</span>
												</td>
												<td className="border-t-2 text-sm text-center px-4 py-4">
													<span className="h-full w-full flex flex-row items-center justify-center gap-2">
														<button
															onClick={() => handleEdit(product)}
															className="text-xs text-white px-2 py-1 rounded outline-none bg-blue-500 hover:bg-blue-400 focus:bg-blue-400"
														>
															Edit
														</button>
														<button
															onClick={() => handleDelete(product)}
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

			<NewProductModal
				isOpen={isNewProductModalOpen}
				onClose={() => setIsNewProductModalOpen(false)}
				onSave={handleNewProduct}
			/>

			<ProductEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				item={selectedItem}
				onSave={handleSave}
			/>

			<ProductDeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}
				item={selectedItem}
			/>
		</>
	);
}

export default AdminProductsPage;