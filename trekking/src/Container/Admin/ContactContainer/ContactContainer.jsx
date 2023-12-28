import React, { useEffect, useState } from "react";
import "./ContactContainer.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { MdModeEditOutline } from "react-icons/md";
import { MdLocationOn, MdCall, MdEmail } from "react-icons/md";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { getAllData, updateData } from "../../../constants/apiService";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--dim-bg)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ContactContainer() {
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [contactData, setContactData] = useState({
    contact_number: "",
    address: "",
    email: "",
  });

  const fetchContactData = async () => {
    try {
      const url = "/contact/1";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("result", result.data.data);
        setContactData({
          contact_number: result.data.data.contact_number,
          address: result.data.data.address,
          email: result.data.data.email,
        });
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const updateContactData = async () => {
    try {
      const url = "/contact/1";
      const result = await updateData(url, contactData);
      if (result.status === 200 || result.status === 201) {
        console.log("Updated Success", result);
        toast.success("Contact updated");
        fetchContactData();
        handleCloseEdit();
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  //this will open the modal and set name for the Modal title
  const handleOpenEdit = (pointer) => {
    setEditId(pointer);
    setOpenEdit(true);
  };

  //this will close the modal and set name for the Modal title to Empty
  const handleCloseEdit = () => {
    setEditId("");
    setOpenEdit(false);
  };

  const onChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contactA_wrapper">
      <div className="contactA_container">
        <h2>CONTACT INFO</h2>
        <div className="contactA_content">
          <div className="cac_item">
            <div className="cac_itemLeft">
              <MdLocationOn />
            </div>
            <div className="cac_itemMid">
              {contactData ? contactData.address : "Loading ..."}
            </div>
            <div className="cac_itemRight">
              <MdModeEditOutline
                onClick={() => {
                  handleOpenEdit("address");
                }}
              />
            </div>
          </div>

          <div className="cac_item">
            <div className="cac_itemLeft">
              <MdCall />
            </div>
            <div className="cac_itemMid">
              {contactData ? contactData.contact_number : "Loading ..."}
            </div>
            <div className="cac_itemRight">
              <MdModeEditOutline
                onClick={() => {
                  handleOpenEdit("contact_number");
                }}
              />
            </div>
          </div>

          <div className="cac_item">
            <div className="cac_itemLeft">
              <MdEmail />
            </div>
            <div className="cac_itemMid">
              {contactData ? contactData.email : "Loading ..."}
            </div>
            <div className="cac_itemRight">
              <MdModeEditOutline
                onClick={() => {
                  handleOpenEdit("email");
                }}
              />
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Edit {editId.charAt(0).toUpperCase() + editId.slice(1)}</h3>
            <div id="modalInput">
              <input
                type="text"
                name={editId}
                onChange={onChange}
                value={contactData[editId]}
              />
              <BtnToClick title="Update" onclicking={updateContactData} />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
