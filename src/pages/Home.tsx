// import useAuthContext from "../hooks/useAuthContext"
import useListOfUsers from "../hooks/useListOfUsers";

const Home = () => {
  // const { isAuthenticated } = useAuthContext();
  const { users } = useListOfUsers()

  console.log(users)

  return (
    <>

    </>
  )
}

export default Home