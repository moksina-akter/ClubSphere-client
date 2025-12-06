import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 ">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-6">
          {/* About / Logo */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">ClubSphere</h2>
            <p className="text-sm max-w-xs">
              ClubSphere helps you discover, join, and manage local clubs and
              events. Stay connected and make your community active!
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Quick Links</h3>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/clubs" className="hover:text-blue-600 transition">
              Clubs
            </Link>
            <Link to="/events" className="hover:text-blue-600 transition">
              Events
            </Link>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex gap-4 mt-1">
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="w-5 h-5 hover:text-black transition" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="w-5 h-5 hover:text-blue-700 transition" />
              </a>
              <a href="https://x.com/" target="_blank" rel="noreferrer">
                {/* <FaX className="w-5 h-5 hover:text-blue-400 transition" /> */}
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ClubSphere. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
