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
            <li>
              <a
                href="https://blackmilkt.tistory.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="https://github.com/xogus7"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;