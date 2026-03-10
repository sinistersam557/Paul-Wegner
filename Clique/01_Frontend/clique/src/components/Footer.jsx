import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Copyright */}
        <p>&copy; {new Date().getFullYear()} Clique. All Rights Reserved.</p>

        {/* Footer navigation links */}
        <ul style={{ listStyleType: 'none'}} className="footer-links">
          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/Contact Page">Contact</Link>
          </li>

        </ul>
      </div>
    </footer>
  );
};

export default Footer;
