import { useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import {
	useCategoriesQuery,
	useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Search = () => {
	const {
		data: categoriesResponse,
		isLoading: loadingCategories,
		isError,
		error,
	} = useCategoriesQuery("");
	const [searchParams] = useSearchParams();

	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const [maxPrice, setMaxPrice] = useState(1000000);
	const [category, setCategory] = useState(searchParams.get("category") || "");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const categoryFromURL = searchParams.get("category");
		if (categoryFromURL) {
			setCategory(categoryFromURL);
		}
	}, [searchParams]);

	const {
		isLoading: productLoading,
		data: searchedData,
		isError: productIsError,
		error: productError,
	} = useSearchProductsQuery({
		search,
		sort,
		category,
		page,
		price: maxPrice,
	});

	const dispatch = useDispatch();

	const addToCartHandler = (cartItem: CartItem) => {
		if (cartItem.stock < 1) return toast.error("Out of Stock");
		dispatch(addToCart(cartItem));
		toast.success("Added to cart");
	};

	const isPrevPage = page > 1;
	const isNextPage = page < 4;

	if (isError) {
		const err = error as CustomError;
		toast.error(err.data.message);
	}
	if (productIsError) {
		const err = productError as CustomError;
		toast.error(err.data.message);
	}
	return (
		<div className="product-search-page p-8 flex flex-row justify-start items-stretch gap-8 min-h-96">
			<aside className="min-w-80 border-l border-[#d17677] shad p-8 flex flex-col justify-start items-stretch gap-2 rounded-3xl">
					<h2 className="tracking-wider font-semibold uppercase text-[#832729]">
						Filters
					</h2>
				<div className="border-b border-[#433737] border-opacity-80 pb-4 ">
				</div>
				<div>
					<h4 className="tracking-wider text-xl font-bold text-[#832729] mb-4 mt-4">Sort</h4>
					<select
						className="w-full p-4 bg-white border border-[#832729] rounded-lg m-2 outline-none cursor-pointer hover:bg-red-50"
						value={sort}
						onChange={(e) => setSort(e.target.value)}
					>
						<option value="">None</option>
						<option value="asc">Price (Low to High)</option>
						<option value="dsc">Price (High to Low)</option>
					</select>
        </div>
        <div className="border-b border-[#433737] border-opacity-80 pb-4">
				</div>
				<div> 
          <div className="flex justify-between items-center">
					<h4 className="tracking-wider text-xl font-bold text-[#832729] mt-4">Max Price: </h4>  <h2 className="tracking-wider text-xl"> 
          ₹ {maxPrice || ""}
            </h2>
          </div>
					<input
						className="w-full p-4 bg-white border border-slate-800 rounded-lg m-2"
						type="range"
						min={100}
						max={100000}
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}
					/>
				</div>

        <div className="border-b border-[#433737] border-opacity-80 pb-4">
				</div>

				<div>
					<h4 className="tracking-wider text-xl font-bold text-[#832729] mb-4 mt-4">Category</h4>
					<select
          className="border-[#832729] w-full p-4 bg-white border rounded-lg m-2 outline-none cursor-pointer hover:bg-red-50"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option className="" value="">ALL</option>
						{!loadingCategories &&
							categoriesResponse?.categories.map((i) => (
								<option key={i} value={i}>
									{i.toUpperCase()}
								</option>
							))}
					</select>
				</div>
        <div className="border-b border-[#433737] border-opacity-80 pb-4">
				</div>
			</aside>

			{/* Products section  */}
			<main className="w-full py-8 px h-full ">
				<h1 className="tracking-wider font-bold uppercase text-[#832729] text-xl">Products</h1>
				{category && category ? (
					<div className="uppercase bg-red-50 rounded-full w-fit px-4 py-2 mb-6 mt-4 flex flex-row items-center justify-between gap-4">
						{category}
            <button onClick={()=> setCategory("")}>
            <RxCross2 />
            </button>

					</div>
				) : (
					<input
						className="w-1/2 p-4 rounded-lg m-4 block border-b border-[#832729] outline-none"
						type="text"
						placeholder="Search by name..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				)}

				{productLoading ? (
					<Skeleton length={10} />
				) : (
					<div className="search-product-list flex flex-row justify-start items-start flex-wrap h-full overflow-y-auto gap-6">
						{searchedData?.products.map((i) => (
							<ProductCard
								key={i._id}
								productId={i._id}
								name={i.name}
								price={i.price}
								stock={i.stock}
								handler={addToCartHandler}
								photo={i.photo}
							/>
						))}
					</div>
				)}

				{searchedData && searchedData.totalPage > 1 && (
					<article className="flex flex-row justify-center items-center gap-4 ">
						<button
							className="flex flex-row justify-center items-center gap-4 cursor-pointer pt-2 pr-4 bg-[#006888] text-white rounded-xl text-center disabled:cursor-not-allowed disabled:opacity-50 disabled:text-[#2E2E2E]"
							disabled={!isPrevPage}
							onClick={() => setPage((prev) => prev - 1)}
						>
							Prev
						</button>
						<span>
							{page} of {searchedData.totalPage}
						</span>
						<button
							disabled={!isNextPage}
							onClick={() => setPage((prev) => prev + 1)}
						>
							Next
						</button>
					</article>
				)}
			</main>
		</div>
	);
};

export default Search;
