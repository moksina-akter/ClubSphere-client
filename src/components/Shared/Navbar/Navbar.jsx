import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router"; // correct import
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../../public/logo.jpeg";
import LoadingSpinner from "../LoadingSpinner";
const Navbar = () => {
  const { user, logOut, loading } = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="fixed w-full bg-gradient-to-b from-blue-50 to-blue-100 z-50 shadow-sm">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="ClubSphere Logo"
              className="w-12 h-12 rounded-full"
            />
          </Link>

          {/* Public Links (visible on md+) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/club" className="hover:text-blue-600 font-medium">
              Clubs
            </Link>
            <Link to="/events" className="hover:text-blue-600 font-medium">
              Events
            </Link>
          </div>

          {/* Auth & Avatar Dropdown */}
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 border border-neutral-200 rounded-full p-2 cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu className="text-lg" />
              <img
                src={user?.photoURL || avatarImg}
                alt="Profile"
                className="w-8 h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-md rounded-xl w-44 overflow-hidden text-sm">
                <div className="flex flex-col">
                  {/* Public links for mobile */}
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/club"
                    className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    Clubs
                  </Link>
                  <Link
                    to="/events"
                    className="block px-4 py-2 hover:bg-neutral-100 transition font-medium md:hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <div
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="block px-4 py-2 hover:bg-neutral-100 transition font-medium cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-neutral-100 transition font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
