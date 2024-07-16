import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useCategoriesQuery } from "../redux/api/productAPI";
import { HiShoppingCart } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";

interface PropsType {
	user: User | null;
}

const Header = ({ user }: PropsType) => {
	const { data: categoriesResponse, isLoading: loadingCategories } =
		useCategoriesQuery("");

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
			<nav className="flex bg-[#f2e9e9] w-full justify-center gap-10 h-16 items-center">
				<Link to={"/"}>
					<div className="bg-white rounded-full p-3 text-2xl">
						<IoLogoGoogle />
					</div>
				</Link>
				<div className="flex gap-4">
					{!loadingCategories &&
						categoriesResponse?.categories.map((i) => (
							<button onClick={() => categoryHandler(i)} key={i}>
								{i.toUpperCase()}
							</button>
						))}
				</div>
				<Link
					className="flex items-center gap-16 bg-white rounded-md pr-2 pl-2 pt-2 pb-2"
					to={"/search"}
				>
					Search <FaSearch />
				</Link>
				<Link to={"/cart"}>
					<HiShoppingCart />
				</Link>
				{user?._id ? (
					<>
						<DropdownMenu>
							<DropdownMenuTrigger className="cursor-pointer">
								<img
									className="h-10 rounded-full"
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
										<Link
											to="/admin/dashboard"
										>
											Admin
										</Link>
									)}
								</DropdownMenuItem>
								<DropdownMenuItem>
									<button className="flex items-center gap-2 w-full" onClick={logoutHandler}>
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
			</nav>
		</div>
	);
};

export default Header;
