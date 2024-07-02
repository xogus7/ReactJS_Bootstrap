import { useContext } from "react";
import VE_White from "../assets/images/editor/VE_White.png"
import VE_Black from "../assets/images/editor/VE_Black.png"
import { ThemeContext } from "../App";
import "./Footer.css";

const Footer = () => {

  const [mode] = useContext(ThemeContext);
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <div className="info">
        <img src={mode === "dark" ? VE_Black : VE_White } />
        </div>
        <div className="contact">
          <ul className="contact_info">
            <li>Email: xogus2676@gmail.com</li>
            <li>GitHub: <a
                href="https://github.com/xogus7"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/xogus7
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;