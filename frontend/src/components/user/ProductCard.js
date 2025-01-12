import React from "react";
import { useCart } from '../../contexts/CartContext';

export function ProductCard({ product }) {
	const { cartItems, addToCart } = useCart();
	const isInCart = cartItems.some(item => item._id === product._id);

	return (
		<div className="bg-white border border-gray-200 rounded hover:shadow-xl transition-shadow">
			<img src={product.image} alt={product.name} className="w-full h-[200px] rounded-tl rounded-tr object-cover object-center" />

			<div className="flex flex-col gap-5 p-4">
				<div className="flex flex-col gap-1">
					<a href={`/products/${product._id}`} className="block text-lg font-bold text-black hover:text-red-500 truncate">
						{product.name}
					</a>

					{product.discount === 0 ? (
						<p className="text-sm font-medium mb-1">
							LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
						</p>
					) : (
						<span className="flex flex-row gap-2 mb-1">
							<p className="text-sm font-light text-gray-400 line-through">
								LKR {product.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							</p>

							<p className="text-sm font-medium">
								LKR {((product.price) * (100 - product.discount) / 100)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
				</div>

				<button
					onClick={() => addToCart(product)}
					className={`w-full flex flex-row items-center justify-center gap-3 text-xs uppercase ${isInCart
						? 'bg-green-600 hover:bg-green-700'
						: 'bg-red-600 hover:bg-red-700'
						} text-white font-medium p-2.5 rounded transition-colors`}
				>
					{isInCart ? (
						<>
							<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.5 17h-5.5v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /><path d="M15 19l2 2l4 -4" /></svg>
							In Cart
						</>
					) : (
						<>
							<svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
								<path d="M12.5 17h-6.5v-14h-2" />
								<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" />
								<path d="M16 19h6" />
								<path d="M19 16v6" />
							</svg>
							Add to Cart
						</>
					)}
				</button>
			</div>
		</div>
	);
}