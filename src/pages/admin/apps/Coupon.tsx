import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container flex bg-[#f7f7f7] h-screen">
      <div className="w-1/6">
				<AdminSidebar />
			</div>
      <main className="dashboard-app-container w-5/6 ml-auto mr-auto bg-white p-32">
        <h1 className="text-4xl font-bold text-center tracking-wide">Coupon</h1>
        <section className="flex flex-col justify-center items-center gap-8 h-full">
          <form className="coupon-form grid grid-cols-1 gap-4 grid-rows-1 max-w-96 w-full" onSubmit={submitHandler}>
            <input
            className="p-4 border border-[#0000005c] outline-none rounded-md"
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />

            <input
            className="p-4 border border-[#0000005c] outline-none rounded-md"
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset className="p-4 border border-[#0000005c] rounded-md flex flex-row justify-evenly items-center gap-0 flex-wrap">
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span className="text-xs">Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span className="text-xs">Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span className="text-xs">Symbols</span>
            </fieldset>
            <button className="font-bold text-xl w-full p-4 border-none text-white cursor-pointer my-8 rounded-lg bg-[#0062ff]" type="submit">Generate</button>
          </form>

          {coupon && (
            <code className="relative text-xl tracking-wider cursor-pointer">
              {coupon}{" "}
              <span className="opacity-0 hover:opacity-100 h-full w-full top-0 left-0 absolute rounded-md  bg-black text-white flex flex-row justify-center items-center gap-8 " onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
