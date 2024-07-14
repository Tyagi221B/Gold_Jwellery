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
			className="product-card cursor-pointer flex flex-col border border-[#e1e1e1] p-2 max-w-68 gap-4"
		>
			<img
				className="object-cover h-64 min-w-68 max-w-68"
				src={`${server}/${photo}`}
				alt={name}
			/>
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
