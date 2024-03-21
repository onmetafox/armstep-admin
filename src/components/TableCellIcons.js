import React from 'react';
import {CFormLabel, CImage} from "@coreui/react";
import defaultIcon from "../assets/images/default.png";

export default function TableCellIcons (props) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {props.icons && props.icons.map((file, index) => (
        <div key={index} className="d-flex flex-column justify-content-center align-items-center mx-1">
          <CImage align="center" src={defaultIcon} width={30} height={30}/>
          <CFormLabel htmlFor="floatingInput" className="small text-secondary">{file.title}</CFormLabel>
        </div>
      ))}
    </div>
  )
}