import React, { useContext, useState } from 'react';
import Summary from './Summary';
import { DataContext } from '../context/data';
import '../styles/dashboard.css';
import { TransactionList } from './transactionList';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import BalanceChart from './BalanceChart';

function Dashboard() {
  const { user } = useContext(DataContext);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <div className="dashboard-container flex flex-col">
        <NavbarDashboard toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <div className="flex min-h-screen">
          <Sidebar showSidebar={showSidebar} />
          <div className="dashboard">
            <Summary />
            <div className="divider flex flex-col flex-1 lg:flex-row gap-4">
              <TransactionList />
              <BalanceChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
