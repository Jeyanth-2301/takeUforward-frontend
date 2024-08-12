"use client";
import { Typography, Menu, MenuItem } from "@mui/material";
import Banner from "dashboard/components/Banner";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./style.css";
import Image from "next/image";
import theme from "../theme";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const dashboardRouting = () => {
    router.push('/dashboard');
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo-circle">
        <Image alt="" src={"/tuf_logo.jpg"} width={60} height={40} />
        </div>
        <Image alt="" src={"/tuf_banner.png"} width={200} height={60}/>
        <div className="menu">
          <button onClick={handleClick}>
            <MenuIcon fontSize="large"/>
          </button>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={dashboardRouting}>Dashboard</MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
        </div>
      </div>
        <Banner />
    </div>
  );
};

export default Home;
