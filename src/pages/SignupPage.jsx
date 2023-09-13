import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";

const SignupPage = () => {
  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>

      <ClerkLoaded>
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sign Up | KAI Venture Partners</title>
          </Helmet>
          <div className="h-screen flex items-center justify-center">
            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/signin"
              afterSignUpUrl="/signin"
            />
          </div>
        </>
      </ClerkLoaded>
    </>
  );
};

export default SignupPage;
