import ClubManagers from "./ClubManagers";
import FeaturedClubs from "./FeaturedClubs";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
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
    </div>
  );
};

export default Home;
