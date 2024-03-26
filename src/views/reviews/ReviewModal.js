import React, {useEffect, useState} from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {cilXCircle} from "@coreui/icons";

import {createReview, reviewFileUpload, updateReview} from "../../services/review/review";
import getCompletedURL from "../../libs/getCompleteURL";
import {useAlertContext} from "../../providers/alertContext";

export default function ReviewModal(props) {
  const {setMessage, setAlertVisible} = useAlertContext();
  const [logo, setLogo] = useState(props.data ? props.data.logo : "");
  const [user, setUser] = useState(props.data ? props.data.user : "");
  const [company, setCompany] = useState(props.data ? props.data.company : "");
  const [review, setReview] = useState(props.data ? props.data.review : "");
  const [name, setName] = useState(props.data ? props.data.name : "");
  const [role, setRole] = useState(props.data ? props.data.role : "");
  const [profile, setProfile] = useState(props.data ? props.data.profile : "");
  const [logoFile, setLogoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (logoFile) {
      const formData = new FormData();
      formData.append("file", logoFile);
      try {
        reviewFileUpload(formData).then(res => {
          setLogo(res.data.data)
          setLogoFile(null);
          document.getElementById("formLogoFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [logoFile]);

  useEffect(() => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append("file", avatarFile);
      try {
        reviewFileUpload(formData).then(res => {
          setUser(res.data.data)
          setAvatarFile(null);
          document.getElementById("formAvatarFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [avatarFile]);

  const handleInitReviewDialog = () => {
    setAlertVisible(true);
    setLogo("");
    setUser("");
    setCompany("");
    setReview("");
    setName("");
    setRole("");
    setProfile("");
    setAvatarFile(null);
    setLogoFile(null);
    props.setVisible(false);
    props.setStatusChanged(true);
  }

  const handleSave = () => {
    if (logo !== "" && user !== "" && company !== "" && review !== "" && name !== "" && role !== "" && profile !== "") {
      if (props.data) {
        try {
          updateReview(props.data._id, {
            logo,
            user,
            company,
            review,
            name,
            role,
            profile,
            status: 1
          }).then(res => {
            setMessage(res.data.msg);
            setAlertVisible(true);
            props.setVisible(false);
            props.setStatusChanged(true);
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          createReview({
            logo,
            user,
            company,
            review,
            name,
            role,
            profile,
            status: 1
          }).then(res => {
            setMessage(res.data.msg);
            handleInitReviewDialog();
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  const handleLogo = (e) => {
    setLogoFile(e.target.files[0])
  }

  const handleAvatar = (e) => {
    setAvatarFile(e.target.files[0])
  }

  return (
    <>
      <CModal
        scrollable
        alignment="center"
        visible={props.visible}
        onClose={() => props.setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Review" : "New Review"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Logo</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formLogoFile" onChange={handleLogo}/>
              {logo ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={getCompletedURL(logo)} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setLogo("")}
                         className="text-danger fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">User</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formAvatarFile" onChange={handleAvatar}/>
              {user ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={getCompletedURL(user)} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setUser("")}
                         className="text-danger fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Company</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input company" value={company}
                          onChange={(e) => setCompany(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Review</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input review" value={review}
                          onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Full Name" value={name}
                          onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Role</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input role" value={role}
                          onChange={(e) => setRole(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Profile</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input profile" value={profile}
                          onChange={(e) => setProfile(e.target.value)}/>
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
