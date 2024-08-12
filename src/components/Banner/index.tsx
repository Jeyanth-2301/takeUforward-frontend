"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { BANNER_DETAILS } from "dashboard/constants/url";
import { useRouter } from "next/navigation";
import "./style.css";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Banner = () => {
  const router = useRouter();
  const bannerDetailsFetch = async () => {
    try {
      const getBannerDetails = await axios.get(BANNER_DETAILS);
      if (getBannerDetails) {
        console.log(getBannerDetails.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    bannerDetailsFetch();
  }, []);

  return (
    <div className="container">
      <div className="banner">
        <div className="banner-text">
          <button id="btn">Navigate<ArrowRightIcon /></button>
          <h2>Limited Time Offer</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
