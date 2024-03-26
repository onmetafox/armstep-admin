import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {ServiceColumns} from "./ServiceColumns";
import ServiceModal from "./ServiceModal";
import {getServices} from "../../services/service/service";
import getCompletedURL from "../../libs/getCompleteURL";
import truncateString from "../../libs/truncateString";

export default function Services() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  };

  const getAllServices = () => {
    getServices({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allServices = res.data.result.data;
      let tempItems = [];
      allServices.forEach(service =>
        tempItems.push({
          icon: <CImage align="center" src={getCompletedURL(service.icon)} width={30} height={30}/>,
          title: service.title,
          subtitle: service.subtitle,
          intro: truncateString(service.intro, 50),
          detail: truncateString(service.detail, 50),
          content: truncateString(service.content, 50),
          subcontent: truncateString(service.subcontent, 50),
          category: service.category.map(item => item.title).join(","),
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={service} type="service" statusChange={statusChanged} setStatusChanged={setStatusChanged}/>,
          _cellProps: {class: {scope: 'row'}},
          _props: {color: 'default'},
        })
      )
      setItems(tempItems);
    })
  }

  useEffect(() => {
    getAllServices();
  }, []);

  useEffect(() => {
    if (statusChanged) {
      getAllServices();
    }
    setStatusChanged(false);
  }, [statusChanged]);

  return (
    <div className="border border-dark border-1 rounded p-3">
      <div className="d-flex justify-content-end align-items-center">
        <CButton color="primary" onClick={handleNew}>Add New Service</CButton>
      </div>
      <InfoTable columns={ServiceColumns} items={items}/>
      <ServiceModal visible={visible} setVisible={setVisible} statusChanged={statusChanged}
                    setStatusChanged={setStatusChanged}/>
    </div>
  )
}
