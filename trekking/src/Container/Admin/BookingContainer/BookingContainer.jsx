import React, { useState } from "react";
import "./BookingContainer.css";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TitleAndData from "../../../Components/TitleAndData/TitleAndData";
import { toast } from "react-toastify";
import {
  deleteData,
  getAllData,
  updateData,
} from "../../../constants/apiService";
import { useEffect } from "react";

const viewStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "var(--dim-bg)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const deleteStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "var(--dim-bg)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function BookingContainer() {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [bookingData, setBookingData] = useState();
  const [categoryData, setCategoryData] = useState();
  // const [categoryAllData, setCategoryAllData] = useState();
  const [soloBookingData, setSoloBookingData] = useState();
  const [deleteId, setDeleteId] = useState("");

  const fetchBookingData = async () => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    //  let bodyContent = JSON.stringify({
    //    "packageName":"shail",
    //    "name":"ramesh",
    //    "numberOfPeople":7,
    //    "contactNumber":985748393,
    //    "arrivalDate":"2/12/200"


    //  });

    let response = await fetch("http://localhost:8000/bookings", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    setBookingData(data.data)


    // try {
    //   const url = "/tripbooking";
    //   const result = await getAllData(url);
    //   if (result.status === 200) {
    //     setBookingData(result.data.data.results);
    //   } else {
    //     toast.error("Some error occurred");
    //   }
    // } catch (err) {
    //   toast.error("Some error occurred");
    // }
  };

  const fetchCategoryData = async (categoryId) => {
    try {
      const url = "/tripinfo/" + categoryId;
      const result = await getAllData(url);
      if (result.status === 200) {
        const categoryName = result.data.data.TripCategory.title.replace(
          /\s/g,
          ""
        );
        setCategoryData(categoryName);
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  const fetchSoloBookingData = async (bookingID) => {
    try {
      const url = "/tripbooking/" + bookingID;
      const result = await getAllData(url);
      if (result.status === 200) {
        setSoloBookingData(result.data.data);
        console.log("hello", result.data.data);
        const categoryId = result.data.data.tripId;
        console.log("categoryId", categoryId);

        fetchCategoryData(categoryId);
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  // const fetchAllCategoryData = async () => {
  //   try {
  //     const url = "/tripinfo/";
  //     const result = await getAllData(url);
  //     if (result.status === 200) {
  //       const datas = result.data.data.results;
  //       datas.map((data) => {
  //         setCategoryAllData((prevCategoryAllData) => {
  //           return { ...prevCategoryAllData, [data.id]: data.heading };
  //         });
  //       });
  //     } else {
  //       toast.error("Some error occurred");
  //     }
  //   } catch (err) {
  //     toast.error("Some error occurred");
  //   }
  // };

  // const categoryChecker = (category_id) => {
  //   for (const [key, value] of Object.entries(categoryAllData)) {
  //     if (key == category_id) {
  //       return value;
  //     }
  //   }
  // };

  const amountPaid = async (bookedID) => {
    try {
      const url = "/tripbooking/" + bookedID;
      const paidData = { seen: true };
      const result = await updateData(url, paidData);
      if (result.status === 201) {
        toast.success("Amount Paid");
        fetchBookingData();
        handleCloseView();
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  const deleteSoloBookingData = async (bookedID) => {
    try {
      const url = "/tripbooking/" + bookedID;
      const result = await deleteData(url);
      if (result.status === 200) {
        toast.warn("Customer Booking Data deleted");

        fetchBookingData();
        handleCloseDelete();
      } else {
        toast.error("Some error occurred");
      }
    } catch (err) {
      toast.error("Some error occurred");
    }
  };

  //to getCategoryName for Link generation
  const getUrl = (tripData) => {
    const tripId = tripData;
    const fullURL = "/activities/" + categoryData + "/" + tripId;
    return fullURL;
  };

  useEffect(() => {
    // fetchAllCategoryData();
    fetchBookingData();
  }, []);

  const handleOpenView = (id) => {
    fetchSoloBookingData(id);
    setOpenView(true);
  };
  const handleCloseView = () => {
    setSoloBookingData();
    setOpenView(false);
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setDeleteId("");
    setOpenDelete(false);
  };

  const handleDelete = async (id) => {

    console.log(id, 'id...........')
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`http://localhost:8000/bookings/${id}`, {
      method: "DELETE",
      headers: headersList
    });
    console.log(response, "response.....")
    if(response.status === 200){
      let data = await response.json();
     
     
      toast.success("deleted")
      setBookingData(bd =>{


        console.log("before reuslt", bd)
        const result = bd.filter(p => p._id !== id)
        console.log(id,"id........")
        console.log("after result",result)
        return result
      } )
    } else {
      toast.error("something went wrong")
    }
   

  }

  return (
    <div className="bookingA_wrapper">
      <div className="bookingA_container">
        <h1>Booking Info</h1>
        <div className="bookingA_content">
          <table id="bookingTable">
            <tr>
              <th width="5%">SN</th>
              <th width="25%">Trip Name</th>
              <th width="20%">Customer Name</th>
              <th width="15%">Contact Number</th>
              <th width="15%">Arrival Date</th>
              <th width="15%">Action</th>
            </tr>

            
            {Array.isArray(bookingData) &&
              bookingData.map((booked, i) => {
                return (
                  <tr id={i}>
                    <td>{i + 1}</td>
                    <td>{booked.packageName}</td>
                    <td>{booked.name}</td>
                    <td>{booked.contactNumber}</td>
                    <td>{booked.arrivalDate.slice(0, 10)}</td>
                    <td>



                      <MdDelete
                        onClick={() => {
                          handleDelete(booked._id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>

        {/* Edit Modal */}
        <Modal
          open={openView}
          onClose={handleCloseView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={viewStyle}>
            <h2 id="modalTitle">Booking Details</h2>
            <div className="modalContents">
              <TitleAndData
                title="Trip Name"
                data={
                  soloBookingData ? soloBookingData.trip_name : "Loading..."
                }
                url={
                  soloBookingData
                    ? getUrl(soloBookingData.tripId)
                    : "Loading..."
                }
              />
              <TitleAndData
                title="Customer Name"
                data={
                  soloBookingData ? soloBookingData.full_name : "Loading..."
                }
              />
              <TitleAndData
                title="Email"
                data={soloBookingData ? soloBookingData.email : "Loading..."}
              />
              <TitleAndData
                title="Country"
                data={soloBookingData ? soloBookingData.country : "Loading..."}
              />
              <TitleAndData
                title="Contact Number"
                data={
                  soloBookingData
                    ? soloBookingData.contact_number
                    : "Loading..."
                }
              />
              <TitleAndData
                title="Number of Person"
                data={
                  soloBookingData
                    ? soloBookingData.number_of_person
                    : "Loading..."
                }
              />
              <TitleAndData
                title="Arrival Date"
                data={
                  soloBookingData
                    ? soloBookingData.arrival_date.slice(0, 10)
                    : "Loading..."
                }
              />
              <TitleAndData
                title="Departure Date"
                data={
                  soloBookingData
                    ? soloBookingData.departure_date.slice(0, 10)
                    : "Loading..."
                }
              />
              <TitleAndData
                title="Message"
                data={soloBookingData ? soloBookingData.message : "Loading..."}
              />
            </div>
            {soloBookingData && soloBookingData.seen ? (
              ""
            ) : (
              <BtnToClick
                title="Amount Paid"
                customColor="success"
                onclicking={() => amountPaid(soloBookingData.id)}
              />
            )}
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={deleteStyle}>
            <h3>Are you sure want to delete this Customer Info?</h3>
            <BtnToClick
              title="Delete"
              customColor="delete"
              onclicking={() => deleteSoloBookingData(deleteId)}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
