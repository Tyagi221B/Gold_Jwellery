import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, server } from "../../../redux/store";
import { useAllCategoryQuery, useNewCategoryMutation } from "@/redux/api/categoryAPI";
import { CategoryType } from "@/types/types";

export const NewCategory = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);
	const {data: useAllCategoryQueryResponse} = useAllCategoryQuery("")

	const [category, setCategory] = useState<string>("");
	const [photoPrev, setPhotoPrev] = useState<string>("");
	const [photo, setPhoto] = useState<File>();
	const [newProduct] = useNewCategoryMutation();

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		const reader: FileReader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					setPhotoPrev(reader.result);
					setPhoto(file);
				}
			};
		}
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!category || !photo) return;

		const formData = new FormData();
		formData.append("name", category);
		formData.append("photo", photo);


		const res = await newProduct({ id: user?._id || "", formData });
    console.log(res)
		

	};

	return (
		<div className="admin-container flex bg-[#f7f7f7] h-screen flex-row">
			<main className="product-management flex flex-row justify-center p-16  w-5/6">
				<article className="h-full p-8 w-full max-w-[400px] bg-white rounded-md shadow-sm shadow-black">
					<form  
					className="flex flex-col items-center gap-8"
					onSubmit={submitHandler}>
						<h2 className="uppercase tracking-wider">New Category</h2>
		

						<div className="w-full relative">
							<label className="absolute left-0 -top-6">Category</label>
							<input className="w-full p-4 border border-black rounded-md"
								required
								type="text"
								placeholder="Chain, Earing, Necklace, Bracelette"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							/>
						</div>
			

						<div className="w-full relative">
							<label className="absolute left-0 -top-6">Photo</label>
							<input className="w-full p-4 border border-black rounded-md" required type="file" onChange={changeImageHandler} />
						</div>

						{photoPrev && <img className="h-20 w-20 object-cover rounded-md" src={photoPrev} alt="New Image" />}
						<button className="p-4 bg-blue-500 text-white rounded-md text-xl cursor-pointer" type="submit">Create</button>
					</form>
				</article>
			</main>

			<div className="">
				{useAllCategoryQueryResponse?.categories.map((i: CategoryType) => (
					<div key={i._id}>
            <p>{i.name}</p>
						<img
						className="h-20 w-20"
						src={`${server}/${i.photo}`}
						alt="" />
						</div>
				))}
			</div>
		</div>
	);
};


