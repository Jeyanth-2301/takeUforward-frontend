"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BANNER_DETAILS } from "dashboard/constants/url";
import { useRouter } from "next/navigation";
import "./style.css";
import { Typography, LinearProgress } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Banner = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bannerInfo, setBannerInfo] = useState({
    description: "",
    timer: 0,
    visibility: null,
    link: "",
  });

  const bannerDetailsFetch = async () => {
    setLoading(true);
    try {
      const getBannerDetails = await axios.get(BANNER_DETAILS);
      if (getBannerDetails) {
        const data = getBannerDetails.data;
        setBannerInfo({
          description: data[0].description,
          link: data[0].redirect_link,
          timer: data[0].timer,
          visibility: data[0].visibility,
        });
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    bannerDetailsFetch();
  }, []);

  return (
    <>
      {loading ? (
        <LinearProgress color="warning"/>
      ) : (
        <div className="container">
          <div className="banner">
            <div className="banner-text">
              <button id="btn" onClick={() => router.push(bannerInfo.link)}>
                <Typography sx={{ fontFamily: "Inter, sans-serif" }}>
                  Navigate
                </Typography>
                <ArrowRightIcon />
              </button>
              <h2>{bannerInfo?.description}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
