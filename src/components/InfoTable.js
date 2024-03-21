import React, {useState} from 'react';
import PropTypes from "prop-types";
import {CPagination, CPaginationItem, CTable} from "@coreui/react";
import {useLocation} from "react-router-dom";

export default function InfoTable(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/");
    const itemsPerPage = 10;

    const totalLength = props.items.length;
    const pageCount = Math.ceil(totalLength / itemsPerPage)
    const pageArray = Array.from({length: Math.ceil(totalLength / itemsPerPage)}, (_, i) => i + 1);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const validateIndex = index => index >= 0 && index <= pageCount;

    const prevPage = () => {
        if (validateIndex(startIndex - 3) && validateIndex(endIndex - 3)) {
            setStartIndex(startIndex - 3);
            setEndIndex(endIndex - 3);
            setCurrentPage(startIndex - 2);
        } else if (startIndex - 3 < 0) {
            setStartIndex(0);
            setEndIndex(3);
            setCurrentPage(1)
        }
    }

    const nextPage = () => {
        if (validateIndex(startIndex + 3) && validateIndex(endIndex + 3)) {
            setStartIndex(startIndex + 3);
            setEndIndex(endIndex + 3);
            setCurrentPage(startIndex + 4);
        } else if (endIndex + 3 > pageCount) {
            setEndIndex(pageCount);
            setStartIndex(pageCount - 3);
            setCurrentPage(pageCount - 2)
        }
    }

    const handleClick = (pageNum) => {
        setCurrentPage(pageNum)
    }

    return (
        <>
            <CTable striped columns={props.columns} items={props.items} tableHeadProps={{color: 'dark'}}
                    captionTop={`List of ${pathArray[1]}`} responsive="md"/>
            <CPagination align="end" aria-label="Page navigation example">
                <CPaginationItem className="pagination-item" disabled={startIndex === 0}
                                 onClick={prevPage}>Previous</CPaginationItem>
                {pageArray.slice(startIndex, endIndex).map((pageNum, index) => {
                    return (
                        <CPaginationItem key={index}
                                         className={currentPage === pageNum ? 'active pagination-item' : 'pagination-item'}
                                         onClick={() => handleClick(pageNum)}>{pageNum}</CPaginationItem>
                    )
                })
                }
                <CPaginationItem className="pagination-item" disabled={endIndex === pageCount}
                                 onClick={nextPage}>Next</CPaginationItem>
            </CPagination>
        </>
    )
}

InfoTable.propTypes = {
    columns: PropTypes.array,
    items: PropTypes.array,
}
