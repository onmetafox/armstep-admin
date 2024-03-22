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
  CModalTitle,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import {cilXCircle} from "@coreui/icons";
import {MultiSelect} from "react-multi-select-component";

import {getCategories} from "../../services/category/category";
import getCompletedURL from "../../libs/getCompleteURL";
import {createTechnology, techFileUpload, updateTechnology} from "../../services/technology/technology";

export default function TechnologyModal(props) {

  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [logo, setLogo] = useState(props.data ? props.data.logo : "");
  const [logoFile, setLogoFile] = useState(null);
  const [categories, setCategories] = useState(props.data ? props.data.category : []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [entireCategories, setEntireCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    getCategories().then(res => {
      const allCategories = res.data.result.data;
      setEntireCategories(allCategories);
      if (allCategories) {
        setCategoryOptions(allCategories.map(item => (
            {
              label: item.title,
              value: item.title
            }
          ))
        )
        if (props.data) {
          setSelectedCategories(props.data.category.map(item => ({
            label: item.title,
            value: item.title
          })))
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCategories) {
      const tempCategories = selectedCategories.map(item => {
        return entireCategories.find(category => category.title === item.value);
      })
      setCategories(tempCategories)
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (logoFile) {
      const formData = new FormData();
      formData.append("file", logoFile);
      try {
        techFileUpload(formData).then(res => {
          setLogo(res.data.data)
          setLogoFile(null);
          document.getElementById("formLogoFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [logoFile]);

  const handleSave = () => {
    if (title !== "" && logo !== "" && categories !== []) {
      if (props.data) {
        try {
          updateTechnology(props.data._id, {
            title,
            logo,
            category: categories.map(item => item._id),
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
          createTechnology({
            title,
            logo,
            category: categories.map(item => item._id),
            status: 1,
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

  const handleIcon = (e) => {
    setLogoFile(e.target.files[0])
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
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Technology" : "New Technology"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input title" value={title}
                          onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Icon</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formLogoFile" onChange={handleIcon}/>
              {logo ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={getCompletedURL(logo)} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setLogo("")}
                         className="text-danger fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Category</CFormLabel>
              <MultiSelect
                options={categoryOptions}
                value={selectedCategories}
                onChange={setSelectedCategories}
                labelledBy="Select"
              />
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
