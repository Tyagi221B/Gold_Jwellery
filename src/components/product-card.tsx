import { CartItem } from "../types/types";
import { server } from "../redux/store";
import { useNavigate } from "react-router-dom";

type ProductsProps = {
	productId: string;
	photo: string;
	name: string;
	price: number;
	stock: number;
	handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({ productId, price, name, photo }: ProductsProps) => {
	const navigate = useNavigate();

	const navigateToProductPage = () => {
		navigate(`/product/${productId}`);
	};
	return (
		<div
			onClick={navigateToProductPage}
			className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md gap-4 p-4 cursor-pointer"
		>
			<div className="relative flex h-60 overflow-hidden">

			<img
				className="absolute top-0 right-0 h-full w-full object-cover "
				src={`${server}/${photo}`}
				alt={name}
			/>
			</div>
			<div>
				<p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs mb-1">
					{name}
				</p>
				<span>₹ {price}</span>

				<div></div>
			</div>
		</div>
	);
};

export default ProductCard;
