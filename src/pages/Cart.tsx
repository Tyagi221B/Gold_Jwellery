import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import {
	addToCart,
	calculatePrice,
	discountApplied,
	removeCartItem,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
	const { cartItems, subtotal, tax, total, shippingCharges, discount } =
		useSelector((state: RootState) => state.cartReducer);
	const dispatch = useDispatch();
	console.log(cartItems);

	const { user } = useSelector((state: RootState) => state.userReducer);

	const [couponCode, setCouponCode] = useState<string>("");
	const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

	const incrementHandler = (cartItem: CartItem) => {
		if (cartItem.quantity >= cartItem.stock) return;

		dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
	};
	const decrementHandler = (cartItem: CartItem) => {
		if (cartItem.quantity <= 1) return;

		dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
	};
	const removeHandler = (productId: string) => {
		dispatch(removeCartItem(productId));
	};

	useEffect(() => {
		const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
		if (cartItemsFromLocalStorage) {
			const processedCartItems = JSON.parse(cartItemsFromLocalStorage).flat(
				Infinity
			);
			processedCartItems.forEach((item: CartItem) => dispatch(addToCart(item)));
			console.log(processedCartItems);
		}
	}, []);

	useEffect(() => {
		const { token: cancelToken, cancel } = axios.CancelToken.source();

		const timeOutID = setTimeout(() => {
			axios
				.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
					cancelToken,
				})
				.then((res) => {
					dispatch(discountApplied(res.data.discount));
					setIsValidCouponCode(true);
					dispatch(calculatePrice());
				})
				.catch(() => {
					dispatch(discountApplied(0));
					setIsValidCouponCode(false);
					dispatch(calculatePrice());
				});
		}, 1000);

		return () => {
			clearTimeout(timeOutID);
			cancel();
			setIsValidCouponCode(false);
		};
	}, [couponCode]);

	useEffect(() => {
		dispatch(calculatePrice());
	}, [cartItems]);

	return (
		<div className="cart py-8 px-16 flex flex-row gap-16 h-full">
			<section className=" relative z-10">
				<div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
					<div className="grid ">
						<div className="xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
							<div className="flex items-center justify-between pb-8 border-b border-gray-300">
								<h2 className="font-manrope font-bold text-3xl leading-10 text-black">
									Shopping Cart
								</h2>
								<h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
									3 Items
								</h2>
							</div>
							<div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
								<div className="col-span-12 md:col-span-7">
									<p className="font-normal text-lg leading-8 text-gray-400">
										Product Details
									</p>
								</div>
								<div className="col-span-12 md:col-span-5">
									<div className="grid grid-cols-5">
										<div className="col-span-3">
											<p className="font-normal text-lg leading-8 text-gray-400 text-center">
												Quantity
											</p>
										</div>
										<div className="col-span-2">
											<p className="font-normal text-lg leading-8 text-gray-400 text-center">
												Total
											</p>
										</div>
									</div>
								</div>
							</div>
							{cartItems.length > 0 ? (
								cartItems.map((i, idx) => (
									<div
										key={idx}
										className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group relative"
									>
										<div className="w-full md:max-w-[126px]">
											<img
												src={`${server}/${i.photo}`}
												alt={i.name}
												className="mx-auto rounded-xl"
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-4 w-full">
											<div className="md:col-span-2">
												<div className="flex flex-col max-[500px]:items-center gap-3">
													<h6 className="font-semibold text-base leading-7 text-black">
														{i.name}
													</h6>
													{/* <h6 className="font-normal text-base leading-7 text-gray-500">
												{Category}
											</h6> */}
													<h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-green-600">
														₹ {i.price}
													</h6>
												</div>
											</div>
											<div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
												<div className="flex items-center h-full">
													<button
														onClick={() => decrementHandler(i)}
														className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
													>
														<svg
															className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
															xmlns="http://www.w3.org/2000/svg"
															width="22"
															height="22"
															viewBox="0 0 22 22"
															fill="none"
														>
															<path
																d="M16.5 11H5.5"
																stroke=""
																stroke-width="1.6"
																stroke-linecap="round"
															/>
															<path
																d="M16.5 11H5.5"
																stroke=""
																stroke-opacity="0.2"
																stroke-width="1.6"
																stroke-linecap="round"
															/>
															<path
																d="M16.5 11H5.5"
																stroke=""
																stroke-opacity="0.2"
																stroke-width="1.6"
																stroke-linecap="round"
															/>
														</svg>
													</button>
													<p className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent">
														{i.quantity}
													</p>
													<button
														onClick={() => incrementHandler(i)}
														className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
													>
														<svg
															className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
															xmlns="http://www.w3.org/2000/svg"
															width="22"
															height="22"
															viewBox="0 0 22 22"
															fill="none"
														>
															<path
																d="M11 5.5V16.5M16.5 11H5.5"
																stroke=""
																stroke-width="1.6"
																stroke-linecap="round"
															/>
															<path
																d="M11 5.5V16.5M16.5 11H5.5"
																stroke=""
																stroke-opacity="0.2"
																stroke-width="1.6"
																stroke-linecap="round"
															/>
															<path
																d="M11 5.5V16.5M16.5 11H5.5"
																stroke=""
																stroke-opacity="0.2"
																stroke-width="1.6"
																stroke-linecap="round"
															/>
														</svg>
													</button>
												</div>
											</div>
											<div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
												<p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-green-700">
													$120.00
												</p>
											</div>
										</div>
										<div className="absolute right-0 top-4 hover:text-red-600">
											<button
												onClick={() => removeHandler(i.productId)}
												className="font-normal text-lg leading-8 text-center text-gray-500 hover:text-red-600"
											>
												<FaTrash />
											</button>
										</div>
									</div>
								))
							) : (
								<div className="flex items-center justify-center h-full">
									<div className="text-center flex flex-col items-center">
										<img
											className="h-24 w-24 mb-8"
											src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw39d0b5f4/images/cart/Group14779.svg"
											alt=""
										/>
										<h1 className="text-4xl font-bold text-[#832729]">
											Your Cart is Empty
										</h1>
										<p className="mt-4 text-lg text-[#832729]">
											It looks like you haven't added anything to your cart yet.
										</p>
										<button className="mt-6 px-4 py-2 bg-[#832729] text-white rounded hover:bg-[#a53335] hover:shadow-2xl hover:shadow-[#832729]">
											<Link to={"/"}>Continue Shopping</Link>
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<aside className="w-4/12 p-16 flex flex-col justify-center items-stretch gap-6">
				<p className="text-xl">Subtotal: ₹{subtotal}</p>
				<p className="text-xl">Shipping Charges: ₹{shippingCharges}</p>
				<p className="text-xl">Tax: ₹{tax}</p>
				<p className="text-xl">
					Discount: <em className="red"> - ₹{discount}</em>
				</p>
				<p className="text-xl">
					<b>Total: ₹{total}</b>
				</p>

				<input
					className="p-4 border border-black outline-none rounded-md mt-8"
					type="text"
					placeholder="Coupon Code"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
				/>

				{couponCode &&
					(isValidCouponCode ? (
						<span className="green -mt-4 flex flex-row justify-center items-center gap-1">
							₹{discount} off using the{" "}
							<code className="font-extrabold self-end">{couponCode}</code>
						</span>
					) : (
						<span className="red -mt-4 flex flex-row justify-center items-center gap-1">
							Invalid Coupon <VscError />
						</span>
					))}

				{cartItems.length > 0 && (
					<Link
						className={`${
							!user && "bg-gray-300"
						} bg-[#2e2e2e] p-4 no-underline text-white flex flex-row justify-center items-center gap-4 uppercase tracking-wider rounded-md hover:opacity-80`}
						to={`${!user ? "/login" : "/shipping"}`}
					>
						Checkout
					</Link>
				)}
			</aside>
		</div>
	);
};

export default Cart;
