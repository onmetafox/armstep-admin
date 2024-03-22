import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {getTeams} from "../../services/team/team";
import {TeamColumns} from "./TeamColumns";
import TeamModal from "./TeamModal";
import TableCellStacks from "./TableCellStacks";
import getCompletedURL from "../../libs/getCompleteURL";

export default function Teams() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    getTeams({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allTeams = res.data.result.data;
      let tempItems = [];
      allTeams.forEach(team =>
        tempItems.push({
          name: team.name,
          role: team.role,
          avatar: <CImage align="center" src={getCompletedURL(team.imgUrl)} width={30} height={30}/>,
          upwork: team.upwork,
          linkedin: team.linkedin,
          contra: team.contra,
          about: team.about,
          stacks: <TableCellStacks stacks={team.stacks}/>,
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={team} type="team"/>,
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
        <CButton color="primary" onClick={handleNew}>Add New Team</CButton>
      </div>
      <InfoTable columns={TeamColumns} items={items}/>
      <TeamModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
