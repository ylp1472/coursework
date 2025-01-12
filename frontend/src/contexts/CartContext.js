import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState(() => {
		// Load cart items from localStorage on initial render
		const savedCart = localStorage.getItem('cartItems');
		return savedCart ? JSON.parse(savedCart) : [];
	});

	// Save to localStorage whenever cart changes
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (product) => {
		setCartItems(prevItems => {
			const existingItem = prevItems.find(item => item._id === product._id);
			if (existingItem) {
				return prevItems.map(item =>
					item._id === product._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}
			return [...prevItems, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId) => {
		setCartItems(prevItems =>
			prevItems.filter(item => item._id !== productId)
		);
	};

	const updateQuantity = (productId, quantity) => {
		setCartItems(prevItems =>
			prevItems.map(item =>
				item._id === productId
					? { ...item, quantity: Math.max(0, quantity) }
					: item
			).filter(item => item.quantity > 0)
		);
	};

	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem('cartItems');
	};

	return (
		<CartContext.Provider value={{
			cartItems,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart
		}}>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);