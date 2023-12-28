import React, { useState } from "react";
import "./ProductBookMenu.css";
import { FaDollarSign } from "react-icons/fa";
import BtnToClick from "../BtnToClick/BtnToClick";
import QuickInquiry from "../QuickInquiry/QuickInquiry";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { storeData } from "../../constants/apiService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "var(--dim-bg)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ProductBookMenu(props) {
  const { tripData } = props;
  const [openInquiry, setOpenInquiry] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingData, setBookingData] = useState({});

  const onSubmitBookingBTN = async () => {
    try {
      const url = "/tripbooking";
      console.log("hello submitter");

      let menuItemData = new FormData();
      menuItemData.append("tripId", tripData.id);
      menuItemData.append("trip_name", tripData.heading);
      menuItemData.append("full_name", bookingData.full_name);
      menuItemData.append("email", bookingData.email);
      menuItemData.append("contact_number", bookingData.contact_number);
      menuItemData.append("country", bookingData.country);
      menuItemData.append("number_of_person", bookingData.number_of_person);
      menuItemData.append("departure_date", bookingData.departure_date);
      menuItemData.append("arrival_date", bookingData.arrival_date);
      menuItemData.append("message", bookingData.message);

      // setBookingData((oldBookingData) => ({
      //   ...oldBookingData,
      //   trip_name: tripData.heading,
      // }));
      // setBookingData((oldBookingData) => ({
      //   ...oldBookingData,
      //   tripId: tripData.id,
      // }));

      const result = await storeData(url, menuItemData);
      if (result.status === 200 || result.status === 201) {
        toast.success("Your Trip has been Booked.");
        handleCloseBooking();
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  const handleOpenInquiry = () => {
    setOpenInquiry(true);
  };
  const handleCloseInquiry = () => {
    setOpenInquiry(false);
  };

  const handleOpenBooking = () => {
    setOpenBooking(true);
  };
  const handleCloseBooking = () => {
    setOpenBooking(false);
  };

  const onChangeInBookingData = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  return (
    <div className="productBookMenu_wrapper">
      <div className="productBookMenu_container">
        <div className="productBookMenu_costing">
          {console.log(bookingData)}
          <div className="pBMc_icon">
            <FaDollarSign />
          </div>
          <div className="pBMc_info">
            <span>Starts from</span>
            <h3>US ${tripData.price}</h3>
          </div>
        </div>
        <div className="productBookMenu_detail">
          <h3>WHY BOOK WITH US ?</h3>
          <ul>
            <li>Best Price Offer</li>
            <li>Instant Online Booking Confirmation</li>
            <li>Extend and Customize Trip Itineraries</li>
          </ul>
        </div>
        <div className="productBookMenu_BTNs">
          <BtnToClick
            title="INQUIRY NOW"
            onclicking={() => handleOpenInquiry()}
          />
          <BtnToClick
            title="BOOK THIS TRIP"
            onclicking={() => handleOpenBooking()}
          />
        </div>
      </div>

      {/* Inquiry Modal  */}
      <Modal
        open={openInquiry}
        onClose={handleCloseInquiry}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <QuickInquiry />
        </Box>
      </Modal>

      {/*Book the Trip Modal  */}
      <Modal
        open={openBooking}
        onClose={handleCloseBooking}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalInput_container">
            <h3>BOOK THIS TRIP</h3>
            <div id="modalInput_client">
              <div className="bigScreenInputs">
                <div className="modalInput_twoFlexBox">
                  <div className="item">
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                  <div className="item">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                </div>

                <div className="modalInput_twoFlexBox">
                  <div className="item">
                    <span>Contact Number</span>
                    <input
                      type="number"
                      name="contact_number"
                      placeholder="Contact Number"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                  <div className="item">
                    <span>Country</span>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                </div>

                <div className="modalInput_threeFlexBox">
                  <div className="item">
                    <span>Guest</span>
                    <input
                      type="number"
                      name="number_of_person"
                      placeholder="Number of Person"
                      onChange={onChangeInBookingData}
                    />
                  </div>

                  <div className="item">
                    <span>Arrival Date</span>
                    <input
                      type="date"
                      name="arrival_date"
                      placeholder="Arrival Date"
                      onChange={onChangeInBookingData}
                    />
                  </div>

                  <div className="item">
                    <span>Departure Date</span>
                    <input
                      type="date"
                      name="departure_date"
                      placeholder="Departure Date"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                </div>
              </div>

              <div className="smallScreenInputs">
                <div className="item">
                  <span>Full Name</span>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    onChange={onChangeInBookingData}
                  />
                </div>
                <div className="item">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChangeInBookingData}
                  />
                </div>
                <div className="item">
                  <span>Contact Number</span>
                  <input
                    type="number"
                    name="contact_number"
                    placeholder="Contact Number"
                    onChange={onChangeInBookingData}
                  />
                </div>
                <div className="modalInput_twoFlexBox">
                  <div className="item">
                    <span>Guest</span>
                    <input
                      type="number"
                      name="number_of_person"
                      placeholder="Number of Person"
                      onChange={onChangeInBookingData}
                    />
                  </div>

                  <div className="item">
                    <span>Country</span>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                </div>

                <div className="modalInput_twoFlexBox">
                  <div className="item">
                    <span>Arrival Date</span>
                    <input
                      type="date"
                      name="arrival_date"
                      placeholder="Arrival Date"
                      onChange={onChangeInBookingData}
                    />
                  </div>

                  <div className="item">
                    <span>Departure Date</span>
                    <input
                      type="date"
                      name="departure_date"
                      placeholder="Departure Date"
                      onChange={onChangeInBookingData}
                    />
                  </div>
                </div>
              </div>

              <textarea
                type="text"
                name="message"
                placeholder="Message for us"
                onChange={onChangeInBookingData}
              />
              <BtnToClick title="Book Now" onclicking={onSubmitBookingBTN} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
