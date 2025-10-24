import React, { use, useState } from 'react';
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdBarChart,
  MdLogout,
  MdSettings,
} from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
export default function Sidebar({ showSidebar }) {
  const menuItems = [
    { icon: MdDashboard, label: 'Dashboard', path: '/dashboard' },
    {
      icon: BiTransfer,
      label: 'Transactions',
      path: '/dashboard/transactions',
    },
    {
      icon: MdAccountBalanceWallet,
      label: 'Wallet',
      path: '/dashboard/wallet',
    },
    { icon: MdBarChart, label: 'Reports', path: '/dashboard/reports' },
    { icon: MdSettings, label: 'Settings', path: '/dashboard/settings' },
    { icon: MdLogout, label: 'Log Out', path: '/login', isLogout: true },
  ];
  const location = useLocation();
  const isActivePath = (currentPath) => {
    return location.pathname === currentPath;
  }  
  return (
    <div
      className={`sidebar ${showSidebar ? 'sidebar-open' : 'sidebar-closed'}`}
    >
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          const active = isActivePath(item.path);
          return (
            <div
              key={index}
              className={`sidebar-item ${
                active ? 'active' : ''
              } ${item.isLogout ? 'logout' : ''}`}
            >
              <Link
                key={index}
                to={
                  item.label !== 'Dashboard'
                    ? '/dashboard/' + item.label.toLowerCase()
                    : '/dashboard'
                }
              >
                <button name={item.label} aria-label={item.label}>
                  <IconComponent className="sidebar-icon" />
                </button>
                <span className={`sidebar-label ${!showSidebar && 'hidden'}`}>
                  {item.label}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
