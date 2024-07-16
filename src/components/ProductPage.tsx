import { useProductDetailsQuery } from "@/redux/api/productAPI";
import { RootState, server } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "./loader";
import { CartItem } from "@/types/types";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/reducer/cartReducer";

const ProductPage = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const params = useParams();
	const dispatch = useDispatch();

	const { data, isLoading } = useProductDetailsQuery(params.id!);

	const productId = data?.product._id || "";

	const { price, photo, name, stock, category, description } =
		data?.product || {
			photo: "",
			category: "",
			name: "",
			stock: 0,
			price: 0,
			description: "",
		};

	const addToCartHandler = (cartItem: CartItem) => {
		if (cartItem.stock < 1) return toast.error("Out of Stock");
		dispatch(addToCart(cartItem));
		toast.success("Added to cart");
	};

	return (
		<div>
			{isLoading ? (
				<Skeleton length={20} />
			) : (
				<div className="lg:h-[800px] w-full">
					<div className="flex flex-row justify-center items-center lg:h-[560px] gap-20 ">
						<div className="image-container h-[460px] rounded-lg flex flex-col">
							<div className="mb-12">
								{" "}
								Home | Product |<span className="text-[#832729]"> {name} </span>
							</div>
							<img
								className="w-full h-full object-cover"
								src={`${server}/${photo}`}
								alt={name}
							/>
						</div>

						<div className="prodcut_details h-[460px] flex flex-col w-[600px]">
							<p className="font-light mb-2">{productId}</p>
							<h1 className="text-2xl text-gray-800">{name}</h1>
							<div className="border-b border-[#832729] border-opacity-80 pb-4"></div>
							<span className="font-bold text-gray-700 text-2xl tracking-wider mt-4">
								{" "}
								₹ {price}{" "}
							</span>
							<span className="text-gray-600 mb-4 text-xs">Price Inclusive of all taxes. </span>
							<p className="">
								<span className="font-semibold text-gray-700">
									Availability:{" "}
								</span>
								<span
									className={`text-white px-2 py-1 rounded-lg ${
										stock > 0 ? "bg-green-500" : "bg-red-500"
									}`}
								>
									{stock > 0 ? "In Stock" : "Out of Stock"}
								</span>
							</p>
							<p className="text-gray-700 text-xs mb-4">
								Only {stock} left
							</p>
							<p className="text-gray-700 mb-4">
								Category: <span className="uppercase">{category}
									</span>
							</p>
							<p className="text-gray-700 mb-8">{description}</p>
							{user && (
								<button
									className="w-full bg-[#832729] dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
									onClick={() =>
										addToCartHandler({
											productId,
											price,
											name,
											photo,
											stock,
											quantity: 1,
										})
									}
								>
									Add to Cart
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
