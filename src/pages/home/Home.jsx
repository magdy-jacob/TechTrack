import React from "react";
import Tracks from "./AllTrack/Tracks";
import Opportunity from "./Opportunity/Opportunity";
import Reviews from "./Review/Reviews";
import HeroSection from "./HeroSection/HeroSection";
// import RoadmapLine from "../Roadmap/TrackDetails/RoadmapLine";

const Home = () => {
  return (
    <>

      <div>


        <HeroSection />
        <Tracks />
        <Opportunity />
        <Reviews />
        {/* <RoadmapLine /> */}

      </div>
    </>
  );
};


export default Home;
