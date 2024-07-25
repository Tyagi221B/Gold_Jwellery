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

const Cart = () => {
	const { cartItems, subtotal, tax, total, shippingCharges, discount } =
		useSelector((state: RootState) => state.cartReducer);
	const dispatch = useDispatch();

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
			const processedCartItems = JSON.parse(cartItemsFromLocalStorage).flat(Infinity);
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
		<div className="cart py-8 px-16 flex flex-row gap-16 h-screen">
			<main className="w-9/12 overflow-y-auto scroll-smooth">
				{cartItems.length > 0 ? (
					cartItems.map((i, idx) => (
						<CartItemCard
							incrementHandler={incrementHandler}
							decrementHandler={decrementHandler}
							removeHandler={removeHandler}
							key={idx}
							cartItem={i}
						/>
					))
				) : (
					<div className="flex items-center justify-center h-full">
					<div className="text-center flex flex-col items-center">
						<img className="h-24 w-24 mb-8" src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw39d0b5f4/images/cart/Group14779.svg" alt="" />
						<h1 className="text-4xl font-bold text-[#832729]">Your Cart is Empty</h1>
						<p className="mt-4 text-lg text-[#832729]">It looks like you haven't added anything to your cart yet.</p>
						<button className="mt-6 px-4 py-2 bg-[#832729] text-white rounded hover:bg-[#a53335] hover:shadow-2xl hover:shadow-[#832729]">
							<Link to={"/"}>Continue Shopping</Link>
						</button>
					</div>
				</div>
				)}
			</main>
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
						className={`${!user && "bg-gray-300"} bg-[#2e2e2e] p-4 no-underline text-white flex flex-row justify-center items-center gap-4 uppercase tracking-wider rounded-md hover:opacity-80`}
						to={`${!user ? '/login' : '/shipping'}`}
					>
						Checkout
					</Link>
				)}
			</aside>
		</div>
	);
};

export default Cart;
