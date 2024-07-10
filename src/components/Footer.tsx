import { Link } from 'react-router-dom'
// import Logo from '../Logo'

    
function Footer() {
return (
    <div className="relative overflow-hidden py-10 bg-[#F2E9E9]  border-t-2 border-t-[#F2E9E9] mt-28">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center text-[#832729] font-bold text-4xl">
                                {/* <Logo width="100px" /> */}LOGO
                            </div>
                            <div>
                                <p className="text-sm text-[#832729]">
                                    &copy; Copyright 2023. All Rights Reserved by Asmittyagi.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-wide mb-9 font-semibold uppercase text-[#832729]">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                        <h3 className="tracking-wide mb-9 font-semibold uppercase text-[#832729]">
                        Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                        <h3 className="tracking-wide mb-9 font-semibold uppercase text-[#832729]">
                        Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-black hover:text-[#832729]  hover:underline"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}


export default Footer
