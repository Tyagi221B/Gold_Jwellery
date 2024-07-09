import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem as cartItemType} from "../types/types";

type CartItemProps = {
  cartItem: cartItemType;
  incrementHandler: (cartItem: cartItemType) => void;
  decrementHandler: (cartItem: cartItemType) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item p-4 flex flex-row justify-start items-center gap-12">
      <img className="h-40 w-40 object-contain" src={`${server}/${photo}`} alt={name} />
      <article className="flex flex-col justify-center items-start gap-1">
        <Link className="text-xl text-[#2e2e2e] hover:text-[#006888]" to={`/product/${productId}`}>{name}</Link>
        <span className="font-extrabold">₹{price}</span>
      </article>

      <div className="ml-auto flex flex-row justify-center items-center gap-4">
        <button className="border-none h-8 w-8 rounded-md flex flex-row justify-center items-center gap4
        cursor-pointer text-xl hover:bg-[#2e2e2e] hover:text-[#006888]" onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button className="border-none h-8 w-8 rounded-md flex flex-row justify-center items-center gap4
        cursor-pointer text-xl hover:bg-[#2e2e2e] hover:text-[#006888]" onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button className="border-none bg-transparent flex flex-row justify-center items-center gap-4 cursor-pointer text-xl hover:text-red-600" onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
