"use client";
import axios from "axios";
import { UPDATE_BANNER } from "dashboard/constants/url";
import Image from "next/image";
import { MenuItem, Menu } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Banner from "dashboard/components/Banner";
import "./style.css";

const Dashboard = () => {
  const defaultValues = {
    userId: "f24e328d-e096-4248-8a12-c78217227839",
  };
  const updatingBannerDetails = async () => {
    try {
      const bannerUpdation = await axios.post(
        UPDATE_BANNER,

        {
          userId: defaultValues.userId,
          description: "Hey checking",
          timer: "5",
          visible: 0,
          link: "https://recon.triffy.in",
        }
      );
      if (bannerUpdation) {
        console.log(bannerUpdation.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    <div>
      <div className="navbar">
        <div className="logo-circle">
          <Image alt="" src={"/tuf_logo.jpg"} width={60} height={40} />
        </div>
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
    </div>
  );
};

export default Dashboard;
