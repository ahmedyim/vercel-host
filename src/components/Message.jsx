import React, { useEffect, useState } from "react";
import "../css/profile.css";
import api from "../service/api";
import { SendHorizontal, Smile, Mic } from "lucide-react";
export default function Message() {
  const [messages, setMessages] = useState({
    1: [
      { id: 1, content: "Hi", time: "09:23", senderId: 1, reciverId: 10 },
      {
        id: 2,
        content: "Aselamualeykum",
        time: "12:03",
        senderId: 10,
        reciverId: 1,
      },
      {
        id: 3,
        content: "Aselamualeykum",
        time: "10:53",
        senderId: 1,
        reciverId: 10,
      },
    ],
    2: [
      { id: 4, content: "Hello", time: "09:23", senderId: 2, reciverId: 10 },
      {
        id: 5,
        content: "Aselamualeykum",
        time: "12:03",
        senderId: 10,
        reciverId: 2,
      },
      { id: 6, content: "Hello", time: "10:53", senderId: 2, reciverId: 10 },
    ],
  });
  const [selectedId, setselectedId] = useState("");
  const [displayMessages, setdisplayMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [myId,setMyId]=useState("")
  let currentUser = null;

useEffect(() => {
   const fetchUsers = async () => {
     try {
      const storedUser = localStorage.getItem("userId");
       const response = await api.get("/users/allusers");
       let contact=response.data.filter(u=>u._id!=storedUser)
       setUsers(contact);
       console.log(contact);
     } catch (error) {
       console.error("Error fetching users:", error);
     }
   };
   fetchUsers();
    const storedUser = localStorage.getItem("userId");
    setMyId(storedUser)
 }, []);




  const sendMessage = async() => {
    const newMessage = {
        text:text,
        receiverId:selectedId
    };
  try {
    const response=await api.post("/messages",{receiverId:selectedId,content:text})
     setdisplayMessages((prev) => [...prev, newMessage]);
  } catch (error) {
    
  }
   
  };
  const getMessages=async(selectedId)=>{
    try {
      const response=await api.get(`/messages/${selectedId}`)
      setdisplayMessages(response.data)
    } catch (error) {

    }
  }
console.log(displayMessages)
  return (
    <div className="container">
      <div>
        {users.map((user) => (
          <div key={user._id} className="profile">
            <p
              onClick={() => {
                setselectedId(user._id);
                getMessages(user._id)
              }}
            >
              <img src={user.profilePic} className="profile-pic" />
            </p>
            {user.name}
          </div>
        ))}
      </div>
      <div>
        <div className="cont">
          {selectedId ? (
            <>
              <div className="message-cont">
                {displayMessages.map((message) => (
                  <p
                    key={message._id}
                    className={
                      message.senderId === myId ? "right" : "left"
                    }
                  >
                    {message.content}
                  </p>
                ))}
              </div>
              <div className="text-cont">
                <input
                  type="text"
                  value={text}
                  placeholder="write a message"
                  onChange={(e) => setText(e.target.value)}
                />
                <Smile />
                {!text && <Mic />}
                {text && <SendHorizontal onClick={sendMessage} />}
              </div>
            </>
          ) : (
            <div className="scontacts">Select a chat to start messaging</div>
          )}
        </div>
      </div>
    </div>
  );
}
