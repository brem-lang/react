import React from "react";
import { Outlet } from "react-router-dom";

import AppHeader from "../components/app-header/appHeader";
import AppMenu from "../components/app-menu/appMenu";
import AppFooter from "../components/app-footer/appFooter";
import AppSetting from "../components/app-setting/appSetting";

const trees = window.$('[data-widget="treeview"]');
trees.Treeview("init");

const Layout = () => {
  return (
    <div className="wrapper">
      <AppHeader />
      <AppMenu />
      <Outlet />
      <AppFooter />
      <AppSetting />
    </div>
  );
};

export default Layout;
