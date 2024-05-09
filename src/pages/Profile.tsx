import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import MessageForm from "../modals/MessageForm";
import { useState } from "react";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams();
  const { user, loading } = useGetUser(userId);
  const currentUser = currentUserId === userId
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if(loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if(user && userId) {
    return (
      <div>
        {currentUser ? (
        <div>
          <button>Edit Profile</button>
          <h1>Welcome {user.username}</h1>
        </div>)
        : <button onClick={() => setIsOpen(true)}>Send Message</button>}
        {isOpen && <MessageForm recipient={userId} />}
      </div>
    )
  }

  return (
    <div>
      <h1>User not found</h1>
    </div>
  )
}

export default Profile