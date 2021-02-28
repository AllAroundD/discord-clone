import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Modal from "@material-ui/core/Modal";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  // For the tooltips
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const BootstrapTooltip = (props) => {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  };

  let isModalOpen = false;

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
    console.log(isModalOpen);
    console.log("handleEmojis clicked");
    // let emojiHandle = document.querySelector("emojiPicker");
    // emojiHandle.innerHTML +=
    //   '<Picker title="Pick your emoji…" emoji="point_up" />';
  };

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 80 + rand();
    const left = 70 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Pick emoji</h2>
      <p id="simple-modal-description">
        <Picker title="Pick your emoji…" emoji="point_up" />
      </p>
    </div>
  );

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <BootstrapTooltip title="Upgrade your friends! Give them awesome chat perks with Nitro.">
            <CardGiftcardIcon fontSize="large" />
          </BootstrapTooltip>
          <GifIcon fontSize="large" />
          <span className="emojiPicker">
            <button type="button" onClick={handleOpen} className="emojiButton">
              <EmojiEmotionsIcon fontSize="large" />
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
