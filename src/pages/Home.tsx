import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import ImageSlider from "../components/ImageSlider";
import LineDesign from "../assets/Line-Design.svg";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../@/components/ui/carousel";

const Home = () => {
	const { data, isError } = useLatestProductsQuery("");

	const dispatch = useDispatch();

	const addToCartHandler = (cartItem: CartItem) => {
		if (cartItem.stock < 1) return toast.error("Out of Stock");
		dispatch(addToCart(cartItem));
		toast.success("Added to cart");
	};

	if (isError) toast.error("Cannot Fetch the Products");
	const banner1 =
		"https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwca95c924/homepage/HeroBanner/glamdays-desktop.png";
	const banner2 =
		"https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw534d603c/homepage/HeroBanner/into-eternity-desktop.jpg";
	const banner3 =
		"https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw912fbd40/homepage/HeroBanner/modern-polki-desktop.jpg";
	const banner4 =
		"https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw717035de/homepage/HeroBanner/the-spotlight-edit-desktop.jpg";
	const banner5 =
		"https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw408b476e/homepage/HeroBanner/new-arrivals-desktop.jpg";

	const IMAGES = [
		{ url: banner1, alt: "Car One" },
		{ url: banner2, alt: "Car Two" },
		{ url: banner3, alt: "Car Three" },
		{ url: banner4, alt: "Car Four" },
		{ url: banner5, alt: "Car Five" },
	];

	return (
		<div className="home">
			<div className="w-full">
				<ImageSlider images={IMAGES} />
			</div>
			<h1 className="text-bold text-center mt-20 text-[#832729] tracking-wide text-4xl">
				New Arrivals
			</h1>
			<p className="text-center mt-2 font-light">
				This season's most loved, customer favorite designs - curated just for
				you!
			</p>
			<img src={LineDesign} className="svg-icon" alt="Line Design SVG" />{" "}
			{/* <main className="flex gap-6 justify-between items-center px-28 mb-28">
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
			</main> */}
			<main>
			<Carousel>
          <CarouselContent className="flex gap-6 justify-between items-center px-28 mb-28">
            {data?.products.map((item, index) => (
              index % 4 === 0 && (
                <CarouselItem key={item._id}>
                  <div className="grid grid-cols-4 gap-4">
                    {data.products.slice(index, index + 4).map((prod) => (
                      <ProductCard
                        key={prod._id}
                        productId={prod._id}
                        name={prod.name}
                        price={prod.price}
                        stock={prod.stock}
                        handler={addToCartHandler}
                        photo={prod.photo}
                      />
                    ))}
                  </div>
                </CarouselItem>
              )
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-32 top-1/3 transform -translate-y-1/2"/>
          <CarouselNext className="absolute right-32 top-1/3 transform -translate-y-1/2"/>
        </Carousel>
			</main>
			<div className="section-3 flex h-full p-8 gap-8 ">
				<div className="col-1 h-full w-2/4">
					<img
						className="h-full w-full"
						src="https://cdn.caratlane.com/media/static/images/V4/2024/Shaya/07-July/Responsive/02/Responsive-08.jpg"
						alt=""
					/>
				</div>
				<div className="col-2 h-full w-2/4 flex flex-col gap-8">
					<div>
						<img
							className=""
							src="https://cdn.caratlane.com/media/static/images/V4/2024/CL/06_JUNE/Banner/Flat15/2x.jpg"
							alt=""
						/>
					</div>
					<div className="">
						<img
							className=""
							src="https://cdn.caratlane.com/media/static/images/V4/2024/CL/06_JUNE/Banner/RTS/2x.jpg"
							alt=""
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-center items-center p-8 h-[550px] ">
				<div className="video-container h-full ">
					<video autoPlay loop muted className="video-player h-full w-full">
						<source
							src="https://www.w3schools.com/html/mov_bbb.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
				<div className="flex flex-col justify-center items-center gap-4 p-8 h-full bg-[#F1F1F1] rounded-lg">
					<h1 className="tracking-widest text-3xl">JUST ARRIVED</h1>
					<h1 className="tracking-wide text-6xl font-serif">Dancing Hoops</h1>
				</div>
			</div>
		</div>
	);
};

export default Home;
