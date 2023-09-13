import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div onClick={() => loginWithRedirect()}>
      <button className="p-2 rounded-md font-semibold bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
