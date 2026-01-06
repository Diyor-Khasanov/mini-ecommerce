import { NavLink } from "react-router-dom";

export default function Header() {
  const links = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "User Cart", path: "/user-cart" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="w-full bg-white dark:bg-violet-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-2xl font-bold text-white">
            MyShop
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-indigo-500 dark:text-gray-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-violet-800">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
