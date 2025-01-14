import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {ProjectColumns} from "./ProjectColumns";
import ProjectModal from "./ProjectModal";
import {getProjects} from "../../services/project/project";
import getCompletedURL from "../../libs/getCompleteURL";
import truncateString from "../../libs/truncateString";

export default function Projects() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  function getAllProjects() {
    getProjects({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allProjects = res.data.result.data;
      let tempItems = [];
      allProjects.forEach(project =>
        tempItems.push({
          title: project.title,
          thumb: <CImage align="center" src={getCompletedURL(project.thumb)} width={30} height={30}/>,
          img: <CImage align="center" src={getCompletedURL(project.img)} width={30} height={30}/>,
          services: project.services,
          industry: project.industry,
          platform: project.platform,
          client: truncateString(project.client, 30),
          overview: truncateString(project.overview, 50),
          link: project.link,
          team: project.team.join(","),
          duration: project.duration,
          stacks: project.stacks.join(","),
          result: truncateString(project.result, 50),
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={project} type="project" statusChange={statusChanged} setStatusChanged={setStatusChanged}/>,
          _cellProps: {class: {scope: 'row'}},
          _props: {color: 'default'},
        })
      )
      setItems(tempItems);
    })
  }

  const handleNew = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    if (statusChanged) {
      getAllProjects();
    }
    setStatusChanged(false);
  }, [statusChanged]);


  return (
    <div className="border border-dark border-1 rounded p-3">
      <div className="d-flex justify-content-end align-items-center">
        <CButton color="primary" onClick={handleNew}>Add New Project</CButton>
      </div>
      <InfoTable columns={ProjectColumns} items={items}/>
      <ProjectModal visible={visible} setVisible={setVisible} statusChanged={statusChanged}
                    setStatusChanged={setStatusChanged}/>
    </div>
  )
}
