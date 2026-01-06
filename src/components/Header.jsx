import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
    { name: "User Cart", path: "/user-cart" },
  ];

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-gray-700 bg-violet-100"
        : "text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-white"
    }`;

  return (
    <header className="w-full sticky top-0 z-50 bg-violet-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-violet-600 dark:text-white"
          >
            MyShop
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className={navLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 dark:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-violet-900 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
