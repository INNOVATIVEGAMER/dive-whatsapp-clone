import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const Chat = (props) => {
  const user = props.auth;
  const [input, setInput] = useState("");
  const { chatId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   if (roomId) {
  //     db.collection("rooms")
  //       .doc(roomId)
  //       .onSnapshot((snapshot) => {
  //         setRoomName(snapshot.data().name);
  //       });

  //     db.collection("rooms")
  //       .doc(roomId)
  //       .collection("messages")
  //       .orderBy("timestamp", "asc")
  //       .onSnapshot((snapshot) => {
  //         setMessages(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }
  // }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    // db.collection("rooms").doc(roomId).collection("messages").add({
    //   message: input,
    //   name: user.displayName,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={""} />
        <div className="chat_headerInfo">
          <h3 className="chat-room-name">{roomName}</h3>
          {/* <p className="chat-room-last-seen">
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p> */}
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name == user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestemp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Chat);