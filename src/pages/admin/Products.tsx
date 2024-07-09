import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/loader";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img className="h-40 w-56 object-cover ml-auto mr-auto" src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box bg-white p-8 overflow-auto h-full w-full rounded-md",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container flex bg-[#f7f7f7] h-screen">
      <div className="w-1/6">
				<AdminSidebar />
			</div>
      <main className="w-5/6 mr-auto ml-auto" >{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn fixed right-8 top-20 h-10 w-10 flex flex-row justify-center items-center gap-0 rounded-full bg-red-600 text-white hover:opacity-80">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
