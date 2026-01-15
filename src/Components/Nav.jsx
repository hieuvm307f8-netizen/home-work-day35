import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
//   console.log(location);

  const handleActive = (path) => {
    return location.pathname === path ? {color: 'red', textDecoration: 'underline'} : {};
  };

  return (
    <div>
      <Link style={handleActive('/')} to={"/"}>Home</Link> |
      <Link style={handleActive('/about')} to={"/about"}>About</Link> |
      <Link style={handleActive('/contact')} to={"/contact"}>Contact</Link> |
      <Link style={handleActive('/products')} to={"/products"}>Products</Link>
    </div>
  );
};

export default Nav;
