import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";

const LandingHero = () => {
  const isSignedIn = useState(false);

  return (
    <div className="sm:w-[90%] md:w-[90%] lg:w-[80%] mx-auto mt-10">
      <div className="px-10 md:px-10 lg:px-0">
        <h1 className="text-6xl text-white poppins">KAI VENTURE PARTNERS</h1>
        <h2 className="text-gray-300 text-4xl mt-20">
          Redefining Enterprise Efficiency with AI
        </h2>
        <h3 className=" text-cyan-500 mt-4 text-3xl w-[100%] md:w-[100%] lg:w-[50%]">
          KAI Venture Partners offers a unique AI-driven approach to building
          and launching SaaS companies, as well as providing tailored consulting
          services. We bridge the gap between AI/ML technology and its practical
          business applications
        </h3>

        <div className="w-[200px] flex items-center justify-center rounded-sm gap-x-2 mt-10 bg-gradient-to-r from-green-500 to-blue-500">
          <Link
            to={isSignedIn ? "/dashboard" : "/signin"}
            className="flex items-center"
          >
            <button className="p-2 rounded-md font-semibold  text-white border-0">
              Let&apos;s Get Started
            </button>
            <BiLinkExternal color="white" size={20} />
          </Link>
        </div>

        <div className="p-10"></div>
      </div>
    </div>
  );
};

export default LandingHero;
