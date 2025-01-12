import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../../contexts/CartContext';

function CartDropdown() {
	const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
	const cartDropdownRef = useRef(null);
	const { cartItems, removeFromCart, updateQuantity } = useCart();

	const cartTotal = cartItems.reduce((total, item) =>
		total + (item.price * (100 - item.discount) / 100) * item.quantity, 0
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
				setIsCartDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={cartDropdownRef}>
			<button
				onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
				className="flex text-white px-2 py-2 rounded outline-none hover:bg-red-500 focus:bg-red-500"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
					<path d="M17 17h-11v-14h-2" />
					<path d="M6 5l14 1l-1 7h-13" />
				</svg>
			</button>

			{isCartDropdownOpen && (
				<div className="absolute right-0 mt-2 w-[400px] rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
					<div className="py-1 flex flex-col gap-0.5">
						<h3 className="px-4 py-2 text-lg font-bold text-gray-800 border-b border-gray-200">Your Cart</h3>

						{cartItems.length === 0 ? (
							<p className="px-4 py-2 text-sm text-gray-500">Your cart is empty</p>
						) : (
							<>
								{cartItems.map(item => (
									<div key={item._id} className="px-4 py-4 flex items-center justify-between gap-4">
										<div className="w-full flex flex-row items-center justify-center gap-4">
											<img src={item.image} className="w-14 h-14 object-cover rounded" alt={item.name} />

											<div className="flex flex-col items-start justify-center gap-1 w-full">
												<Link
													to={`/products/${item._id}`}
													className="block text-xs font-medium truncate text-black hover:text-red-500"
												>
													{item.name}
												</Link>
												<p className="text-xs text-gray-500">
													LKR {((item.price * (100 - item.discount) / 100) * item.quantity).toFixed(2)}
												</p>
												<div className="flex items-center">
													<button
														className="text-red-500 hover:text-red-600 w-5 h-5 flex items-center justify-center text-sm font-medium"
														onClick={() => updateQuantity(item._id, item.quantity - 1)}
													>
														-
													</button>
													<span className="min-w-8 h-4 flex items-center justify-center text-xs select-none">
														{item.quantity}
													</span>
													<button
														className="text-red-500 hover:text-red-600 w-5 h-5 flex items-center justify-center text-sm font-medium"
														onClick={() => updateQuantity(item._id, item.quantity + 1)}
													>
														+
													</button>
												</div>
											</div>
										</div>

										<button
											onClick={() => removeFromCart(item._id)}
											className="text-red-500 hover:text-red-600 p-1 rounded-full"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M4 7h16" />
												<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
												<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
												<path d="M10 12l4 4m0 -4l-4 4" />
											</svg>
										</button>
									</div>
								))}
								<div className="border-t border-gray-200">
									<div className="px-4 py-4 flex justify-between">
										<span className="text-sm font-medium">
											Total:
										</span>
										<span className="text-sm font-medium">
											LKR {cartTotal.toFixed(2)}
										</span>
									</div>
									<Link
										to="/checkout"
										className="block w-full text-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700"
									>
										Checkout
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default CartDropdown;