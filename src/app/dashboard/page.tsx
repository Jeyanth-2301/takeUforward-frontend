"use client";
import axios from "axios";
import { UPDATE_BANNER } from "dashboard/constants/url";
import Image from "next/image";
import { MenuItem, Menu, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Banner from "dashboard/components/Banner";
import "./style.css";
import DashboardContent from "dashboard/components/DashboardContent";

const Dashboard = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dashboardRouting = () => {
    router.push("/home");
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="navbar">
        <div className="logo-circle">
          <Image alt="" src={"/tuf_logo.jpg"} width={60} height={40} />
        </div>
        <h1>Banner Controllables</h1>
        <div className="menu">
          <button onClick={handleClick}>
            <MenuIcon fontSize="large" />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={dashboardRouting}>Home</MenuItem>
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>
        </div>
      </div>
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
