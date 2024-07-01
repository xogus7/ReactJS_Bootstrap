import "./Footer.css";
import VE from "../assets/images/editor/VE_Black.png"
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <div className="info">
        <img src={VE} />
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