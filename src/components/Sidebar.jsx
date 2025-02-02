import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaUsers, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-300 p-4 d-flex flex-column" style={{ width: "350px" }}>
      <h3 className="text-center mb-5">Admin Panel</h3>
      <ul className="nav flex-column align-items-center gap-5">
        <li className="nav-item w-100">
          <Link className="nav-link text-white d-flex align-items-center justify-content-center gap-2" to="/">
            <FaTachometerAlt size={20} /> Dashboard
          </Link>
        </li>
        <li className="nav-item w-100">
          <Link className="nav-link text-white d-flex align-items-center justify-content-center gap-2" to="/products">
            <FaBox size={20} /> Products
          </Link>
        </li>
        <li className="nav-item w-100">
          <Link className="nav-link text-white d-flex align-items-center justify-content-center gap-2" to="/users">
            <FaUsers size={20} /> Users
          </Link>
        </li>
        <li className="nav-item w-100">
          <Link className="nav-link text-white d-flex align-items-center justify-content-center gap-2" to="/orders">
            <FaShoppingCart size={20} /> Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
