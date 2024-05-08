import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
      <Link to="profile">Profile</Link>
      <Link to="shopping">Shopping</Link>
      <Link to="messages">Messages</Link>
    </nav>
  )
}

export default Navbar