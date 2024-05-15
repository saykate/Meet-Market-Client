import { Link, useLocation } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const location = useLocation();
  const { isAuthenticated, userId } = useAuthContext();

  return (
    <nav>
      { !isAuthenticated &&
        <Link to="login">Login</Link>
      }
      { location.pathname !== "/" &&
        <Link to="/">Home</Link>
      }
      <Link to="shopping">Shopping</Link>
      { isAuthenticated &&
        <div className="nav">
          <Link to={`profile/${userId}`}>Profile</Link>
          <Link to="messages">Messages</Link>
          <Link onClick={logout} to="/">Logout</Link>
        </div>
      }
    </nav>
  )
}

export default Navbar