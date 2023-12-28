import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function MediaIcon(props) {
  const { iconName } = props;
  switch (iconName.toLowerCase()) {
    case "google":
      return <FaGoogle />;
    case "facebook":
      return <FaFacebookF />;
    case "twitter":
      return <FaTwitter />;
    case "instagram":
      return <FaInstagram />;
    case "tiktok":
      return <FaTiktok />;
    default:
      return <FaGoogle />;
  }
}
