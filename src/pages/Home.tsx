import { Link } from "react-router-dom"
import useListOfUsers from "../hooks/useListOfUsers";

const Home = () => {
  const { users } = useListOfUsers()

  return (
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
  )
}

export default Home