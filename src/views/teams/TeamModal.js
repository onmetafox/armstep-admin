import React, {useEffect, useState} from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel, CFormTextarea,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {cilXCircle} from "@coreui/icons";

import {createTeam, teamFileUpload, updateTeam} from "../../services/team/team";
import getCompletedURL from "../../libs/getCompleteURL";

export default function TeamModal(props) {

  const [name, setName] = useState(props.data ? props.data.name : "");
  const [role, setRole] = useState(props.data ? props.data.role : "");
  const [imgUrl, setImgUrl] = useState(props.data ? props.data.imgUrl : "");
  const [upwork, setUpwork] = useState(props.data ? props.data.upwork : "");
  const [linkedin, setLinkedin] = useState(props.data ? props.data.linkedin : "");
  const [contra, setContra] = useState(props.data ? props.data.contra : "");
  const [about, setAbout] = useState(props.data ? props.data.about : "");
  const [stacks, setStacks] = useState(props.data ? props.data.stacks : []);
  const [avatarFile, setAvatarFile] = useState(null);
  const [stackHeading, setStackHeading] = useState("");
  const [stackIconFile, setStackIconFile] = useState(null);

  useEffect(() => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append("file", avatarFile);
      try {
        teamFileUpload(formData).then(res => {
          setImgUrl(res.data.data)
          setAvatarFile(null);
          document.getElementById("formAvatarFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [avatarFile]);

  useEffect(() => {
    if (stackHeading) {
      const formData = new FormData();
      formData.append("file", stackIconFile);
      try {
        teamFileUpload(formData).then(res => {
          setStacks([
            ...stacks,
            {
              heading: stackHeading,
              icon: res.data.data
            }
          ]);
          setStackIconFile(null);
          setStackHeading("");
          document.getElementById("formStackFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [stackIconFile]);

  const handleSave = () => {
    if (name !== "" && role !== "" && imgUrl !== "" && upwork !== "" && linkedin !== "" && contra !== "" && about !== "" && stacks !== []) {
      if (props.data) {
        try {
          updateTeam(props.data._id, {
            name,
            role,
            imgUrl,
            upwork,
            linkedin,
            contra,
            about,
            stacks,
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
          createTeam({
            name,
            role,
            imgUrl,
            upwork,
            linkedin,
            contra,
            about,
            stacks,
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

  const handleAvatar = (e) => {
    setAvatarFile(e.target.files[0])
  }

  const handleStack = (e) => {
    setStackIconFile(e.target.files[0]);
  }

  const handleFileRemove = (file) => {
    setStacks(stacks.filter(item => item.heading !== file.heading));
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
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Team" : "New Team"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Name" value={name}
                          onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Role</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Role" value={role}
                          onChange={(e) => setRole(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Avatar</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formAvatarFile" onChange={handleAvatar}/>
              {imgUrl ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={getCompletedURL(imgUrl)} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setImgUrl("")}
                         className="text-danger fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Upwork</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Upwork Link" value={upwork}
                          onChange={(e) => setUpwork(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Linkedin</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Linkedin Link" value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Contra</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Contra" value={contra}
                          onChange={(e) => setContra(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">About</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={about} placeholder="Input About Text"
                             onChange={(e) => setAbout(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Stacks</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Stack Heading" value={stackHeading}
                          className="mb-3" required
                          onChange={(e) => setStackHeading(e.target.value)}/>
              <CFormInput type="file" className="mb-3" id="formStackFile" onChange={handleStack}/>
              <div className="d-flex justify-content-start align-items-center w-100">
                {stacks && stacks.map((file, index) => (
                  <div key={index} className="d-flex flex-column justify-content-center align-items-center mx-1">
                    <div className="fileImage">
                      <CImage align="center" src={getCompletedURL(file.icon)} width={30} height={30}/>
                      <CIcon icon={cilXCircle} onClick={() => handleFileRemove(file)}
                             className="text-danger fileRemoveBtn"/>
                    </div>
                    <CFormLabel htmlFor="floatingInput" className="small">{file.heading}</CFormLabel>
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
