import React, {useState} from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";

export default function ContactModal(props) {

  const [name, setName] = useState(props.data ? props.data.name : "");
  const [phone, setPhone] = useState(props.data ? props.data.phone : "");
  const [email, setEmail] = useState(props.data ? props.data.email : "");
  const [duration, setDuration] = useState(props.data ? props.data.duration : "");
  const [service, setService] = useState(props.data ? props.data.service : "");
  const [stack, setStack] = useState(props.data ? props.data.stack : "");
  const [about, setAbout] = useState(props.data ? props.data.about : "");

  const handleSave = () => {
    if (name !== "" && phone !== "" && email !== "" && duration !== "" && service !== "" && stack !== "" && about !== "") {
    }
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
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Contact" : "New Contact"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Name" value={name}
                          onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Phone Number" value={phone}
                          onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
              <CFormInput type="email" id="exampleFormControlInput1" placeholder="Input Email Address" value={email}
                          onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Duration</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Duration" value={duration}
                          onChange={(e) => setDuration(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Service</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Service" value={service}
                          onChange={(e) => setService(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Stack</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Stack" value={stack}
                          onChange={(e) => setStack(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">About</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={about}
                             onChange={(e) => setAbout(e.target.value)}/>
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
