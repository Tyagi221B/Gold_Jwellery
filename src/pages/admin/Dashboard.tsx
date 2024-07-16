import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Chart";
import Table from "../../components/admin/DashboardTable";
import { Skeleton } from "../../components/loader";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { RootState } from "../../redux/store";
import { getLastMonths } from "../../utils/features";

const userImg =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const { last6Months: months } = getLastMonths();

const Dashboard = () => {
	const { user } = useSelector((state: RootState) => state.userReducer);

	const { isLoading, data, isError } = useStatsQuery(user?._id!);

	const stats = data?.stats!;

	if (isError) return <Navigate to={"/"} />;

	return (
		<div className="admin-container flex bg-[#f7f7f7] h-full">
			<div className="w-1/6">
				<AdminSidebar />
			</div>
			<main className="dashboard w-5/6 ml-auto mr-auto px-6">
				{isLoading ? (
					<Skeleton length={20} />
				) : (
					<>
						<div className="bar flex items-center justify-end gap-4 h-16 pr-4 border-b border-b-black ">
							<BsSearch />
							<input
								className="rounded-xl pl-4 mr-auto"
								type="text"
								placeholder="Search"
							/>
							<FaRegBell />
							<img
								className="h-10 rounded-full"
								src={user?.photo || userImg}
								alt="User"
							/>
						</div>

						{/* Widget Section */}
						{/* Row One */}

						<section className="widget-container flex flex-row justify-between items-stretch gap-6 pt-8 mb-16">
							<WidgetItem
								percent={stats.changePercent.revenue}
								amount={true}
								value={stats.count.revenue}
								heading="Revenue"
								color="rgb(0, 115, 255)"
							/>
							<WidgetItem
								percent={stats.changePercent.user}
								value={stats.count.user}
								color="rgb(0 198 202)"
								heading="Users"
							/>
							<WidgetItem
								percent={stats.changePercent.order}
								value={stats.count.order}
								color="rgb(255 196 0)"
								heading="Transactions"
							/>

							<WidgetItem
								percent={stats.changePercent.product}
								value={stats.count.product}
								color="rgb(76 0 255)"
								heading="Products"
							/>
						</section>

						{/* Second Row */}
						<section className="graph-container flex flex-row gap-8 pr-8 pb-8 pl-1">
							{/* Revenue & Transaction Section */}
							<div className="revenue-chart bg-white rounded-lg w-full pt-4 pr-12">
								<h2 className="tracking-wider font-bold uppercase mt-4 mr-0 mb-1 text-center">
									Revenue & Transaction
								</h2>
								<BarChart
									labels={months}
									data_1={stats.chart.revenue}
									data_2={stats.chart.order}
									title_1="Revenue"
									title_2="Transaction"
									bgColor_1="rgb(0, 115, 255)"
									bgColor_2="rgba(53, 162, 235, 0.8)"
								/>
							</div>

							{/* Inventory Section */}
							<div className="dashboard-categories w-full max-w-64 flex flex-col justify-center, gap-0 pb-8">
								<h2 className="tracking-wider font-bold uppercase mt-6 mb-8 text-center">
									Inventory
								</h2>

								<div className="overflow-y-auto pl-2">
									{stats.categoryCount.map((i) => {
										const [heading, value] = Object.entries(i)[0];
										return (
											<CategoryItem
												key={heading}
												value={value}
												heading={heading}
												color={`hsl(${value * 4}, ${value}%, 50%)`}
											/>
										);
									})}
								</div>
							</div>
						</section>

						{/* Third Row */}
						<section className="transaction-container flex gap-8 pr-8 pb-14 bg-[#f7f7f7] p-1">
							{/* Gender Chart */}
							<div className="gender-chart bg-white shadow shadow-black rounded-xl w-full max-w-80 p-4 relative">
								<h2 className="text-center mt-6 mb-8 tracking-wider font-bold uppercase">
									Gender Ratio
								</h2>
								<DoughnutChart
									labels={["Female", "Male"]}
									data={[stats.userRatio.female, stats.userRatio.male]}
									backgroundColor={[
										"hsl(340, 82%, 56%)",
										"rgba(53, 162, 235, 0.8)",
									]}
									cutout={90}
								/>
								<p className="absolute top-1/2 left-1/2 transform translate-y-1/2 text-3xl  ">
									<BiMaleFemale />
								</p>
							</div>

							{/* Transaction Table */}
							<Table data={stats.latestTransaction} />
						</section>
					</>
				)}
			</main>
		</div>
	);
};

interface WidgetItemProps {
	heading: string;
	value: number;
	percent: number;
	color: string;
	amount?: boolean;
}

const WidgetItem = ({
	heading,
	value,
	percent,
	color,
	amount = false,
}: WidgetItemProps) => (
	<article className="widget w-64 bg-white shadow-inset shadow-md shadow-black p-8 rounded-lg flex flex-row justify-between items-stretch gap-0">
		<div className="widget-info">
			<p className="opacity-70">{heading}</p>
			<h4 className="text-xl">{amount ? `₹${value}` : value}</h4>
			{percent > 0 ? (
				<span className="green flex flex-row items-center gap-1">
					<HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
				</span>
			) : (
				<span className="red flex flex-row items-center gap-1">
					<HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
				</span>
			)}
		</div>

		<div className="justify-center items-center">
    <div
			className="widget-circle relative border h-20 w-20 rounded-full grid justify-center items-center bg-teal-300 before:contents-[''] before:absolute before:left-[6.8px] before:h-16 before:w-16 before:bg-white before:rounded-full"
			style={{
				background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
			}}
		>
			<span
				className="relative"
				style={{
					color,
				}}
			>
				{percent > 0 && `${percent > 10000 ? 9999 : percent}%`}
				{percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
			</span>
		</div>
    </div>
	</article>
);

interface CategoryItemProps {
	color: string;
	value: number;
	heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
	<div className="category-item w-full flex flex-row justify-between p-4">
		<h5 className="tracking-wider font-bold">{heading}</h5>
		<div className="ml-auto w-24 bg-[#d9d9d9] rounded-3xl h-2">
			<div
				className="rounded-3xl h-full"
				style={{
					backgroundColor: color,
					width: `${value}%`,
				}}
			></div>
		</div>
		<span className="text-xs font-extrabold">{value}%</span>
	</div>
);

export default Dashboard;
