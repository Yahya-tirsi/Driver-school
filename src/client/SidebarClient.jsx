import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Backend/styles.css";

const SidebarClient = () => {
  const [showConfig, setShowConfig] = useState(false);

  const menuItems = [
    { path: "/DashboardC", icon: "fa-user", label: "Dashboard" },
    { path: "/VideoListPage", icon: "fa-chart-simple", label: "Cours" },
    { path: "/PaymentsC", icon: "fa-money-bill", label: "Payee" },
    { path: "/PermisC", icon: "fa-id-card", label: "Permis" },
  ];

  return (
    <nav className="sidebar" aria-label="Main navigation">
      <img
        src={`${process.env.PUBLIC_URL}/image/logoDark.png`}
        alt="Company Logo"
        className="logo-dashboard"
      />
      <hr className="hr-dashboard" />

      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="menu-link">
              <i className={`fa-solid ${item.icon} menu-icon`} style={{margin: '5px'}} />
              {item.label}
            </Link>
          </li>
        ))}

        <li className="config-item">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="config-toggle"
            aria-expanded={showConfig}
          >
            <i className="fa-solid fa-gear menu-icon" />
            Les Informations
          </button>
          
          {showConfig && (
            <ul className="submenu">
              <li>
                <Link to="/ProfileC" className="submenu-link">
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </li>

        <hr className="hr-dashboard" />

        <li className="logout-item">
          <Link to="/login" className="logout-link">
            <i className="fa-solid fa-right-from-bracket menu-icon" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarClient;