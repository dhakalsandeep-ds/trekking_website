import React, { useState } from "react";
import "./QuickInquiry.css";
import { storeData } from "../../constants/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuickInquiry() {
  const [inquiryData, setInquiryData] = useState({});

  const onSubmitInquiry = async () => {
    try {
      const url = "/inquiry";
      const result = await storeData(url, inquiryData);
      if (result.status === 201) {
        setInquiryData({});
        toast.success("We have received your Inquiry :) ");
      } else {
        toast.error("Failed to send Inquiry :) ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeInInquiry = (e) => {
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  return (
    <div className="quickInquiry_wrapper">
      <div className="quickInquiry_container">
        <h3>QUICK INQUIRY</h3>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          onChange={onChangeInInquiry}
        />
        <input
          type="text"
          placeholder="Email Id"
          name="email"
          onChange={onChangeInInquiry}
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          onChange={onChangeInInquiry}
        />
        <textarea
          placeholder="Message for us"
          name="message"
          onChange={onChangeInInquiry}
        />
        <div
          className="goBTN"
          onClick={() => {
            onSubmitInquiry();
          }}
        >
          INQUIRY
        </div>
      </div>
    </div>
  );
}
