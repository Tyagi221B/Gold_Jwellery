import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Chart";
import { Skeleton } from "../../../components/loader";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";

const { last12Months: months } = getLastMonths();

const Linecharts = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const { isLoading, data, error, isError } = useLineQuery(user?._id!);

	const products = data?.charts.products || [];
	const users = data?.charts.users || [];
	const revenue = data?.charts.revenue || [];
	const discount = data?.charts.discount || [];

	if (isError) {
		const err = error as CustomError;
		toast.error(err.data.message);
	}

	return (
		<div className="admin-container flex bg-[#f7f7f7] h-screen">
			<div className="w-1/6">
				<AdminSidebar />
			</div>
			<main className="chart-container w-5/6 ml-auto mr-auto bg-white p-16 overflow-y-auto">
				<h1 className="mb-20 ml-8">Line Charts</h1>

				{isLoading ? (
					<Skeleton length={15} />
				) : (
					<>
						<section className="w-10/12 my-16 mx-auto">
							<LineChart
								data={users}
								label="Users"
								borderColor="rgb(53, 162, 255)"
								labels={months}
								backgroundColor="rgba(53, 162, 255, 0.5)"
							/>
							<h2 className="my-8 mx-0 text-center font-bold uppercase tracking-wider">Active Users</h2>
						</section>

						<section>
							<LineChart
								data={products}
								backgroundColor={"hsla(269,80%,40%,0.4)"}
								borderColor={"hsl(269,80%,40%)"}
								labels={months}
								label="Products"
							/>
							<h2 className="my-8 mx-0 text-center font-bold uppercase tracking-wider">Total Products (SKU)</h2>
						</section>

						<section className="w-10/12 my-16 mx-auto">
							<LineChart
								data={revenue}
								backgroundColor={"hsla(129,80%,40%,0.4)"}
								borderColor={"hsl(129,80%,40%)"}
								label="Revenue"
								labels={months}
							/>
							<h2 className="my-8 mx-0 text-center font-bold uppercase tracking-wider">Total Revenue </h2>
						</section>

						<section className="w-10/12 my-16 mx-auto">
							<LineChart
								data={discount}
								backgroundColor={"hsla(29,80%,40%,0.4)"}
								borderColor={"hsl(29,80%,40%)"}
								label="Discount"
								labels={months}
							/>
							<h2 className="my-8 mx-0 text-center font-bold uppercase tracking-wider">Discount Allotted </h2>
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default Linecharts;
