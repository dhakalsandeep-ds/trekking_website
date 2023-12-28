import React, { useEffect, useState } from "react";
import "./SocialMediaContainer.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { MdModeEditOutline } from "react-icons/md";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { Link } from "react-router-dom";
import { getAllData, updateData } from "../../../constants/apiService";
import MediaIcon from "../../../Components/MediaIcon/MediaIcon";
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

export default function SocialMediaContainer() {
  const [openEdit, setOpenEdit] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState();
  const [soloSocialMediaData, setSoloSocialMediaData] = useState();

  const fetchSocialMediaData = async () => {
    try {
      const url = "/social";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("result socail", result.data.data.results);
        setSocialMediaData(result.data.data.results);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const fetchSoloSocialMediaData = async (social_id) => {
    try {
      const url = "/social/" + social_id;
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("result solo", result.data.data);
        setSoloSocialMediaData(result.data.data);
      } else {
        toast.error("Some error occurred");
        console.log(result);
      }
    } catch (err) {
      toast.error("Some error occurred");
      console.log(err);
    }
  };

  const updateSoloSocialMediaData = async (social_id) => {
    try {
      const url = "/social/" + social_id;
      const result = await updateData(url, soloSocialMediaData);
      if (result.status === 200 || result.status === 201) {
        fetchSocialMediaData();
        handleCloseEdit();
        toast.success("Link is updated");
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
    fetchSocialMediaData();
  }, []);

  const handleOpenEdit = (id) => {
    fetchSoloSocialMediaData(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSoloSocialMediaData("");
    setOpenEdit(false);
  };

  const onChange = (e) => {
    setSoloSocialMediaData({
      ...soloSocialMediaData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="socialMediaA_wrapper">
      <div className="socialMediaA_container">
        <h2>SOCIAL MEDIA INFO</h2>
        <div className="socialMediaA_content">
          {Array.isArray(socialMediaData) &&
            socialMediaData.map((data, i) => {
              return (
                <div className="smac_item" key={i}>
                  <div className="smac_itemLeft">
                    <MediaIcon iconName={data.platform} />
                  </div>
                  <div className="smac_itemMid">
                    <Link to={data.link} target="_blank">
                      {data.link}
                    </Link>
                  </div>
                  <div className="smac_itemRight">
                    <MdModeEditOutline
                      onClick={() => {
                        handleOpenEdit(data.id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Edit Modal */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>{soloSocialMediaData && soloSocialMediaData.platform} Link</h3>
            <div id="modalInput">
              <input
                type="text"
                name="link"
                value={soloSocialMediaData && soloSocialMediaData.link}
                onChange={onChange}
              />
              <BtnToClick
                title="Update"
                onclicking={() =>
                  updateSoloSocialMediaData(soloSocialMediaData.id)
                }
              />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
