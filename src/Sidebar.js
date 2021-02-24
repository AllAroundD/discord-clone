import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  // for the tooltips
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
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Clever Discord</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <BootstrapTooltip title="Call Info">
            <InfoOutlinedIcon />
          </BootstrapTooltip>
          <BootstrapTooltip title="Hang Up">
            <CallIcon />
          </BootstrapTooltip>
        </div>
      </div>

      <div className="sidebar__profile">
        {/* <Avatar src="https://cdn.discordapp.com/avatars/383469567030067231/c1891754f4db4d7e41d91f21d89d7946.png" /> */}
        <Avatar
          className="sidebar__photo"
          onClick={() => {
            try {
              auth.signOut();
            } catch (err) {
              console.error("error", err);
            }
          }}
          src={user.photo}
        />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <BootstrapTooltip title="Unmute">
            <MicIcon />
          </BootstrapTooltip>
          <BootstrapTooltip title="Deafen">
            <HeadsetIcon />
          </BootstrapTooltip>
          <BootstrapTooltip title="User Settings">
            <SettingsIcon />
          </BootstrapTooltip>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
