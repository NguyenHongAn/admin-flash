import React from "react";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
function RatingStar({ value, ammount }) {
  return (
    <div>
      <Box align="left" mb={1} borderColor="transparent">
        <Rating
          defaultValue={value}
          name="rating"
          readOnly
          precision={0.5}
          size="small"
        />
      </Box>
    </div>
  );
}
export default RatingStar;
