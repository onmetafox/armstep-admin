import React, {useEffect, useState} from 'react';
import {CButton, CFormSwitch, CImage} from "@coreui/react";

import InfoTable from "../../components/InfoTable";
import ActionButtons from "../../components/ActionButtons";
import {ReviewColumns} from "./ReviewColumns";
import {getReviews} from "../../services/review/review";
import ReviewModal from "./ReviewModal";
import getCompletedURL from "../../libs/getCompleteURL";

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleNew = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    getReviews({
      page: 1,
      pageSize: 20
    }).then(res => {
      const allReviews = res.data.result.data;
      let tempItems = [];
      allReviews.forEach(review =>
        tempItems.push({
          logo: <CImage align="center" src={getCompletedURL(review.logo)} width={30} height={30}/>,
          user: review.user,
          company: review.company,
          review: review.review,
          name: review.name,
          role: review.role,
          profile: review.profile,
          status: <div className="d-flex justify-content-center align-items-center"><CFormSwitch
            id="formSwitchCheckDefault" disabled/></div>,
          action: <ActionButtons record={review} type="review"/>,
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
        <CButton color="primary" onClick={handleNew}>Add New Review</CButton>
      </div>
      <InfoTable columns={ReviewColumns} items={items}/>
      <ReviewModal visible={visible} setVisible={setVisible}/>
    </div>
  )
}
