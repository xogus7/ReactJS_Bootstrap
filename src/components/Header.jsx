import './Header.css'
import { ThemeContext } from '../App';
import { useContext } from 'react';
import sun from "../assets/icons/sun.svg"
import moon from "../assets/icons/moon.svg"
import VE_White from "../assets/images/editor/VE_White.png"
import VE_Black from "../assets/images/editor/VE_Black.png"
import { VideoEditorContext } from '../pages/VideoEditor/VideoEditor';

const Header = () => {
    const {device} = useContext(VideoEditorContext);
    const [mode, handleDarkMode] = useContext(ThemeContext);
    return (
    <header>
        <div className={`header_container ${device}`}>
        <button className="toggleDarkMode_button"
          onClick={() => handleDarkMode(mode === "dark" ? "light" : "dark")}
        >
          <img className="header_img"
            src={mode === "dark" ? VE_White : VE_Black}
            alt="header_image"
          />
        </button>
        <button className="toggleDarkMode_button"
          onClick={() => handleDarkMode(mode === "dark" ? "light" : "dark")}
        >
          <img className="toggleDarkMode_img"
            src={mode === "dark" ? sun : moon}
            alt="toggleDarkMode_img"
          />
        </button>
        </div>
      </header>
    )
}

export default Header;