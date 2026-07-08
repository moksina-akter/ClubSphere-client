import ClubManagers from "./ClubManagers";
import FAQWithNewsletter from "./FAQWithNewsletter";
import FeaturedClubs from "./FeaturedClubs";
import Gallery from "./Gallery";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Statistics from "./Statistics";
import Testimonials from "./Testimonials";
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
      <Testimonials />
      <FAQWithNewsletter />
    </div>
  );
};

export default Home;
