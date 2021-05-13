import outlineKeyboardArrowLeft from "@iconify/icons-ic/outline-keyboard-arrow-left";
import baselineKeyboardArrowRight from "@iconify/icons-ic/baseline-keyboard-arrow-right";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import React from "react";
import innerStyles from "./styles.module.css";

function Pagination({ currentPage, pageCount, pageDisplay, handler }) {
  return (
    <ReactPaginate
      previousLabel={
        <Icon
          icon={outlineKeyboardArrowLeft}
          className={`${innerStyles.pagingItem} ${innerStyles.pagingItemArrow}`}
        />
      }
      nextLabel={
        <Icon
          icon={baselineKeyboardArrowRight}
          className={`${innerStyles.pagingItem} ${innerStyles.pagingItemArrow}`}
        />
      }
      breakLabel={"..."}
      breakClassName={"break-me"}
      activeClassName={innerStyles.pagingItemActive}
      pageClassName={innerStyles.pagingItem}
      containerClassName={innerStyles.pagination}
      initialPage={currentPage}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={pageDisplay}
      onPageChange={handler}
    />
  );
}
export default Pagination;
