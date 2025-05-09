// filepath: c:\Users\shivr\Desktop\node\100Xproject\schoolProject\admin-portal\src\components\Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FileText, ImageIcon, LogOut, Menu, NewspaperIcon as News, UserPlus, X } from "lucide-react";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Register Faculty", path: "/", icon: <UserPlus className="h-4 w-4 mr-2" />, restricted: true },
    { name: "Upload Gallery", path: "/upload-gallery", icon: <ImageIcon className="h-4 w-4 mr-2" /> },
    { name: "Upload Document", path: "/upload-document", icon: <FileText className="h-4 w-4 mr-2" /> },
    { name: "Post News", path: "/post-news", icon: <News className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-white text-2xl font-extrabold tracking-wide">Admin Portal</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                (!item.restricted || role !== 'faculty') && ( // Hide restricted items for faculty
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 font-medium rounded-md transition duration-300 ${
                        location.pathname === item.path
                          ? "bg-white text-purple-600"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                )
              ))}
              <li>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition duration-300 shadow-md ml-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-gray-200 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/10">
            <ul className="pt-2 space-y-1">
              {navItems.map((item) => (
                (!item.restricted || role !== 'faculty') && ( // Hide restricted items for faculty
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 font-medium rounded-md transition duration-300 ${
                        location.pathname === item.path
                          ? "bg-white text-purple-600"
                          : "text-white hover:bg-white/10"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                )
              ))}
              <li>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 mt-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;