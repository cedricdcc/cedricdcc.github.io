import 'bootstrap/dist/css/bootstrap.min.css';
import {FaLinkedin, FaGithubSquare, FaCopyright} from 'react-icons/fa';
import {SiGmail} from 'react-icons/si';
import {BsDiscord} from 'react-icons/bs';
import $ from 'jquery';
import '../css/footer.css';
// import '.././css/index.css'

//add jquery functionality
$(document).ready(function() {
    var disappear = function(){
        return $(document).height() - $(window).height();
      };

    $(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() >= disappear()){
                $('.vanish').fadeIn();
            }
            else{
                $('.vanish').fadeOut();
            }
        });
    });
    
});

var style = {
    background: "rgb(246,76,91)",
    background: "linear-gradient(0deg, rgba(246,76,91,1) 0%, rgba(0,0,0,0.7942752100840336) 100%)",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "10vh",
    minHeight: "60px",
    width: "100%",
    display: "none",
    color:"white"
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '10vh',
  min_height: '50px',
  width: '100%',
}


function Footer() {

    return (
        <div>
            <div class="socialbannerf"/>
            <div style={style} class="vanish">
            <div><FaCopyright class="copyright"></FaCopyright> Decruw Cedric 2022</div>
                <div>
                    <a href='https://www.linkedin.com/in/cedric-decruw-974793180/' target="_blank"><FaLinkedin class="socialitemf"></FaLinkedin></a>
                    <SiGmail class="socialitemf" onClick={() => window.location = 'mailto:cedricdecruw@gmail.com'}></SiGmail>
                    <a href="https://github.com/cedricdcc" target="_blank"><FaGithubSquare class="socialitemf"></FaGithubSquare></a>
                    <a href="https://discordapp.com/users/333959479085236224/" target="_blank"><BsDiscord class="socialitemf"></BsDiscord></a>
                </div>
            </div>
        </div>
    )
}

export default Footer