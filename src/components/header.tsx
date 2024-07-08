import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useCategoriesQuery } from "../redux/api/productAPI";
import { HiShoppingCart } from "react-icons/hi";
import { IoLogoGoogle } from "react-icons/io";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");


  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center">
    <nav className="flex bg-[#F2E9E9] w-full justify-center gap-10 h-16 items-center">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
      <div className="bg-white rounded-full p-3 text-2xl" ><IoLogoGoogle/></div>
      </Link>
    <div className="flex gap-4">
      {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
      </div>
      <Link className="flex items-center gap-16 bg-white rounded-md pr-2 pl-2 pt-2 pb-2" onClick={() => setIsOpen(false)} to={"/search"}>
        Search <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <HiShoppingCart />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
    <div className="nav2">
      
    </div>

    </div>

  );
};

export default Header;
