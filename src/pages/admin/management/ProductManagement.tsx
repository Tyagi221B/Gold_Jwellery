import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
	useDeleteProductMutation,
	useProductDetailsQuery,
	useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const params = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

	const { price, photo, name, stock, category, description } =
		data?.product || {
			photo: "",
			category: "",
			name: "",
			stock: 0,
			price: 0,
			description: "",
		};

	const [priceUpdate, setPriceUpdate] = useState<number>(price);
	const [stockUpdate, setStockUpdate] = useState<number>(stock);
	const [nameUpdate, setNameUpdate] = useState<string>(name);
	const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
	const [descriptionUpdate, setdescriptionUpdate] =
		useState<string>(description);
	const [photoUpdate, setPhotoUpdate] = useState<string>("");
	const [photoFile, setPhotoFile] = useState<File>();

	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();

	const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = e.target.files?.[0];

		const reader: FileReader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					setPhotoUpdate(reader.result);
					setPhotoFile(file);
				}
			};
		}
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();

		if (nameUpdate) formData.set("name", nameUpdate);
		if (priceUpdate) formData.set("price", priceUpdate.toString());
		if (stockUpdate !== undefined)
			formData.set("stock", stockUpdate.toString());
		if (photoFile) formData.set("photo", photoFile);
		if (categoryUpdate) formData.set("category", categoryUpdate);
		if (descriptionUpdate) formData.set("description", descriptionUpdate);

		const res = await updateProduct({
			formData,
			userId: user?._id!,
			productId: data?.product._id!,
		});

		responseToast(res, navigate, "/admin/product");
	};

	const deleteHandler = async () => {
		const res = await deleteProduct({
			userId: user?._id!,
			productId: data?.product._id!,
		});

		responseToast(res, navigate, "/admin/product");
	};

	useEffect(() => {
		if (data) {
			setNameUpdate(data.product.name);
			setPriceUpdate(data.product.price);
			setStockUpdate(data.product.stock);
			setCategoryUpdate(data.product.category);
			setdescriptionUpdate(data.product.description);
		}
	}, [data]);

	if (isError) return <Navigate to={"/404"} />;

	return (
		<div className="admin-container flex bg-[#f7f7f7] h-screen">
			<div className="w-1/6">
				<AdminSidebar />
			</div>{" "}
			<main className="product-management flex flex-row justify-center items-center p-16  w-5/6 gap-8">
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<section className="overflow-y-auto w-full h-full max-w-[500px] shadow-sm shadow-black bg-white p-20 flex flex-col gap-4 relative rounded-md ">
							<strong className="font-bold">ID - {data?.product._id}</strong>
							<img
								className="h-full w-full object-cover"
								src={`${server}/${photo}`}
								alt="Product"
							/>
							<p className="text-center tracking-wider uppercase">{name}</p>
							{stock > 0 ? (
								<span className="green absolute ring-8 top-8">
									{stock} Available
								</span>
							) : (
								<span className="red absolute ring-8 top-8">
									{" "}
									Not Available
								</span>
							)}
							<h3 className="text-center text-2xl">₹{price}</h3>
						</section>
						<article className="h-full p-8 w-full max-w-[400px] bg-white rounded-md shadow-sm shadow-black">
							<button className="product-delete-btn" onClick={deleteHandler}>
								<FaTrash />
							</button>
							<form
								className="flex flex-col items-center gap-8"
								onSubmit={submitHandler}
							>
								<h2 className="uppercase tracking-wider">Manage</h2>
								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Name</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="text"
										placeholder="Name"
										value={nameUpdate}
										onChange={(e) => setNameUpdate(e.target.value)}
									/>
								</div>
								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Price</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="number"
										placeholder="Price"
										value={priceUpdate}
										onChange={(e) => setPriceUpdate(Number(e.target.value))}
									/>
								</div>
								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Stock</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="number"
										placeholder="Stock"
										value={stockUpdate}
										onChange={(e) => setStockUpdate(Number(e.target.value))}
									/>
								</div>

								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Category</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="text"
										placeholder="Chain, Earing, Necklace, Bracelette"
										value={categoryUpdate}
										onChange={(e) => setCategoryUpdate(e.target.value)}
									/>
								</div>

								{/* Description of product. */}
								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Description</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="text"
										placeholder="Add about this product"
										value={descriptionUpdate}
										onChange={(e) => setdescriptionUpdate(e.target.value)}
									/>
								</div>

								<div className="w-full relative">
									<label className="absolute left-0 -top-6">Photo</label>
									<input
										className="w-full p-4 border border-black rounded-md"
										type="file"
										onChange={changeImageHandler}
									/>
								</div>

								{photoUpdate && (
									<img
										className="h-20 w-20 object-cover rounded-md"
										src={photoUpdate}
										alt="New Image"
									/>
								)}
								<button
									className="p-4 bg-blue-500 text-white rounded-md text-xl cursor-pointer"
									type="submit"
								>
									Update
								</button>
							</form>
						</article>
					</>
				)}
			</main>
		</div>
	);
};

export default Productmanagement;
