import React, {useEffect, useState} from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel, CFormTextarea, CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {cilXCircle} from "@coreui/icons";
import {createCategory, fileUpload, updateCategory} from "../services/category/category";
import getCompletedURL from "../libs/getCompleteURL";

export default function Modal(props) {

  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [detail, setDetail] = useState(props.data ? props.data.detail : "");
  const [iconTitle, setIconTitle] = useState("");
  const [file, setFile] = useState(null);
  const [finalFiles, setFinalFiles] = useState(props.data ? props.data.icons : []);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        fileUpload(formData).then(res => {
          setFinalFiles([
            ...finalFiles,
            {
              title: iconTitle,
              icon: res.data.data
            }
          ]);
          setFile(null);
          setIconTitle("");
          document.getElementById("formFileMultiple").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [file]);

  const handleFiles = (e) => {
    if (iconTitle) {
      setFile(e.target.files[0])
    }
  }

  const handleSave = () => {
    if (title !== "" && detail !== "") {
      if (props.data) {
        try {
          updateCategory(props.data._id, {
            title: title,
            detail: detail,
            icons: finalFiles,
            status: 1
          }).then(res => {
            console.log(res.message);
            props.setVisible(false);
            window.location.reload();
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          createCategory({
            title: title,
            detail: detail,
            icons: finalFiles,
            status: 1
          }).then(res => {
            console.log(res.message);
            props.setVisible(false);
            window.location.reload();
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  const handleFileRemove = (file) => {
    setFinalFiles(finalFiles.filter(item => item.title !== file.title));
  }

  return (
    <>
      <CModal
        alignment="center"
        visible={props.visible}
        onClose={() => props.setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Category" : "New Category"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input title" value={title}
                          onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Details</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={detail}
                             onChange={(e) => setDetail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Icons</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Icon title" value={iconTitle}
                          className="mb-3" required
                          onChange={(e) => setIconTitle(e.target.value)}/>
              <CFormInput type="file" className="mb-3" id="formFileMultiple" onChange={handleFiles}/>
              <div className="d-flex justify-content-start align-items-center w-100">
                {finalFiles && finalFiles.map((file, index) => (
                  <div key={index} className="d-flex flex-column justify-content-center align-items-center mx-1">
                    <div className="fileImage">
                      <CImage align="center" src={getCompletedURL(file.icon)} width={30} height={30}/>
                      {props.data ? <CIcon icon={cilXCircle} onClick={() => handleFileRemove(file)}
                                           className="text-danger fileRemoveBtn"/> : ""}
                    </div>
                    <CFormLabel htmlFor="floatingInput" className="small">{file.title}</CFormLabel>
                  </div>
                ))}
              </div>

            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => props.setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSave}>Save</CButton>
        </CModalFooter>
      </CModal>
    </>
  )

}
