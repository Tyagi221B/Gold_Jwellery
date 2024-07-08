import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home">
      <section>
        <img src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwca95c924/homepage/HeroBanner/glamdays-desktop.png" alt="" />
      </section>

      <h1 className="text-bold text-3xl text-center mt-8">
        Latest Products
      </h1>
      <h2 className="text-end underline mr-8">
        <Link to="/search" className="findmore">
          More
        </Link>

      </h2>

      <main className="flex gap-8 justify-center items-center mt-4">
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
      <div className="section-3 flex h-full p-8 gap-8">
        <div className="col-1 h-full w-2/4">
          <img className="h-full w-full" src="https://cdn.caratlane.com/media/static/images/V4/2024/Shaya/07-July/Responsive/02/Responsive-08.jpg" alt="" />
        </div>
        <div className="col-2 h-full w-2/4 flex flex-col gap-8">
          <div>
            <img className="" src="https://cdn.caratlane.com/media/static/images/V4/2024/CL/06_JUNE/Banner/Flat15/2x.jpg" alt="" /></div>
          <div className="">
            <img className="" src="https://cdn.caratlane.com/media/static/images/V4/2024/CL/06_JUNE/Banner/RTS/2x.jpg" alt="" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
