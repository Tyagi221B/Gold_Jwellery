import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
import { server } from "../redux/store";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};


const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card flex flex-col border border-gray-400 p-3 rounded-md">
      <img className="h-56 w-56" src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
        className="border border-black rounded-lg w-full flex items-center justify-between pl-4 pr-4"
          onClick={() =>
            handler({ productId, price, name, photo, stock, quantity: 1 })
          }
        >
          Add to Cart <FaPlus />
        </button>
      </div>
    </div>
  );
};


export default ProductCard;