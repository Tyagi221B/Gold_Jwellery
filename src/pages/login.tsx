import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
	const dispatch = useDispatch();
	const [gender, setGender] = useState("");
	const [date, setDate] = useState("");

	const [login] = useLoginMutation();

	const loginHandler = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const { user } = await signInWithPopup(auth, provider);

			console.log({
				name: user.displayName!,
				email: user.email!,
				photo: user.photoURL!,
				gender,
				role: "user",
				dob: date,
				_id: user.uid,
			});

			const res = await login({
				name: user.displayName!,
				email: user.email!,
				photo: user.photoURL!,
				gender,
				role: "user",
				dob: date,
				_id: user.uid,
			});

			if ("data" in res) {
				toast.success(res.data?.message || "An unexpected error occurred"); // TODO: changes
				const data = await getUser(user.uid);
				dispatch(userExist(data?.user)); //TODO:changes
			} else {
				const error = res.error as FetchBaseQueryError;
				const message = (error.data as MessageResponse).message;
				toast.error(message);
				dispatch(userNotExist());
			}
		} catch (error) {
			toast.error("Sign In Fail");
		}
	};

	return (
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form className="space-y-4 md:space-y-6" action="#">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Gender
									</label>
									<select
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
								</div>
								<div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of birth</label>
					<input
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
								</div>
								<div className="flex items-center justify-between">
									{/* <div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label className="text-gray-500 dark:text-gray-300">
												Remember me
											</label>
										</div>
									</div> */}
									<a
										href="#"
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Forgot password?
									</a>
								</div>
                <p className="text-center m-8">Already Signed In Once</p>
					<button
						className="w-[70%] m-auto h-12 cursor-pointer border-none outline-none bg-[#3e7df2] text-white flex flex-row items-center justify-center gap-8 border-[#3e7df2] rounded-md  "
						onClick={loginHandler}
					>
						<FcGoogle className="bg-white w-[30%] h-full" />
						<span className="w-full text-center">Sign in with Google</span>
					</button>
							</form>
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
						</div>
					</div>
				</div>
			</section>
	);
};

export default Login;
