import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <button className="p-2 w-full font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
