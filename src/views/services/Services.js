import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import defaultIcon from "../../assets/images/default.png";
import {ServiceColumns} from "./ServiceColumns";
import ServiceModal from "./ServiceModal";
import {getServices} from "../../services/service/service";

export default function Services() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getServices({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allServices = res.data.result.data;
      let tempItems = [];
      allServices.forEach(service =>
        tempItems.push({
          icon: <CImage align="center" src={defaultIcon} width={30} height={30}/>,
          title: service.title,
          subtitle: service.subtitle,
          intro: service.intro,
          detail: service.detail,
          content: service.content,
          subcontent: service.subcontent,
          category: "",
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={service} type="service"/>,
          _cellProps: {class: {scope: 'row'}},
          _props: {color: 'default'},
        })
      )
      setItems(tempItems);
    })
  }, []);

  return (
    <div className="border border-dark border-1 rounded p-3">
      <div className="d-flex justify-content-end align-items-center">
        <CButton color="primary" onClick={handleNew}>Add New Service</CButton>
      </div>
      <InfoTable columns={ServiceColumns} items={items}/>
      <ServiceModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
