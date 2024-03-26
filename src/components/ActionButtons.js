import React, {useEffect, useState} from "react";
import {CButton} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilDelete, cilSave} from "@coreui/icons";
import SimpleModal from "./SimpleModal";
import Modal from "./Modal";
import ProjectModal from "../views/projects/ProjectModal";
import ReviewModal from "../views/reviews/ReviewModal";
import TeamModal from "../views/teams/TeamModal";
import ServiceModal from "../views/services/ServiceModal";
import TechnologyModal from "../views/technologies/TechnologyModal";

export default function ActionButtons(props) {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalSection, setModalSection] = useState(<></>);

  useEffect(() => {
    if (props.type === "category") {
      setModalSection(<Modal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    } else if (props.type === "project") {
      setModalSection(<ProjectModal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    } else if (props.type === "review") {
      setModalSection(<ReviewModal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    } else if (props.type === "service") {
      setModalSection(<ServiceModal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    } else if (props.type === "team") {
      setModalSection(<TeamModal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    } else if (props.type === "technology") {
      setModalSection(<TechnologyModal visible={visible} setVisible={setVisible} data={props.record} statausChanged={props.statusChanged} setStatusChanged={props.setStatusChanged}/>);
    }
  }, [visible, setVisible, show, setShow]);

  const handleRemove = () => {
    setShow(true);
  }

  const handleEdit = () => {
    setVisible(true)
  }

  return (
    <div className="d-flex justify-content-center">
      <CButton color="secondary" size="sm" className="mx-2" onClick={handleEdit}>
        <CIcon icon={cilSave}/>
      </CButton>
      <CButton color="danger" size="sm" onClick={handleRemove}>
        <CIcon icon={cilDelete}/>
      </CButton>
      {modalSection}
      <SimpleModal show={show} setShow={setShow} id={props.record._id} type={props.type} statusChanged={props.statusChanged}
                   setStatusChanged={props.setStatusChanged}/>
    </div>
  )
}
