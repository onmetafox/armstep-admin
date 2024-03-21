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
import defaultIcon from "../../assets/images/default.png"
import {createProject, projectFileUpload, updateProject} from "../../services/project/project";

function beautifulArray(value) {
  const array = value.split(",").filter(item => item !== "")
  return array.map(item => item.trim());
}

export default function ProjectModal(props) {

  const [title, setTitle] = useState(props.data ? props.data.title : "");
  const [thumb, setThumb] = useState(props.data ? props.data.thumb : "");
  const [img, setImg] = useState(props.data ? props.data.img : "");
  const [services, setServices] = useState(props.data ? props.data.services : "");
  const [industry, setIndustry] = useState(props.data ? props.data.industry : "");
  const [platform, setPlatform] = useState(props.data ? props.data.platform : "");
  const [overview, setOverview] = useState(props.data ? props.data.overview : "");
  const [link, setLink] = useState(props.data ? props.data.link : "");
  const [team, setTeam] = useState(props.data ? props.data.team.join(",") : "");
  const [duration, setDuration] = useState(props.data ? props.data.duration : "");
  const [stacks, setStacks] = useState(props.data ? props.data.stacks.join(",") : "");
  const [result, setResult] = useState(props.data ? props.data.result : "");
  const [client, setClient] = useState(props.data ? props.data.client : "");
  const [thumbFile, setThumbFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (thumbFile) {
      const formData = new FormData();
      formData.append("file", thumbFile);
      try {
        projectFileUpload(formData).then(res => {
          setThumb(res.data.data.path)
          setThumbFile(null);
          document.getElementById("formThumbFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [thumbFile]);

  useEffect(() => {
    if (imgFile) {
      const formData = new FormData();
      formData.append("file", imgFile);
      try {
        projectFileUpload(formData).then(res => {
          setImg(res.data.data.path)
          setImgFile(null);
          document.getElementById("formImgFile").value = "";
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [imgFile]);

  const handleSave = () => {
    if (title !== "" && thumb !== "" && img !== "" && services !== "" && industry !== "" && platform !== "" && overview !== "" && link !== "" && team !== "" && duration !== "" && stacks !== "" && result !== "" && client !== "") {
      if (props.data) {
        try {
          updateProject(props.data._id, {
            title,
            thumb,
            img,
            services,
            industry,
            platform,
            client,
            overview,
            link,
            team: beautifulArray(team),
            duration,
            stacks: beautifulArray(stacks),
            result,
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
          createProject({
            title,
            thumb,
            img,
            services,
            industry,
            platform,
            client,
            overview,
            link,
            team: beautifulArray(team),
            duration,
            stacks: beautifulArray(stacks),
            result,
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

  const handleThumb = (e) => {
    setThumbFile(e.target.files[0])
  }

  const handleImg = (e) => {
    setImgFile(e.target.files[0])
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
          <CModalTitle id="VerticallyCenteredExample">{props.data ? "Edit Project" : "New Project"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input title" value={title}
                          onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Thumb</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formThumbFile" onChange={handleThumb}/>
              {thumb ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={defaultIcon} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setThumb("")}
                         className="fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFileMultiple">Img</CFormLabel>
              <CFormInput type="file" className="mb-3" id="formImgFile" onChange={handleImg}/>
              {img ? <div className="d-flex justify-content-start align-items-center mx-1">
                <div className="fileImage">
                  <CImage align="center" src={defaultIcon} width={30} height={30}/>
                  <CIcon icon={cilXCircle} onClick={() => setImg("")}
                         className="fileRemoveBtn"/>
                </div>
              </div> : ""}
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Services</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input Services" value={services}
                          onChange={(e) => setServices(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Industry</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input industry" value={industry}
                          onChange={(e) => setIndustry(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Platform</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input platform" value={platform}
                          onChange={(e) => setPlatform(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Client</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input platform" value={client}
                          onChange={(e) => setClient(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Overview</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input overview" value={overview}
                          onChange={(e) => setOverview(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Link</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input link" value={link}
                          onChange={(e) => setLink(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Team</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input team" value={team}
                          onChange={(e) => setTeam(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Duration</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input duration" value={duration}
                          onChange={(e) => setDuration(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Stacks</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input stacks" value={stacks}
                          onChange={(e) => setStacks(e.target.value)}/>
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Result</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="Input result" value={result}
                          onChange={(e) => setResult(e.target.value)}/>
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
