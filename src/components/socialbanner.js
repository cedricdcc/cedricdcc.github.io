import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/socialbanner.css';
/* import all the react icons required */
import {FaTwitch, FaYoutube, FaInstagram, FaTwitterSquare} from 'react-icons/fa';
import { IconContext } from "react-icons";

function SocialBanner() {
    return (
        <div class ="socialbanner">
            <FaTwitch class="socialitem"/>
            <FaYoutube class="socialitem"/>
            <FaInstagram class="socialitem"/>
            <FaTwitterSquare class="socialitem"/>
        </div>
    )
}

export default SocialBanner