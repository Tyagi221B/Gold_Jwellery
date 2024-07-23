import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { server } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useLatestProductsQuery } from "@/redux/api/productAPI";
import toast from "react-hot-toast";



export const SwipeToSlide = () => {
	const { data, isError } = useLatestProductsQuery("");
	if (isError) toast.error("Cannot Fetch the Products");
	const navigate = useNavigate();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}`}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }


	const settings = {
    dots: true,
		className: "center",
		infinite: true,
		centerPadding: "64px",
		slidesToShow: 4,
		swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
		
	};


	return (
		<div className="slider-container px-28">
			<Slider {...settings}>
					{data?.products.map((i) => (
						<div key={i._id} className="">
							<div
								onClick={()=> navigate(`/product/${i._id}`)}
								className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md gap-4 p-4 cursor-pointer"
							>
								<div className="relative flex h-60 overflow-hidden">
									<img
										className="absolute top-0 right-0 h-full w-full object-cover "
										src={`${server}/${i.photo}`}
										alt={i.name}
									/>
								</div>
								<div>
									<p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-xs mb-1">
										{i.name}
									</p>
									<span>₹ {i.price}</span>

									<div></div>
								</div>
							</div>{" "}
						</div>
					))}
			</Slider>
		</div>
	);
};

export default SwipeToSlide;
