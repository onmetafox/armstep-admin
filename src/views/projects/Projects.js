import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {ProjectColumns} from "./ProjectColumns";
import ProjectModal from "./ProjectModal";
import {getProjects} from "../../services/project/project";
import defaultIcon from "../../assets/images/default.png";

export default function Projects() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    getProjects({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allProjects = res.data.result.data;
      let tempItems = [];
      allProjects.forEach(project =>
        tempItems.push({
          title: project.title,
          thumb: <CImage align="center" src={defaultIcon} width={30} height={30}/>,
          img: <CImage align="center" src={defaultIcon} width={30} height={30}/>,
          services: project.services,
          industry: project.industry,
          platform: project.platform,
          overview: project.overview,
          link: project.link,
          team: project.team.join(","),
          duration: project.duration,
          stacks: project.stacks.join(","),
          result: project.result,
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={project} type="project"/>,
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
        <CButton color="primary" onClick={handleNew}>Add New Project</CButton>
      </div>
      <InfoTable columns={ProjectColumns} items={items}/>
      <ProjectModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
