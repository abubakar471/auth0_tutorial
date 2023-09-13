import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/clerk-react";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";

const SigninPage = () => {
  return (
    <>
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <ClerkLoaded>
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sign In | KAI Venture Partners</title>
          </Helmet>
          <div className="h-screen flex items-center justify-center">
            <SignIn
              routing="path"
              path="/signin"
              afterSignInUrl="/dashboard"
              signUpUrl="/signup"
            />
          </div>
        </>
      </ClerkLoaded>
    </>
  );
};

export default SigninPage;
