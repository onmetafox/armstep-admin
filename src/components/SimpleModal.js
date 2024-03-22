import React from 'react';
import {
  CButton, CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import {removeCategory} from "../services/category/category";
import {removeProject} from "../services/project/project";
import {removeReview} from "../services/review/review";
import {removeTeam} from "../services/team/team";
import {removeService} from "../services/service/service";
import {removeTechnology} from "../services/technology/technology";

export default function SimpleModal(props) {

  const removeConfirmed = () => {
    try {
      if (props.type === "category") {
        removeCategory(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        });
      } else if (props.type === "project") {
        removeProject(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        })
      } else if (props.type === "review") {
        removeReview(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        })
      } else if (props.type === "team") {
        removeTeam(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        })
      } else if (props.type === "service") {
        removeService(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        })
      } else if (props.type === "technology") {
        removeTechnology(props.id).then(res => {
          props.setShow(false);
          console.log(res);
          window.location.reload();
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CModal
      visible={props.show}
      onClose={() => props.setShow(false)}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader onClose={() => props.setShow(false)}>
        <CModalTitle id="LiveDemoExampleLabel">
          Confirm
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you going to remove this item?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setShow(false)}>
          No
        </CButton>
        <CButton color="danger" onClick={removeConfirmed}>Yes</CButton>
      </CModalFooter>
    </CModal>
  )
}
