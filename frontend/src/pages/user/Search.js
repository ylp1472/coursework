import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import { SearchResultCard } from "../../components/user/SearchResultCard";

function SearchResults() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSearchResults = async () => {
			if (!query) return;

			try {
				setIsLoading(true);
				setError(null);
				const encodedQuery = encodeURIComponent(query);
				const searchRes = await axios.get(`http://localhost:8000/api/search?query=${encodedQuery}`);
				setSearchResults(searchRes.data.products);
			} catch (err) {
				setError(err.message);
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSearchResults();
	}, [query]);

	return (
		<>
			<Navbar />

			<header
				className="w-full bg-cover bg-center flex flex-col items-center justify-center gap-6 mx-auto px-4 py-8"
				style={{
					backgroundImage: `linear-gradient(#242424A0, #242424A0), url('https://i.postimg.cc/W36Fc4D3/header.jpg')`,
					height: '400px',
				}}
			>
				<h1 className="text-3xl font-medium text-white text-center">Search Results for</h1>
				<h2 className="text-6xl font-bold text-white text-center">"{query}"</h2>
			</header>

			<div className="container mx-auto px-8 py-14 flex flex-col items-center justify-center gap-8">


				{isLoading ? (
					<div className="text-center">Loading...</div>
				) : error ? (
					<div className="text-red-500 text-center">{error}</div>
				) : searchResults.length === 0 ? (
					<div className="text-center">No products found for "{query}". Try a different query.</div>
				) : (
					<>
						<div className="w-full text-sm text-gray-500">
							Returned {searchResults.length} {searchResults.length === 1 ? ("result") : ("results")} for "{query}"
						</div>

						<div className="w-full flex flex-col items-center justify-center gap-8">
							{searchResults.map((product) => (
								<SearchResultCard key={product._id} product={product} />
							))}
						</div>
					</>
				)}
			</div>

			<Footer />
		</>
	);
}

export default SearchResults;