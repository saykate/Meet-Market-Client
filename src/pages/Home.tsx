import { Link } from "react-router-dom"
import useListOfUsers from "../hooks/useListOfUsers";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { users } = useListOfUsers()
  const { isAuthenticated } = useAuthContext();

  return (
    <>
    {isAuthenticated && 
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <Link to={`/profile/${user._id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
    }
  </>
  )
}

export default Home