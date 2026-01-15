import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";

const MainLayout = () => {
  return (
    <div>
      <Nav />
      <hr />
      <Outlet />
    </div>
  );
};

export default MainLayout;
