import React from "react";
import {CFormLabel, CImage} from "@coreui/react";
import getCompletedURL from "../../libs/getCompleteURL";

export default function TableCellStacks (props) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      {props.stacks && props.stacks.map((file, index) => (
        <div key={index} className="d-flex flex-column justify-content-center align-items-center mx-1">
          <CImage align="center" src={getCompletedURL(file.icon)} width={30} height={30}/>
          <CFormLabel htmlFor="floatingInput" className="small text-secondary">{file.heading}</CFormLabel>
        </div>
      ))}
    </div>
  )
}
