import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Mabuhay! Ito ang Baybay Salita</h1>
        <p>
          Isang makabago at dynamic na plataporma sa pag-aaral na naglalayong
          pahusayin ang kakayahan sa pag-unawa sa pagbasa ng mga estudyanteng
          Grade 1 sa Taytay Elementary School.
        </p>
        <button className="btn-home img">
          Tuklasin{" "}
          <FontAwesomeIcon icon={faArrowRight} inverse className="icon-arrow" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
