import React from 'react';
import LayoutComp from "../../components/layout/LayoutComp";
import {Outlet} from "react-router-dom";

const AdminPageComp = () => {
  return (
    <LayoutComp>
      <Outlet />
    </LayoutComp>
  );
};

export default AdminPageComp;
