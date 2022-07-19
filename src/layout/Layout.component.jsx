import React from "react";
import { Outlet } from "react-router-dom";

const AppHeader = React.lazy(() =>
  import("../components/app-header/appHeader")
);
const AppMenu = React.lazy(() => import("../components/app-menu/appMenu"));
const AppFooter = React.lazy(() =>
  import("../components/app-footer/appFooter")
);

const AppSetting = React.lazy(() =>
  import("../components/app-setting/appSetting")
);

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
