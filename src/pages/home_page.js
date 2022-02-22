import logo from '../static/IE_small.png';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
function HomePage() {
    //define all constants first
    //All the functions here
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Coming soon: impulsive valorant matchmaker bruv
                </p>
                <a
                className="App-link"
                href="https://www.twitch.tv/impulsiveempathy"
                target="_blank"
                rel="noopener noreferrer"
                >
                Join me while I'm deer/content-hunting
                </a>
                <ReactTwitchEmbedVideo channel="impulsiveempathy" />
            </header>
        </div>
    )
    }
    
    export default HomePage