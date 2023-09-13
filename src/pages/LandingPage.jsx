import LandingHero from "../components/LandingHero.jsx";
import Navbar from "../components/Navbar.jsx";

const LandingPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/assets/1.jpg')",
          backgroundRepeat : "no-repeat",
          backgroundSize : "cover"
        }}
        className="min-h-screen w-full bg-[#111827]"
      >
        <Navbar />

        <LandingHero />
      </div>
    </>
  );
};

export default LandingPage;
