import React, {useEffect, useState} from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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

import {projectFileUpload} from "../../services/project/project";
import {getCategories} from "../../services/category/category";
import {createService, updateService} from "../../services/service/service";
import getCompletedURL from "../../libs/getCompleteURL";
import {useAlertContext} from "../../providers/alertContext";

export default function ServiceModal(props) {
  const {setMessage, setAlertVisible} = useAlertContext();
  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [subTitle, setSubTitle] = useState(props.data ? props.data.subtitle : "");
  const [icon, setIcon] = useState(props.data ? props.data.icon : "");
  const [intro, setIntro] = useState(props.data ? props.data.intro : "");
  const [detail, setDetail] = useState(props.data ? props.data.detail : "");
  const [content, setContent] = useState(props.data ? props.data.content : "");
  const [subContent, setSubContent] = useState(props.data ? props.data.subcontent : "");
  const [iconFile, setIconFile] = useState(null);
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
    if (iconFile) {
      const formData = new FormData();
      formData.append("file", iconFile);
      try {
        projectFileUpload(formData).then(res => {
          setIcon(res.data.data)
          setIconFile(null);
          document.getElementById("formIconFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [iconFile]);

  const handleInitServiceDialog = () => {
    setAlertVisible(true);
    setTitle("");
    setSubTitle("");
    setIcon("");
    setIntro("");
    setDetail("");
    setContent("");
    setSubContent("");
    setCategories([]);
    setIconFile(null);
    setSelectedCategories([]);
    props.setVisible(false);
    props.setStatusChanged(true);
  }

  const handleSave = () => {
    if (title !== "" && subTitle !== "" && icon !== "" && intro !== "" && detail !== "" && content !== "" && subContent !== "" && categories !== []) {
      if (props.data) {
        try {
          updateService(props.data._id, {
            title,
            subtitle: subTitle,
            icon,
            intro,
            detail,
            content,
            subcontent: subContent,
            category: categories.map(item => item._id),
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
          createService({
            title,
            subtitle: subTitle,
            icon,
            intro,
            detail,
            content,
            subcontent: subContent,
            category: categories.map(item => item._id),
            status: 1,
          }).then(res => {
            setMessage(res.data.msg);
            handleInitServiceDialog();
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  const handleIcon = (e) => {
    setIconFile(e.target.files[0])
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
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Service" : "New Service"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input title" value={title}
                          onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">SubTitle</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input title" value={subTitle}
                          onChange={(e) => setSubTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Icon</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formIconFile" onChange={handleIcon}/>
              {icon ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={getCompletedURL(icon)} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setIcon("")}
                         className="text-danger fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Intro</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={intro}
                             onChange={(e) => setIntro(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Detail</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={detail}
                             onChange={(e) => setDetail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Content</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={content}
                             onChange={(e) => setContent(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">SubContent</CFormLabel>
              <CFormTextarea id="exampleFormControlTextarea1" rows={3} value={subContent}
                             onChange={(e) => setSubContent(e.target.value)}/>
            </div>
            <div className="mb-3">
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
