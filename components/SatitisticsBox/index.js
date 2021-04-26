import React from "react";
import { Icon } from "@iconify/react";

function SatitisticsBox({ icon, handleClick, backgroundColor, content }) {
  return (
    <div className="statistics-box">
      <div
        className="statistics-box__icon"
        style={{ backgroundColor: backgroundColor }}
      >
        <Icon
          icon={icon}
          onClick={handleClick}
          style={{ fontSize: "40px" }}
        ></Icon>
      </div>
      <div className="statistics-box__content"> {content}</div>
    </div>
  );
}
export default SatitisticsBox;
