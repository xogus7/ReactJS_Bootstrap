import "./Footer.css";
import VE from "../assets/images/editor/VE_Black.png"
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <div class="info">
        <img src={VE} />
        </div>
        <div class="contact">
          <ul class="contact_info">
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