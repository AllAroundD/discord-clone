import React, { useState, useEffect } from 'react'
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message'
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase'
import firebase from 'firebase'
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [ input, setInput ] = useState("")
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        if (channelId) {
            db.collection("channels")
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
        )
        }
    }, [channelId])

    const sendMessage = e => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user,
        })

        setInput("")
    }

    // For the tooltips
    const useStylesBootstrap = makeStyles((theme) => ({
        arrow: {
          color: theme.palette.common.black,
        },
        tooltip: {
          backgroundColor: theme.palette.common.black,
        },
      }));
      
      function BootstrapTooltip(props) {
        const classes = useStylesBootstrap();
      
        return <Tooltip arrow classes={classes} {...props} />;
      }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                {messages.map(message => (
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
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
