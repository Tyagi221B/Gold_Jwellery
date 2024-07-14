import { onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Loader from "./components/loader";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";

const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/order-details"));
const NotFound = lazy(() => import("./pages/not-found"));
const Checkout = lazy(() => import("./pages/checkout"));

// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Products = lazy(() => import("./pages/admin/Products"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Transaction = lazy(() => import("./pages/admin/Transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/BarCharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/PieCharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/LineCharts"));
const Coupon = lazy(() => import("./pages/admin/apps/Coupon"));
const NewProduct = lazy(() => import("./pages/admin/management/NewProduct"));
const ProductManagement = lazy(
	() => import("./pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
	() => import("./pages/admin/management/TransactionManagement")
);

const App = () => {
	const { user, loading } = useSelector(
		(state: RootState) => state.userReducer
	);

	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const data = await getUser(user.uid);
				dispatch(userExist(data.user));
			} else dispatch(userNotExist());
		});
	}, []);

	return loading ? (
		<Loader />
	) : (
		<Router>
			{/* Header */}
			<Header user={user} />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product:id" element={<ProductPage />} />
					<Route path="/search" element={<Search />} />
					<Route path="/cart" element={<Cart />} />
					{/* Not logged In Route */}
					<Route
						path="/login"
						element={
							<ProtectedRoute isAuthenticated={user ? false : true}>
								<Login />
							</ProtectedRoute>
						}
					/>
					{/* Logged In User Routes */}
					<Route
						element={<ProtectedRoute isAuthenticated={user ? true : false} />}
					>
						<Route path="/shipping" element={<Shipping />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/order/:id" element={<OrderDetails />} />
						<Route path="/pay" element={<Checkout />} />
					</Route>
					{/* Admin Routes */}
					<Route
						element={
							<ProtectedRoute
								isAuthenticated={true}
								adminOnly={true}
								admin={user?.role === "admin" ? true : false}
							/>
						}
					>
						<Route path="/admin/dashboard" element={<Dashboard />} />
						<Route path="/admin/product" element={<Products />} />
						<Route path="/admin/customer" element={<Customers />} />
						<Route path="/admin/transaction" element={<Transaction />} />
						{/* Charts */}
						<Route path="/admin/chart/bar" element={<Barcharts />} />
						<Route path="/admin/chart/pie" element={<Piecharts />} />
						<Route path="/admin/chart/line" element={<Linecharts />} />
						{/* Apps */}
						<Route path="/admin/app/coupon" element={<Coupon />} />
						{/* Management */}
						<Route path="/admin/product/new" element={<NewProduct />} />

						<Route path="/admin/product/:id" element={<ProductManagement />} />

						<Route
							path="/admin/transaction/:id"
							element={<TransactionManagement />}
						/>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			<Toaster position="bottom-center" />
			<Footer/>
		</Router>
	);
};

export default App;
