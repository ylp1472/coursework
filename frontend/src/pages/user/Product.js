import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

function ProductPage() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productRes = await axios.get(`http://localhost:8000/api/products/${productId}`);
				setProduct(productRes.data);

				// Fetch category details
				if (productRes.data.category) {
					const categoryRes = await axios.get(`http://localhost:8000/api/categories/${productRes.data.category}`);
					setCategory(categoryRes.data);
				}

				setLoading(false);
			} catch (err) {
				setError('Failed to fetch details');
				setLoading(false);
			}
		};

		fetchData();
	}, [productId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!product) return <div>Product not found</div>;

	return (
		<>
			<Navbar />

			<div className="container mx-auto px-8 py-8">
				<div className="w-full flex flex-col gap-10 p-4">
					{/* Breadcrumb */}
					<span className="flex flex-row items-center gap-2 text-sm text-gray-600">
						<Link to={`/categories/${product?.category}`} className="text-red-500 hover:text-red-600">
							{category?.name}
						</Link>
						<span className="text-gray-500">&gt;</span>
						<span className="text-gray-600">{product?.name}</span>
					</span>

					{/* Product details */}
					<div className="w-full flex flex-row gap-20">
						<div className="h-96 aspect-square bg-white rounded-lg border-4 border-red-500">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full rounded object-cover object-center"
							/>
						</div>

						<div className="w-full flex flex-col gap-10">
							<h1 className="text-3xl font-bold text-red-500">
								{product.name}
							</h1>

							{product.discount === 0 ? (
								<p className="text-2xl font-medium text-gray-600">
									LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
								</p>
							) : (
								<span className="w-full flex flex-col gap-1">
									<span className="w-full flex flex-row items-center gap-3">
										<p className="text-md font-light text-gray-400 line-through">
											LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
										</p>

										<span className="text-md text-red-500 font-semibold">
											-{product.discount}%
										</span>
									</span>

									<p className="text-2xl font-medium text-gray-600">
										LKR {((product.price) * (100 - product.discount) / 100)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
									</p>
								</span>
							)}

							<p className="text-gray-600">
								{product.description}
							</p>

							<button className="w-fit flex flex-row items-center justify-center gap-3 px-10 text-xs uppercase bg-red-600 hover:bg-red-500 text-white font-medium p-2.5 rounded transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus">
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
									<path d="M12.5 17h-6.5v-14h-2" />
									<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
									<path d="M16 19h6" />
									<path d="M19 16v6" />
								</svg>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	)
}

export default ProductPage;