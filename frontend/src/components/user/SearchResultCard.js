import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

export function SearchResultCard({ product }) {
	const { cartItems, addToCart } = useCart();
	const isInCart = cartItems.some(item => item._id === product._id);
	const [categoryName, setCategoryName] = useState('');

	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const response = await axios.get(`http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000/api/categories/${product.category}`);
				setCategoryName(response.data.name);
			} catch (error) {
				console.error('Error fetching category:', error);
				setCategoryName('Unknown Category');
			}
		};

		if (product.category) {
			fetchCategory();
		}
	}, [product.category]);

	return (
		<div className="w-full h-[200px] flex flex-row items-center bg-white border border-gray-200 rounded hover:shadow-xl transition-shadow">
			<div
				className="h-full aspect-square bg-cover bg-center rounded-tl rounded-bl"
				style={{
					backgroundImage: `url(${product.image})`
				}}
			></div>

			<div className="w-full flex flex-row items-center justify-between px-12">
				<div className="flex flex-col items-start justify-center gap-4">
					<Link
						to={`/categories/${product.category}`}
						className="flex flex-row items-center justify-center gap-1 text-md font-semibold text-red-500 hover:text-red-600"
					>
						In {categoryName}
						<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
					</Link>

					<span className="flex flex-col justify-center gap-2">
						<a href={`/products/${product._id}`} className="w-fit block text-lg font-bold text-black hover:text-red-500 truncate">
							{product.name}
						</a>

						{product.discount === 0 ? (
							<p className="text-sm font-medium mb-1">
								LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							</p>
						) : (
							<span className="flex flex-row gap-2 mb-1">
								<p className="text-sm font-medium">
									LKR {((product.price) * (100 - product.discount) / 100)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
								</p>

								<p className="text-sm font-light text-gray-400 line-through">
									LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
								</p>
							</span>
						)}

						{product.foodType === 'Vegetarian' ? (
							<span className="flex flex-row items-center gap-2 text-xs font-normal">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								Vegetarian
							</span>
						) : (
							<span className="flex flex-row items-center gap-2 text-xs font-normal">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								Non-Vegetarian
							</span>
						)}
					</span>
				</div>

				<div className="flex flex-row items-center justify-center gap-4">
					<button
						onClick={() => addToCart(product)}
						className={`flex flex-row items-center justify-center gap-3 ${isInCart
							? 'text-green-600 hover:text-green-700'
							: 'text-red-600 hover:text-red-700'
							} hover:bg-zinc-100 border border-zinc-200 rounded p-2.5 transition-colors`}
						title={isInCart ? 'In Cart' : 'Add to Cart'}
					>
						{isInCart ? (
							<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.5 17h-5.5v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /><path d="M15 19l2 2l4 -4" /></svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
								<path d="M12.5 17h-6.5v-14h-2" />
								<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
								<path d="M16 19h6" />
								<path d="M19 16v6" />
							</svg>
						)}
					</button>

					<Link
						to={`/products/${product._id}`}
						className="text-red-600 hover:text-red-700 hover:bg-zinc-100 border border-zinc-200 rounded p-2.5 transition-colors"
						title="View Product"
					>
						<svg  xmlns="http://www.w3.org/2000/svg"  width={20}  height={20}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
					</Link>
				</div>
			</div>
		</div>
	);
}