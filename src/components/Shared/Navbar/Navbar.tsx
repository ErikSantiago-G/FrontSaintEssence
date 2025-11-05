import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import linksData from "./navbarLinks.json";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isClickOutside = useCallback(
    (target: Node) =>
      menuRef.current &&
      !menuRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target),
    []
  );

  const handleGlobalClick = useCallback(
    (event: MouseEvent) => {
      if (!menuOpen) return;
      const target = event.target as Node;
      if (isClickOutside(target)) closeMenu();
    },
    [menuOpen, isClickOutside, closeMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, [handleGlobalClick]);

  return (
    <header className="navbar">
      <nav className="navbar__container" aria-label="Menú principal">
        <a href="/" className="navbar__logo">Saint</a>

        <button
          ref={buttonRef}
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label="Alternar menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul
          ref={menuRef}
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          onClick={closeMenu}
        >
          {linksData.map(({ label, path }) => (
            <li
              key={path}
              className={`navbar__item ${
                location.pathname === path ? "navbar__item--active" : ""
              }`}
            >
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <ul className="navbar__icons">
          <li><NavLink to="/login"><User size={20} className="navbar__icon" /></NavLink></li>
          <li><NavLink to="/cart"><ShoppingCart size={20} className="navbar__icon" /></NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
