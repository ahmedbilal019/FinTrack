/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "../styles/balance.css";
import NavbarDashboard from "./NavbarDashboard";
import Sidebar from "./Sidebar";
import "../styles/transactionPage.css";
import { AuthContext } from "../context/auth";
import { FaWallet } from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";
import { HiCurrencyDollar } from "react-icons/hi";

export default function Balance() {
  const { fetchBalances, balanceLoading, balanceRefresh, balances, currency } =
    useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(() => {
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const getbalance = async () => {
      await fetchBalances(); // This will update the shared balances state
    };
    getbalance();
  }, [balanceRefresh]); // Re-run when balances change

  return (
    <div className="balance-page">
      <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div className="flex min-h-screen">
        <Sidebar showSidebar={showSidebar} />
        <div className="balance-dashboard">
          <div className="total-balance container">
            <HiCurrencyDollar color="green" size={50} />
            <h1 className="total">Total Balance</h1>

            <p
              className={`${
                balances.total < 0 ? "text-red-700" : "text-green-700"
              } font-bold`}
            >
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency || "USD",
              }).format(balances.total)}
            </p>
          </div>

          <ul className="balance-details">
            <li>
              <div className="bank-balance container">
                <RiBankCardFill color="green" size={50} />
                <h1 className="bank">Bank balance</h1>

                <p
                  className={`${
                    balances.bank < 0 ? "text-red-700" : "text-green-600"
                  } font-bold`}
                >
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency || "USD",
                  }).format(balances.bank)}
                </p>
              </div>
            </li>
            <li>
              <div className="wallet-balance container">
                <FaWallet color="black" size={50} />
                <h1 className="wallet">Wallet balance</h1>

                <p
                  className={`${
                    balances.wallet < 0 ? "text-red-700" : "text-black-900"
                  } font-bold`}
                >
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency || "USD",
                  }).format(balances.wallet)}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
