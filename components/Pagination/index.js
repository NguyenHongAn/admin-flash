import outlineKeyboardArrowLeft from "@iconify/icons-ic/outline-keyboard-arrow-left";
import baselineKeyboardArrowRight from "@iconify/icons-ic/baseline-keyboard-arrow-right";
import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import React from "react";
import innerStyles from "./styles.module.css";

function Pagination({ currentPage, pageCount, handler }) {
  const pageArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <div className={innerStyles.pagination}>
      {/* <Icon
        icon={outlineKeyboardArrowLeft}
        className={innerStyles.pagingItemArrow && innerStyles.pagingItem}
      ></Icon> */}

      {pageArray.map((page) => {
        let temp = innerStyles.pagingItem;
        if (page === currentPage)
          temp = temp + " " + innerStyles.pagingItemActive;
        return (
          <a key={page} className={temp} onClick={() => handler(page)}>
            {page}
          </a>
        );
      })}

      {/* <Icon
        icon={baselineKeyboardArrowRight}
        className={innerStyles.pagingItemArrow && innerStyles.pagingItem}
      ></Icon> */}
    </div>
  );
}
export default Pagination;

{
  /* <ReactPaginate
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
pageRangeDisplayed={3}
onPageChange={handler}
/> */
}
