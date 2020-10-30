import React from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
// import SendRoundedIcon from '@material-ui/icons/SendRounded';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';


function ChatHeader({ channelName }) {

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
        <div className="chatHeader">
            <div className="chatHeader__left">
                <h3>
                    <span className="chatHeader__hash">
                        #
                    </span>
                    {channelName}
                </h3>
            </div>
            <div className="chatHeader__right">
                <BootstrapTooltip title="Muting a channel prevents unread indicators and notifications from appearing unless you are mentioned.">
                    <NotificationsIcon />
                </BootstrapTooltip>
                <BootstrapTooltip title="Pinned Messages">
                    <EditLocationRoundedIcon />
                </BootstrapTooltip>
                <BootstrapTooltip title="Member List">
                    <PeopleAltRoundedIcon />
                </BootstrapTooltip>
                <div className="chatHeader__search">
                    <input type="text" name="" id="" placeholder="Search" />
                    <SearchRoundedIcon />
                </div>
                <BootstrapTooltip title="Inbox">
                    <InboxIcon />
                </BootstrapTooltip>
                <BootstrapTooltip title="Help">
                    <HelpRoundedIcon />
                </BootstrapTooltip>
            </div>
        </div>
    )
}

export default ChatHeader;