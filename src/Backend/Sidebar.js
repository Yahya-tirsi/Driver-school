import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { colors } from "@mui/material";

const Sidebar = () => {
  const [toggleConfiguration, settoggleonfiguration] = useState(false);
  function handleConfiguration() {
    settoggleonfiguration(!toggleConfiguration);
  }
  return (
    <div className="sidebar">
      <img
        src={`${process.env.PUBLIC_URL}/image/logoDark.png`}
        alt="Profile"
        className="logo-dashboard"
      />
      <hr className="hr-dashboard"></hr>
      {/* <div className="profile">
        <img
          src={`${process.env.PUBLIC_URL}/image/person1.jpg`}
          alt="Profile"
        />
        <p>User Name</p>
      </div> */}
      <ul>
        <li>
          <i
            style={{ paddingRight: "1rem", fontSize: "22px" }}
            class="fa-solid fa-user"
          ></i>{" "}
          <Link to="/dashboard/clients">Clients</Link>
        </li>
        <li>
          <i
            style={{ paddingRight: "1rem", fontSize: "22px" }}
            class="fa-solid fa-chart-simple"
          ></i>{" "}
          <Link to="/dashboard/statistiques">Statistiques</Link>
        </li>
        <li>
          <i
            style={{ paddingRight: "1rem", fontSize: "22px" }}
            class="fa-solid fa-calendar-days"
          ></i>{" "}
          <Link to="/dashboard/calendar">Calendar</Link>
        </li>
        <li
          onClick={() => handleConfiguration()}
          className="configrution-toggle-dashboard"
        >
          <i
            style={{ paddingRight: "1rem", fontSize: "22px" }}
            class="fa-solid fa-gear"
          ></i>
          Configuration
          {toggleConfiguration && (
            <ul>
              {/* <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li> */}
              <li>
                <Link to="/dashboard/categories">Categories</Link>
              </li>
              <li>
                <Link to="/dashboard/vihucule">Vehicule</Link>
              </li>
              <li>
                <Link to="/dashboard/moniteure">Moniteurs</Link>
              </li>
            </ul>
          )}
        </li>
        <hr className="hr-dashboard"></hr>

        <li id="logout-dashboard">
          <i
            style={{ paddingRight: "1rem", fontSize: "22px" }}
            class="fa-solid fa-right-from-bracket"
          ></i>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
