import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/socialbanner.css';
/* import all the react icons required */
import {FaTwitch, FaYoutube, FaInstagram, FaTwitterSquare, FaDiscord, FaTiktok} from 'react-icons/fa';
import { IconContext } from "react-icons";
/* https://www.npmjs.com/package/unofficial-valorant-api */
function SocialBanner() {
    return (
        <div class ="socialbanner">
            <a href="https://www.twitch.tv/impulsiveempathy" target="_blank"><FaTwitch class="socialitem"/></a>
            <a href="https://www.youtube.com/channel/UCnffZdI8vzFO1gkLg2cpMuA" target="_blank"><FaYoutube class="socialitem"/></a>
            <a href="https://www.instagram.com/impulsiveempathy/" target="_blank"><FaInstagram class="socialitem"/></a>
            <a href="https://twitter.com/ImpulsiveEmp" target="_blank"><FaTwitterSquare class="socialitem"/></a>
            <a href="https://discord.com/invite/n7dXEKPeNs" target="_blank"><FaDiscord class="socialitem"/></a>
            <a href="https://www.tiktok.com/@impulsiveempathy?lang=sv-SE" target="_blank"><FaTiktok class="socialitem"/></a>
        </div>
    )
}

export default SocialBanner