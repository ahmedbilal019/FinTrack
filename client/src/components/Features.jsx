import React from "react";
import { PiChartPieSliceFill } from "react-icons/pi";
import { HiCurrencyDollar } from "react-icons/hi";
import { IoTimer } from "react-icons/io5";
function Features() {
  return (
    <div
      className="flex flex-col items-center justify-center pt-[90px] pb-[90px] "
      id="features"
    >
      <h2 className="text-center text-3xl mb-5 font-semibold">Features</h2>
      <div className="flex items-center justify-center gap-10 m-[50px]   max-lg:flex-col max-lg:gap-15 ">
        <div
          className=" flex flex-1 flex-col  items-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer transition duration-400 ease-in-out transform 
                       hover:-translate-y-2 hover:scale-100 hover:inset-shadow-sm hover:shadow-xl/20  hover:bg-green-500 hover:text-white max-md:hover:bg-green-400 max-md:hover:text-white "
        >
          <div className="flex align-center justify-center">
            <PiChartPieSliceFill
              color="yellow"
              size="100px"
              className="mt-[-50px] bg-white rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7 ">
            <h1 className="font-semibold  text-xl">Smart Income Tracking</h1>
            <p className="text-center max-lg:w-auto max-lg:text-center leading-7">
              Stay on top of every earning record, categorize, and visualize
              your income sources effortlessly. Know exactly where your money
              comes from, anytime.
            </p>
          </div>
        </div>
        <div
          className=" flex flex-1 flex-col  items-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer transition duration-400 ease-in-out transform 
                       hover:-translate-y-2 hover:scale-100 hover:inset-shadow-sm hover:shadow-xl/20  hover:bg-green-500 hover:text-white max-md:hover:bg-green-400 max-md:hover:text-white"
        >
          <div className="flex align-center justify-center ">
            <HiCurrencyDollar
              color="green"
              size="100px"
              className="mt-[-50px] bg-white rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7 ">
            {" "}
            <h1 className="font-semibold text-xl">
              Expense & Spending Insights
            </h1>
            <p className="text-center max-lg:w-auto  max-lg:text-center leading-7 ">
              Track your daily spendings in real time. Identify spending
              patterns, cut unnecessary costs, and make smarter financial
              choices.
            </p>
          </div>
        </div>
        <div
          className=" flex flex-1 flex-col  items-center justify-center text-center pl-[20px] pr-[20px] rounded-md shadow-xl/10 cursor-pointer transition duration-400 ease-in-out transform 
                       hover:-translate-y-2 hover:scale-100 hover:inset-shadow-sm hover:shadow-xl/20 hover:bg-green-500 hover:text-white max-md:hover:bg-green-400 max-md:hover:text-white"
        >
          <div className="flex align-center justify-center">
            <IoTimer
              color="blue"
              size="100px"
              className="mt-[-50px] bg-white rounded-[50px]"
            />
          </div>
          <div className="pt-[40px] pb-[40px] flex flex-col gap-7 ">
            {" "}
            <h1 className="font-semibold text-xl">Transaction Management</h1>
            <p className=" text-center  max-lg:w-auto  max-lg:text-center leading-7">
              Monitor all your transactions in one place fully secure, neatly
              organized, and instantly accessible anytime. Never lose track of
              where your money actually goes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
