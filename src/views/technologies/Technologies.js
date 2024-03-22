import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import getCompletedURL from "../../libs/getCompleteURL";
import {getTechnologies} from "../../services/technology/technology";
import {TechnologyColumns} from "./TechnologyColumns";
import TechnologyModal from "./TechnologyModal";

export default function Services() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getTechnologies({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allTechs = res.data.result.data;
      let tempItems = [];
      allTechs.forEach(tech =>
        tempItems.push({
          logo: <CImage align="center" src={getCompletedURL(tech.logo)} width={30} height={30}/>,
          title: tech.title,
          category: tech.category.map(item => item.title).join(","),
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={tech} type="technology"/>,
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
        <CButton color="primary" onClick={handleNew}>Add New Technology</CButton>
      </div>
      <InfoTable columns={TechnologyColumns} items={items}/>
      <TechnologyModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
