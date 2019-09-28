import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface IViewProps {
  index: number;
  selectedIndex: number;
  children?: any;
  [name: string]: any;
}

const TabPanel: FC<IViewProps> = ({ index, selectedIndex, children, ...rest }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={selectedIndex !== index}
      id={`users-admin-tp-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
};
export default TabPanel;
