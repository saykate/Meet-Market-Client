import { useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useGetUser from "../hooks/useGetUser";
import MessageForm from "../modals/MessageForm";
import ProfileForm from "../modals/ProfileForm";
import { useState } from "react";

const Profile = () => {
  const { userId: currentUserId } = useAuthContext();
  const { userId } = useParams();
  const { user, loading } = useGetUser(userId);
  const currentUser = currentUserId === userId
  const [messageIsOpen, setMessageIsOpen] = useState<boolean>(false)
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false)

console.log("UserId", userId)
console.log("currentUserId", currentUserId)
console.log("currentUser", currentUser)
console.log("user", user)

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
          <button onClick={() => setEditIsOpen(true)}>Edit Profile</button>
          {editIsOpen && <ProfileForm />}
          <h1>Welcome {user.username}</h1>
        </div>)
        : <button onClick={() => setMessageIsOpen(true)}>Send Message</button>}
        {messageIsOpen && <MessageForm recipient={userId} />}
      </div>
    )
  } else {
      return (
        <div>
          <h1>User not found</h1>
        </div>
)}
}

export default Profile