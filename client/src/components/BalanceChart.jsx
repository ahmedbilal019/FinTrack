// import React, { useContext } from "react";
// import { DataContext } from "../context/data";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// export default function BalanceChart() {
//   const { user } = useContext(DataContext);

//   let balanceData = user.balanceData.labels.map((label, index) => ({
//     date: label,
//     balance: user.balanceData.datasets.data[index],
//   }));
//   if (balanceData.length > 5) {
//     if (window.innerWidth <= 500) {
//       balanceData = balanceData.slice(-5);
//       console.log(balanceData);
//     } else {
//       balanceData = balanceData.slice(-7);
//     }
//   }
//   //   console.log(balanceData);

//   return (
//     <div className="chart-container">
//       <h3 className="mb-4">{user.balanceData.datasets.label}</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart data={balanceData}>
//           <XAxis dataKey={"date"} />
//           <YAxis
//             tickFormatter={(value) =>
//               `${user.currency} ${value.toLocaleString()}`
//             }
//             fontSize={12}
//           />
//           <Tooltip />
//           <Legend />
//           <Area
//             type="monotone"
//             dataKey="balance"
//             stroke="lime"
//             fill="rgba(34, 197, 94, 0.2)"
//             strokeWidth={3}
//             name="balance"
//             activeDot={{ r: 4, stroke: "rgba(34, 197, 94, 1)", strokeWidth: 1 }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import React, { useContext, useMemo } from "react";
import { DataContext } from "../context/data";
import { AuthContext } from "../context/auth";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BalanceChart() {
  const { user, loading, error } = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const authUser = authCtx?.user ?? null;
  if (loading) return <div className="chart-container">Loading chart...</div>;
  if (error) return <div className="chart-container">Error: {error}</div>;
  if (!user || !user.balanceData)
    return <div className="chart-container">No balance data</div>;

  const balanceData = useMemo(() => {
    const labels = user.balanceData?.labels ?? [];
    const data = user.balanceData?.datasets?.data ?? [];
    const arr = labels.map((label, idx) => ({
      date: label,
      balance: data[idx] ?? 0,
    }));
    if (arr.length > 5) {
      return window.innerWidth <= 500 ? arr.slice(-5) : arr.slice(-7);
    }
    return arr;
  }, [user]);

  const currency = user?.currency ?? authUser?.currency ?? "USD";

  return (
    <div className="chart-container">
      <h3 className="mb-4">{user.balanceData.datasets?.label ?? "Balance"}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={balanceData}>
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              `${currency} ${Number(value).toLocaleString()}`
            }
            fontSize={12}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="lime"
            fill="rgba(34, 197, 94, 0.2)"
            strokeWidth={3}
            name="balance"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
