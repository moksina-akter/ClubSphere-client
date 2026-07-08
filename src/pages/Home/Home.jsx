import ClubManagers from "./ClubManagers";
import FeaturedClubs from "./FeaturedClubs";
import Gallery from "./Gallery";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Statistics from "./Statistics";
import UpcomingEvents from "./UpcomingEvents";
import WhyJoin from "./WhyJoin";

const Home = () => {
  return (
    <div>
      <Hero />
      <Statistics />
      <FeaturedClubs />
      <UpcomingEvents />
      <HowItWorks />
      <WhyJoin />
      <ClubManagers />
      <Gallery />
      <Pricing />
    </div>
  );
};

export default Home;
