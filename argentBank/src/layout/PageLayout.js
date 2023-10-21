import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

function PageLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default PageLayout;
