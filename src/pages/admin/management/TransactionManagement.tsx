import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { RootState, server } from "../../../redux/store";
import { Order, OrderItem } from "../../../types/types";
import { responseToast } from "../../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container flex bg-[#f7f7f7] h-screen">
      <div className="w-1/6">
				<AdminSidebar />
			</div>
      <main className="product-management flex flex-row justify-center p-16 w-5/6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section className="overflow-y-auto w-full h-full max-w-[500px] shadow-sm shadow-black bg-white p-20 flex flex-col gap-4 relative rounded-md "
              style={{
                padding: "2rem",
              }}
            >
              <h2 className="uppercase tracking-wider">Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={`${server}/${i.photo}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1 className="text-center tracking-wider font-bold uppercase">Order Info</h1>
              <h5 className="mt-8 ml-2 text-xl font-extrabold">User Info</h5>
              <p className="m-2">Name: {name}</p>
              <p className="m-2">
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
              <h5 className="mt-8 ml-2 text-xl font-extrabold">Amount Info</h5>
              <p className="m-2">Subtotal: {subtotal}</p>
              <p className="m-2">Shipping Charges: {shippingCharges}</p>
              <p className="m-2">Tax: {tax}</p>
              <p className="m-2">Discount: {discount}</p>
              <p className="m-2">Total: {total}</p>

              <h5 className="mt-8 ml-2 text-xl font-extrabold">Status Info</h5>
              <p className="m-2">
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button 
              className="shipping-btn mt-8 p-4 bg-blue-500 text-white rounded-md text-xl cursor-pointer w-full hover:opacity-80"
              onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card flex flex-row items-center gap-4">
    <img className="h-16 w-16 object-cover rounded-md" src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span className="ml-auto">
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
