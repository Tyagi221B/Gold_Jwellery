// import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/loader";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState, server } from "../redux/store";
import { CustomError } from "../types/api-types";

// type DataType = {
// 	_id: string;
// 	amount: number;
// 	quantity: number;
// 	discount: number;
// 	status: ReactElement;
// 	action: ReactElement;
// };

// const column: Column<DataType>[] = [
// 	{
// 		Header: "ID",
// 		accessor: "_id",
// 	},
// 	{
// 		Header: "Quantity",
// 		accessor: "quantity",
// 	},
// 	{
// 		Header: "Discount",
// 		accessor: "discount",
// 	},
// 	{
// 		Header: "Amount",
// 		accessor: "amount",
// 	},
// 	{
// 		Header: "Status",
// 		accessor: "status",
// 	},
// 	{
// 		Header: "Action",
// 		accessor: "action",
// 	},
// ];

const Orders = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

	// const [rows, setRows] = useState<DataType[]>([]);

	if (isError) {
		const err = error as CustomError;
		toast.error(err.data.message);
	}

	// useEffect(() => {
	// 	if (data)
	// 		setRows(
	// 			data.orders.map((i) => ({
	// 				_id: i._id,
	// 				amount: i.total,
	// 				discount: i.discount,
	// 				quantity: i.orderItems.length,
	// 				status: (
	// 					<span
	// 						className={
	// 							i.status === "Processing"
	// 								? "red"
	// 								: i.status === "Shipped"
	// 								? "green"
	// 								: "purple"
	// 						}
	// 					>
	// 						{i.status}
	// 					</span>
	// 				),
	// 				action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
	// 			}))
	// 		);
	// }, [data]);

	// const Table = TableHOC<DataType>(
	// 	column,
	// 	rows,
	// 	"dashboard-product-box bg-white p-8 overflow-auto h-full w-full rounded-md",
	// 	"Orders",
	// 	rows.length > 6
	// )();


	return (
			<div className="container max-w-[1367px] w-full m-auto overflow-auto">
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<div className="">
						<section className="py-12 relative">
							<div className="w-full max-w-7xl mx-auto px-4 md:px-8">
								<h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9 text-center">
									Order History
								</h2>

								<div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
									<ul className="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
										<li className="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
											All Order
										</li>
										{/* <li className="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
									Completed
								</li> */}
									</ul>
								</div>

								{data?.orders.map((item) => (
									<div
										key={item._id}
										className="mt-7 border border-gray-300 pt-9 lg:mb-28"
									>
										<div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
											<div className="data">
												<p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
													OrderID : {item._id}
												</p>
												{/* <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
											Order Payment : .. / .. / ....
										</p> */}
											</div>
											<div className="flex items-center gap-3 max-md:mt-5">
												<button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
													View Details
												</button>
												<button className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">
													Order Again
												</button>
											</div>
										</div>
										<svg
											className="my-9 w-full"
											xmlns="http://www.w3.org/2000/svg"
											width="1216"
											height="2"
											viewBox="0 0 1216 2"
											fill="none"
										>
											<path d="M0 1H1216" stroke="#D1D5DB" />
										</svg>

										{item.orderItems.map((orderItem) => (
											<div key={orderItem._id}>
												<div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 mt-9">
													<div className="grid grid-cols-4 w-full">
														<div className="col-span-4 sm:col-span-1">
															<img
																src={`${server}/${orderItem.photo}`}
																className="max-sm:mx-auto"
															/>
														</div>
														<div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
															<h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
																{orderItem.name}
															</h6>
															<div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
																<span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
																	Qty: {orderItem.quantity}
																</span>
																<span className="text-gray-500 text-xl">
																	Price: ₹ {orderItem.price}
																</span>
															</div>
														</div>
													</div>
													<div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
														<div className="flex flex-col justify-center items-start max-sm:items-center">
															<p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
																Status
															</p>
															<p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
																<span
																	className={
																		item.status === "Delivered"
																			? "text-[#2ECC71]"
																			: item.status === "Shipped"
																			? "text-[#3498DB]"
																			: "text-[#E74C3C]"
																	}
																>
																	{item.status}
																</span>
															</p>
														</div>
														{/* <div className="flex flex-col justify-center items-start max-sm:items-center">
													<p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
														Delivery Expected by
													</p>
													<p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
														23rd March 2021
													</p>
												</div> */}
													</div>
												</div>
												<svg
													className="mt-12 w-full"
													xmlns="http://www.w3.org/2000/svg"
													width="1216"
													height="2"
													viewBox="0 0 1216 2"
													fill="none"
												>
													<path d="M0 1H1216" stroke="#D1D5DB" />
												</svg>
											</div>
										))}
										<div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
											<div className="flex max-sm:flex-col-reverse items-center">
												<button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-indigo-600">
													<svg
														width="40"
														height="41"
														viewBox="0 0 40 41"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															className="stroke-gray-600 transition-all duration-500 group-hover:stroke-indigo-600"
															d="M14.0261 14.7259L25.5755 26.2753M14.0261 26.2753L25.5755 14.7259"
															stroke=""
															stroke-width="1.8"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
													cancel order
												</button>
												<p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
													Payment Is Succesfull
												</p>
											</div>
											<p className="font-medium text-xl leading-8 text-black max-sm:py-4">
												{" "}
												<span className="text-gray-500">
													Total Price:{" "}
												</span>{" "}
												&nbsp; ₹ {item.total}
											</p>
										</div>
									</div>
								))}
							</div>
						</section>
					</div>
				)}
			</div>
	);
};

export default Orders;
