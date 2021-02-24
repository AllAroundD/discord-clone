import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { Button } from "@material-ui/core";
import { Icon } from "@iconify/react";
import discordIcon from "@iconify/icons-mdi/discord";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_logo">
        {/* <img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png" alt="Discord logo" /> */}
        <Icon icon={discordIcon} className="login_logo__icon" />
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
