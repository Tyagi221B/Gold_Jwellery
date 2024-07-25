import { server } from "../redux/store";
import { useNavigate } from "react-router-dom";

type CategoryProps = {
	name: string;
  photo: string;
};

const CategoryCard = ({name, photo }: CategoryProps) => {
	const navigate = useNavigate();

	const navigateToCategoryPage = async () => {
		navigate(`/search?category=${name}`);
	};

	return (
		<div
			onClick={navigateToCategoryPage}
			className="product-card cursor-pointer flex flex-col border border-[#e1e1e1] p-2 max-w-68 gap-4"
		>
			<img
				className="object-cover h-64 min-w-68 max-w-68"
				src={`${server}/${photo}`}
				alt={name}
			/>
			<div>
				<p className="whitespace-nowrap uppercase overflow-hidden overflow-ellipsis mb-1 text-center text-[#832729]">
					{name}
				</p>

				<button className="flex flex-row justify-center items-center mx-auto font-light hover:gap-8 transition duration-1000 ease-in-out">Explore 
				<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
				</button>
			</div>
		</div>
	);
};

export default CategoryCard;
