import React, {useEffect, useState} from 'react';
import {CFormSwitch} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {ContactColumns} from "./contactColumns";
import ContactModal from "./ContactModal";
import {getContacts} from "../../services/contact/contact";

export default function Contacts() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getContacts({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allContacts = res.data.result.data;
      let tempItems = [];
      allContacts.forEach(contact =>
        tempItems.push({
          name: contact.name,
          detail: contact.phone,
          email: contact.email,
          duration: contact.duration,
          service: contact.service,
          stack: contact.stack,
          about: contact.about,
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons category={contact}/>,
          _cellProps: {class: {scope: 'row'}},
          _props: {color: 'default'},
        })
      )
      setItems(tempItems);
    })
  }, []);

  return (
    <div className="border border-dark border-1 rounded p-4">
      <InfoTable columns={ContactColumns} items={items}/>
      <ContactModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
