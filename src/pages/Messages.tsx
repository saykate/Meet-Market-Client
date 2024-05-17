import useAuthContext from "../hooks/useAuthContext";
import useGetUserMessages from "../hooks/useGetUserMessages";
import { UserData } from "../api/users";

export type Message = {
  _id: string;
  author: UserData;
  recipient: string;
  text: string;
  createdDate: Date;
};

const Messages = () => {
  const { isAuthenticated } = useAuthContext();
  const { messages, loading } = useGetUserMessages();


  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
    {isAuthenticated && 
      <div>
        <h2 style={{color: "red", textDecoration: "underline"}}>Inbox</h2>
        <ul>
          {messages.map((message: Message) => (
            <li key={message._id}>
              <div>{message.author.username} said:</div>
              <div>'{message.text}'</div>
            </li>
          ))}
        </ul>
      </div>
    }
    </>
  )
}

export default Messages