import React, { useEffect, useState } from "react";
import "./InquiryContainer.css";

import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TitleAndData from "../../../Components/TitleAndData/TitleAndData";
import {
  deleteData,
  getAllData,
  updateData,
} from "../../../constants/apiService";
import { toast } from "react-toastify";

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

export default function InquiryContainer() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [inquiryData, setInquiryData] = useState("");
  const [soloInquiryData, setSoloInquiryData] = useState("");

  const fetchInquiryData = async () => {
    try {
      const url = "/inquiry";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log(result.data.data.results);
        setInquiryData(result.data.data.results);
      } else {
        toast.error("Some error occurred");
        console.log("error", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const fetchSoloInquiryData = async (inquiry_id) => {
    try {
      const url = "/inquiry/" + inquiry_id;
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log(result.data.data);
        setSoloInquiryData(result.data.data);
      } else {
        toast.error("Some error occurred");
        console.log("error", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const updateSoloInquiryData = async (inquiry_id) => {
    try {
      const url = "/inquiry/" + inquiry_id;
      const seenData = { seen: true };
      const result = await updateData(url, seenData);
      if (result.status === 200 || result.status === 201) {
        console.log("seen", result);
        toast.info("You have seen that Inquiry");
        fetchInquiryData();
        handleCloseEdit();
      } else {
        toast.error("Some error occurred");
        console.log("error seen", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const deleteSoloInquiryData = async (inquiry_id) => {
    try {
      const url = "/inquiry/" + inquiry_id;
      const result = await deleteData(url);
      if (result.status === 200) {
        console.log("delete", result);
        toast.warn("Customer Inquiry is deleted.");
        fetchInquiryData();
      } else {
        toast.error("Some error occurred");
        console.log("error", result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInquiryData();
  }, []);

  const handleOpenEdit = (id) => {
    fetchSoloInquiryData(id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSoloInquiryData("");
    setOpenEdit(false);
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeleteId("");
    setOpenDelete(false);
  };

  const onDelete = (id) => {
    deleteSoloInquiryData(id);
    handleCloseDelete();
  };

  return (
    <div className="inquiryA_wrapper">
      <div className="inquiryA_container">
        <h1>Inquiries</h1>
        <div className="inquiryA_content">
          <table id="inquiryTable">
            <tr>
              <th width="5%">SN</th>
              <th width="35%">Customer Name</th>
              <th width="25%">Email</th>
              <th width="20%">Contact Number</th>
              <th width="15%">Action</th>
            </tr>
            {Array.isArray(inquiryData) &&
              inquiryData.map((inquiry, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.phone_number}</td>
                    <td>
                      {inquiry.seen ? (
                        <MdRemoveRedEye
                          onClick={() => {
                            handleOpenEdit(inquiry.id);
                          }}
                          style={{ color: "green" }}
                        />
                      ) : (
                        <MdRemoveRedEye
                          onClick={() => {
                            handleOpenEdit(inquiry.id);
                          }}
                        />
                      )}
                      <MdDelete
                        onClick={() => {
                          handleOpenDelete(inquiry.id);
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
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={viewStyle}>
            <h2 id="modalTitle">Inquiry Detail</h2>
            <div className="modalContents">
              <TitleAndData title="Customer Name" data={soloInquiryData.name} />
              <TitleAndData title="Email" data={soloInquiryData.email} />
              <TitleAndData
                title="Contact Number"
                data={soloInquiryData.phone_number}
              />
              <TitleAndData title="Message" data={soloInquiryData.message} />
            </div>
            {soloInquiryData.seen ? (
              ""
            ) : (
              <BtnToClick
                title="Seen"
                customColor="success"
                onclicking={() => updateSoloInquiryData(soloInquiryData.id)}
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
            <h3>Are you sure want to delete this Inquiry Info?</h3>
            <div
              className="modalDeleteBTN"
              onClick={() => {
                onDelete(deleteId);
              }}
            >
              <BtnToClick title="Delete" customColor="delete" />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
