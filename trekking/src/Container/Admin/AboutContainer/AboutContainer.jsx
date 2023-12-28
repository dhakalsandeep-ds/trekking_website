import React, { useEffect, useState } from "react";
import "./AboutContainer.css";
import { getAllData, updateData } from "../../../constants/apiService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import HTMLReactParser from "html-react-parser";
import BtnToClick from "../../../Components/BtnToClick/BtnToClick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AboutContainer() {
  const [editContent, setEditContent] = useState(false);
  const [ckEditorContent, setCkEditorContent] = useState("");

  const fetchAbout = async () => {
    try {
      const url = "/about/1";
      const result = await getAllData(url);

      if (result.status === 200) {
        const resData = result.data.data.description;
        setCkEditorContent(resData);
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
    fetchAbout();
  }, []);

  const editAbout = () => {
    if (editContent) {
      setEditContent(false);
    } else {
      setEditContent(true);
    }
  };

  const onSubmitClick = async (e) => {
    e.preventDefault();
    const url = "/about";
    console.log(ckEditorContent,"..............")
    fetch("http://localhost:3000/",{
      method:"GET"
    }).then((res)=>{
      console.log("sucess")
      console.log(res.data)
    }).catch((error)=>{
      console.log("error failed")
    })
    // let menuItemData = new FormData();
    // menuItemData.append("description", ckEditorContent);
   
    // try {
    //   const result = await updateData(url, menuItemData);
    //   if (result.status === 201) {
    //     toast.success("About Us updated successfully.");
    //     console.log(result);
    //   } else {
    //     toast.error("Some error occurred");
    //     console.log(result);
    //   }
    // } catch (err) {
    //   toast.error("Some error occurred");
    //   console.log(err);
    // }
    setEditContent(false);
  };

  return (
    <div className="aboutA_wrapper">
      <div className="aboutA_container">
        <h1>ABOUT</h1>
        <ToastContainer />
        <div
          className="aboutA_btn"
          onClick={() => {
            editAbout();
          }}
        >
          <BtnToClick title={editContent ? "Cancel" : "Edit"} />
        </div>

        <div className="aboutA_content">
          {!editContent ? (
            <div className="viewAboutContent">
              {HTMLReactParser(ckEditorContent)}
            </div>
          ) : (
            <div className="editAboutContent">
              <CKEditor
                editor={ClassicEditor}
                id="description"
                data={ckEditorContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setCkEditorContent(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              <div className="aboutA_btn" onClick={onSubmitClick}>
                <BtnToClick title="Update" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
