import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [open, setOpen] = useState();
  const wrapperRef = useRef();
  console.log(user);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <nav
      ref={wrapperRef}
      className="flex items-center w-[80%] mx-auto sm:justify-between md:justify-between lg:justify-between py-10 md:px-10 sm:px-4"
    >
      <Link to="/">
        <div>
          <img
            src="/assets/logo.png"
            alt="kaiventurepartners"
            className="w-[100px] h-[100px]"
          />
        </div>
      </Link>

      <div className="hidden md:block lg:block">
        <div className="flex items-center gap-x-2">
          {user && (
            <div className="text-white relative">
              <img
                src={user.picture}
                alt=""
                className="w-[40px] h-[40px] rounded-full mx-2 cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open ? (
                <div className="absolute top-12 right-0 w-[200px] bg-white transition-all ease-linear">
                  <LogoutButton />
                </div>
              ) : null}
            </div>
          )}
          {!isAuthenticated && <LoginButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
