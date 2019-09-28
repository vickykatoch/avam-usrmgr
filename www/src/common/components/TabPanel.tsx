import React, { FC } from "react";

interface IViewProps {
  children?: any;
}

const TabPanel: FC<IViewProps> = ({children }) => {
  return (
    <div className="d-flex flex-fill">
      {children}
    </div>
  );
};
export default TabPanel;
