import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./auth";
import { set } from "react-hook-form";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  // Separate loading states for different operations
  const [authLoading, setAuthLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  // Refresh triggers to force component re-renders after data changes
  const [transactionRefresh, setTransactionRefresh] = useState(0);
  const [balanceRefresh, setBalanceRefresh] = useState(0);

  // Balance data to share across components
  const [balances, setBalances] = useState({ bank: 0, wallet: 0, total: 0 });
  const [summary, setSummary] = useState({ income: 0, expenses: 0 });
  // const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const API_BASE_URL = "http://localhost:5002/api/v1";

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/verify`);
          if (response.data.success) {
            // console.log('checkAuth', storedUser);
            setUser(JSON.parse(storedUser));
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          logout();
        }
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userData
      );
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        // add user to localstorage

        setToken(token);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Registration failed" };
    }
  };
  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed",
      };
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };
  const getTransactions = async () => {
    try {
      // console.log('Fetching income data...');
      // console.log(user.id);
      setTransactionLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/${user.id}/transactions`
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        return response.data.transactions;
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error("Error fetching transactions data:", error);
      return { success: false, message: "Failed to fetch transactions" };
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      setTransactionLoading(true);
      transactionData.user_id = user.id;
      const response = await axios.post(
        `${API_BASE_URL}/users/transactions/add`,
        transactionData
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return response.data;
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error("Error adding transaction:", error);
      return { success: false, message: "Failed to add transaction" };
    }
  };
  const deleteTransaction = async (transactionId) => {
    try {
      setTransactionLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/users/transactions/delete/${transactionId}`
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return { message: response.data.message, success: true };
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error("Error deleting transaction:", error);
      return { success: false, message: "Failed to delete transaction" };
    }
  };
  const updateTransaction = async (transactionData) => {
    try {
      setTransactionLoading(true);
      console.log("Updating transaction:", transactionData);
      const response = await axios.put(
        `${API_BASE_URL}/users/transactions/update/${transactionData.id}`,
        transactionData
      );
      if (response.status === 200) {
        setTransactionLoading(false);
        // Trigger refresh for components that display transactions and balances
        setTransactionRefresh((prev) => prev + 1);
        setBalanceRefresh((prev) => prev + 1);
        return { message: response.data.message, success: true };
      }
    } catch (error) {
      setTransactionLoading(false);
      console.error("Error updating transaction:", error);
      return { success: false, message: "Failed to update transaction" };
    }
  };

  const fetchBalances = async () => {
    try {
      setBalanceLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/${user.id}/balances`
      );
      if (response.status === 200) {
        setBalanceLoading(false);
        setBalanceRefresh((prev) => prev + 1);
        const balanceData = response.data.balances;
        // Update shared balance state
        setBalances({
          bank: balanceData.bank,
          wallet: balanceData.wallet,
          total: balanceData.bank + balanceData.wallet,
        });
        return balanceData;
      }
    } catch (err) {
      setBalanceLoading(false);
      console.error("Error fetching balances:", err);
      return { success: false, message: "Failed to fetch balances" };
    }
  };
  const getIncomeExpenseReport = async (monthsNumber) => {
    try {
      setReportLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/reports/transactions/${user.id}/${monthsNumber}`
      );
      if (response.status === 200) {
        setReportLoading(false);

        const processedData = {
          incomeReport: response.data.incomeReport || {},
          expenseReport: response.data.expenseReport || {},
        };
        setSummary({
          income: Object.values(processedData.incomeReport)[0].total,
          expenses: Object.values(processedData.expenseReport)[0].total,
        });
        setBalanceRefresh((prev) => prev + 1);

        return { data: response.data, success: true };
      }
    } catch (err) {
      setReportLoading(false);
      console.error("Error fetching income expense report:", err);
      return { success: false, message: "Failed to fetch report" };
    }
  };
  const getBalanceOverMonth = async (monthsNumber) => {
    try {
      setReportLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/users/reports/balances/${user.id}/${monthsNumber}`
      );
      if (response.status === 200) {
        setReportLoading(false);

        // Process data to separate balance for each month
        const monthlyBalances = {};

        if (response.data.balanceReport) {
          Object.entries(response.data.balanceReport).forEach(
            ([month, data]) => {
              monthlyBalances[month] = {
                bank: data.bank || 0,
                wallet: data.wallet || 0,
                total: (data.bank || 0) + (data.wallet || 0),
              };
            }
          );
        }

        setBalanceRefresh((prev) => prev + 1);
        return {
          data: monthlyBalances,
          success: true,
          rawData: response.data,
        };
      }
    } catch (err) {
      setReportLoading(false);
      console.error("Error fetching balance over month report:", err);
      return { success: false, message: "Failed to fetch balance report" };
    }
  };
  const updateUserSettings = async (settingsData) => {
    try {
      setAuthLoading(true);
      const response = await axios.put(
        `${API_BASE_URL}/users/${user.id}/settings`,
        settingsData
      );
      if (response.status === 200) {
        setAuthLoading(false);
        // Update user data in context and localStorage if needed
        if (settingsData.email || settingsData.currency) {
          const updatedUser = { ...user, ...settingsData };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        return {
          success: true,
          message: response.data.message || "Settings updated successfully",
        };
      }
    } catch (error) {
      setAuthLoading(false);
      console.error("Error updating user settings:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update settings",
      };
    }
  };

  const value = {
    user,
    authLoading, // Overall auth loading state
    transactionLoading,
    reportLoading,
    balanceLoading,
    transactionRefresh,
    balanceRefresh,
    balances, // Shared balance data
    register,
    login,
    logout,
    updateUserSettings,
    token, // Auth token
    isAuthenticated: !!user, // Boolean indicating auth status
    getTransactions,
    addTransaction,
    fetchBalances,
    deleteTransaction,
    updateTransaction,
    getIncomeExpenseReport,
    getBalanceOverMonth,
    summary, // Summary data
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
