import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import TableCellIcons from "../../components/TableCellIcons";
import {CategoryColumns} from "./categoryColumns";
import {getCategories} from "../../services/category/category";
import Modal from "../../components/Modal";

export default function Categories() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  }

  function getAllCategories() {
    getCategories({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allCategories = res.data.result.data;
      let tempItems = [];
      allCategories.forEach(category =>
        tempItems.push({
          title: category.title,
          detail: category.detail,
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          icons: <TableCellIcons icons={category.icons}/>,
          action: <ActionButtons record={category} type="category" statusChanged={statusChanged}
                                 setStatusChanged={setStatusChanged}/>,
          _cellProps: {class: {scope: 'row'}},
          _props: {color: 'default'},
        })
      )
      setItems(tempItems);
    })
  }

  useEffect(() => {
    if (statusChanged) {
      getAllCategories();
    }
    setStatusChanged(false);
  }, [statusChanged]);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="border border-dark border-1 rounded p-3">
      <div className="d-flex justify-content-end align-items-center">
        <CButton color="primary" onClick={handleNew}>Add New Category</CButton>
      </div>
      <InfoTable columns={CategoryColumns} items={items}/>
      <Modal visible={visible} setVisible={setVisible} statusChanged={statusChanged}
             setStatusChanged={setStatusChanged}/>
    </div>
  )
}
