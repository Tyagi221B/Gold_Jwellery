import { CategoryType } from "../types/types";
import ImageSlider from "../components/ImageSlider";
import LineDesign from "../assets/Line-Design.svg";
import CategoryCard from "@/components/CategoryCard";
import { useAllCategoryQuery } from "@/redux/api/categoryAPI";
import SwipeToSlide from "@/components/Slider";

const Home = () => {
	const { data: categoryResponse } = useAllCategoryQuery("");

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
			<div className="Banner_Slider w-full">
				<ImageSlider images={IMAGES} />
			</div>

			<div className="New_Arrival">
				<h1 className="text-bold text-center mt-20 text-[#832729] tracking-wide text-4xl">
					New Arrivals
				</h1>
				<p className="text-center mt-2 font-light">
					This season's most loved, customer favorite designs - curated just for
					you!
				</p>
				<img src={LineDesign} className="svg-icon" alt="Line Design SVG" />
				<main>
					<SwipeToSlide/>
				</main>
			</div>

			<div className="shop_by_category mt-52">
				<h1 className="text-bold text-center text-[#832729] tracking-wide text-4xl">
					Shop By Category
				</h1>
				<p className="text-center mt-2 font-light">
					Browse through your favorite categories. We've got them all!
				</p>
				<img src={LineDesign} className="svg-icon" alt="Line Design SVG" />

				<div className="flex gap-6 justify-between items-center px-28 mb-28">
					
					{categoryResponse?.categories.map((i: CategoryType) => (
						<div key={i._id} className="">
						<CategoryCard name={i.name} photo={i.photo} />
						</div>
					))}
				</div>
			</div>

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
