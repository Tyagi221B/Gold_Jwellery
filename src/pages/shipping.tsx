import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping flex flex-row justify-center items-center gap-4">
      <button className="back-btn h-10 w-10 bg-[#2e2e2e] text-white flex justify-center items-center fixed top-32 left-32 rounded-full border-none outline-none cursor-pointer shadow-sm shadow-[#00000062]" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form
      className="max-w-[450px] w-full flex flex-col justify-center items-stretch gap-8
      p-8"
      onSubmit={submitHandler}>
        <h1 className="tracking-wider font-bold uppercase m-8 text-center text-xl">Shipping Address</h1>

        <input className="border border-[#1f1f1f5a] p-4 outline-none text-xl rounded-md"
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />

        <input className="border border-[#1f1f1f5a] p-4 outline-none text-xl rounded-md"
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />

        <input className="border border-[#1f1f1f5a] p-4 outline-none text-xl rounded-md"
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />

        <select className="border border-[#1f1f1f5a] p-4 outline-none text-xl rounded-md"
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>

        <input className="border border-[#1f1f1f5a] p-4 outline-none text-xl rounded-md"
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />

        <button className="p-4 bg-[#006888] text-white outline-none rounded-md text-xl uppercase tracking-wider hover:opacity-80" type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
