import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useCategoriesQuery } from "../redux/api/productAPI";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PropsType {
	user: User | null;
}

const Header = ({ user }: PropsType) => {
	const { data: categoriesResponse, isLoading: loadingCategories } =
		useCategoriesQuery("");

	const { cartItems } = useSelector((state: RootState) => state.cartReducer);

	const logoutHandler = async () => {
		try {
			await signOut(auth);
			toast.success("Sign Out Successfully");
		} catch (error) {
			toast.error("Sign Out Fail");
		}
	};
	const navigate = useNavigate();

	const categoryHandler = async (category: string) => {
		navigate(`/search?category=${category}`);
	};

	const userImg =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

	return (
		<div className="w-full flex flex-wrap justify-center">
			<nav className="flex bg-[#f0eee4] w-full justify-between gap-10 h-16 items-center px-10">
				<Link to={"/"}>
					<div className="bg-white rounded-full text-2xl ">
						<img
							className=" w-24"
							src="https://res.cloudinary.com/tubenest/image/upload/v1721716205/WhatsApp_Image_2024-07-16_at_16.17.06_lg6ess.jpg"
							alt=""
						/>
					</div>
				</Link>
				<div className="flex gap-4 ">
					{!loadingCategories &&
						categoriesResponse?.categories.map((i) => (
							<button
								className="transition-all duration-500 hover:scale-110 hover:text-[#832729]"
								onClick={() => categoryHandler(i)}
								key={i}
							>
								<p className="text m-6 group relative w-max">
									<span className="">{i.toUpperCase()}</span>
									<span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-[#832729] group-hover:w-3/6"></span>
									<span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-[#832729] group-hover:w-3/6"></span>
								</p>
							</button>
						))}
				</div>
				<div className=" flex flex-row items-center justify-center gap-8">
					<Link
						className="flex items-center gap-16 bg-white rounded-md pr-2 pl-2 pt-2 pb-2"
						to={"/search"}
					>
						Search <FaSearch />
					</Link>
					<Link
						className="hover:scale-110 transition-all duration-300 flex items-center"
						to={"/cart"}
					>
						<div className="relative">
						<div className="-top-3 absolute left-3">
							<p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#85540f] p-3 text-xs text-white">
								{cartItems.length}
							</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="file: h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</div>
					</Link>
					
					{user?._id ? (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger className="cursor-pointer">
									<img
										className="h-10 rounded-full hover:scale-110 transition-all duration-300"
										src={user?.photo || userImg}
										alt="User"
									/>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										<Link to={"/orders"}>My Orders</Link>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
									{/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
									<DropdownMenuItem>
										{" "}
										{user.role === "admin" && (
											<Link to="/admin/dashboard">Admin</Link>
										)}
									</DropdownMenuItem>
									<DropdownMenuItem>
										<button
											className="flex items-center gap-2 w-full"
											onClick={logoutHandler}
										>
											Logout <FaSignOutAlt />
										</button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<Link to={"/login"}>
							<button className="flex items-center gap-2 w-full hover:underline hover:scale-110">
								Login <FaSignInAlt />
							</button>
						</Link>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Header;
