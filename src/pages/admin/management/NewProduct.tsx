import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [price, setPrice] = useState<number>(1000);
	const [stock, setStock] = useState<number>(1);
	const [photoPrev, setPhotoPrev] = useState<string>("");
	const [photo, setPhoto] = useState<File>();
	const [description, setDescription] = useState<string>("");

	const [newProduct] = useNewProductMutation();
	const navigate = useNavigate();

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

		if (!name || !price || stock < 0 || !category || !photo || !description) return;

		const formData = new FormData();

		formData.set("name", name);
		formData.set("price", price.toString());
		formData.set("stock", stock.toString());
		formData.set("photo", photo);
		formData.set("category", category);
		formData.set("description", description);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
		console.log(formData.get("description"));


		const res = await newProduct({ id: user?._id, formData });
		

		responseToast(res, navigate, "/admin/product");
	};

	return (
		<div className="admin-container flex bg-[#f7f7f7] h-screen">
			<div className="w-1/6">
				<AdminSidebar />
			</div>
			<main className="product-management flex flex-row justify-center p-16  w-5/6">
				<article className="h-full p-8 w-full max-w-[400px] bg-white rounded-md shadow-sm shadow-black">
					<form  
					className="flex flex-col items-center gap-8"
					onSubmit={submitHandler}>
						<h2 className="uppercase tracking-wider">New Product</h2>
						<div className="w-full relative">
							<label>Name</label>
							<input className="w-full p-4 border border-black rounded-md"
								required
								type="text"
								placeholder="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="w-full relative">
							<label>Price</label>
							<input className="w-full p-4 border border-black rounded-md"
								required
								type="number"
								placeholder="Price"
								value={price}
								onChange={(e) => setPrice(Number(e.target.value))}
							/>
						</div>
						<div className="w-full relative">
							<label className="absolute left-0 -top-6">Stock</label>
							<input className="w-full p-4 border border-black rounded-md"
								required
								type="number"
								placeholder="Stock"
								value={stock}
								onChange={(e) => setStock(Number(e.target.value))}
							/>
						</div>

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
							<label className="absolute left-0 -top-6">Description</label>
							<input className="w-full p-4 border border-black rounded-md"
								required
								type="text"
								placeholder="Add about this product"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
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
		</div>
	);
};

export default NewProduct;
