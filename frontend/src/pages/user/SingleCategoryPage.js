import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { ProductCard } from '../../components/user/ProductCard';

export function SingleCategoryPage() {
	const { categoryId } = useParams();
	const [category, setCategory] = useState(null);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchCategoryAndProducts = async () => {
			try {
				// Fetch category details
				const categoryRes = await axios.get(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories/${categoryId}`);
				setCategory(categoryRes.data);

				// Fetch products for this category
				const productsRes = await axios.get(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/products?category=${categoryId}`);
				setProducts(productsRes.data.products);
			} catch (err) {
				console.error(err);
			}
		};

		fetchCategoryAndProducts();
	}, [categoryId]);

	return (
		<>
			<Navbar />

			<header
				className="w-full bg-cover bg-center flex flex-col gap-4 items-center justify-center mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url(${category?.image})`,
					height: '400px',
				}}
			>
				<span className="flex flex-row items-center gap-2 text-white text-sm font-semibold uppercase">
					<Link to="/categories">
						All Categories
					</Link>
					&gt;
				</span>
				<h1 className="text-6xl font-bold text-white text-center">{category?.name}</h1>
			</header>

			<div className="container flex flex-col items-center justify-center mx-auto px-8 my-14">
				{products.length === 0 ? (
					<p className="w-full bg-zinc-100 text-md font-medium text-gray-500 text-center p-10 rounded">
						No products found in this category
					</p>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				)}
			</div>

			<Footer />
		</>
	);
}

export default SingleCategoryPage;