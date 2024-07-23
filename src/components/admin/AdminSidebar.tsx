import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { IconType } from "react-icons";
import { FaChartBar, FaChartPie, FaChartLine  } from "react-icons/fa";
import { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";

const AdminSidebar = () => {
	const location = useLocation();
	const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);


	return (
		<div className="">
		{phoneActive && (
        <button className="hamburger grid place-items-center h-12 w-12 border-none cursor-pointer text-[#2c68ff] fixed top-4 left-4 text-3xl bg-white rounded-[50%] z-[9]" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
		<aside 
		className="w-full h-screen bg-white p-1 z-10 overflow-y-auto"
		style={
			phoneActive
				? {
						width: "20rem",
						height: "100vh",
						position: "fixed",
						top: 0,
						left: showModal ? "0" : "-20rem",
						transition: "all 0.5s",
					}
				: {}
		}
		>
			<SubSectionOne location={location} />
      <SubSectionTwo location={location} />
      <SubSectionThree location={location} />

			{phoneActive && (
          <button className="close-sidebar w-[80%] my-4 mx-auto block p-3 border-none outline-none cursor-pointer text-white rounded-lg " onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
		</aside>
		</div>
	);
};

const SubSectionOne = ({ location }: { location: Location }) => (
	<div className="mt-8 mr-4">
		<h5 className="tracking-wider font-bold opacity-80 uppercase mt-4 mr-0 ">Dashboard</h5>
		<ul className="flex flex-col gap-4">
			<Li
				url="/admin/dashboard"
				Icon={RiDashboardFill}
				location={location}
				text="Dashboard"
			/>
			<Li
				url="/admin/product"
				Icon={RiShoppingBag3Fill}
				location={location}
				text="Product"
			/>
			<Li
				url="/admin/customer"
				Icon={IoIosPeople}
				location={location}
				text="Customers"
			/>
			<Li
				url="/admin/transaction"
				Icon={AiFillFileText}
				location={location}
				text="Transaction"
			/>
		</ul>
	</div>
);

const SubSectionTwo = ({ location }: { location: Location }) => (
  <div className="mt-8 mr-4">
				<h5 className="tracking-wider font-bold opacity-80 uppercase mt-4 mr-0" >Charts</h5>
				<ul className="flex flex-col gap-4">
					<Li
						url="/admin/chart/bar"
						Icon={FaChartBar}
						location={location}
						text="Bar"
					/>
					<Li
						url="/admin/chart/pie"
						Icon={FaChartPie}
						location={location}
						text="Pie"
					/>
					<Li
						url="/admin/chart/line"
						Icon={FaChartLine}
						location={location}
						text="Line"
					/>
				</ul>
			</div>
);

const SubSectionThree = ({ location }: { location: Location }) => (
  <div className="mt-8 mr-4">
				<h5 className="tracking-wider font-bold opacity-80 uppercase mt-4 mr-0" >App</h5>
				<ul>
					<Li
						url="/admin/app/coupon"
						Icon={RiCoupon3Fill}
						location={location}
						text="Coupon"
					/>
				</ul>
			</div>
);
interface LiProps {
	url: string;
	text: string;
	location: Location;
	Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
	<li
		className="pt-2 pr-4 rounded-xl"
		style={{
			backgroundColor: location.pathname.includes(url)
				? "rgba(0,115,255,0.1)"
				: "white",
		}}
	>
		<Link
			className="flex flex-row items-center gap-4"
			to={url}
			style={{
				color: location.pathname.includes(url) ? "rgba(0,115,255)" : "black",
			}}
		>
			<Icon />
			{text}
		</Link>
	</li>
);

export default AdminSidebar;
