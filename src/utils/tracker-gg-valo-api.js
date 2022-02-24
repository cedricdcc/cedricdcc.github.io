import axios from 'axios';

/* all functions with api.tracker.gg as endpoint are handled here */
/* endpoint for getting all the valorant profile data */
const URL_ENDPOINT = "https://api.tracker.gg/api/v2/valorant/standard/";
/* url to heroku setup proxy server */
const PROXY_URL = "https://evening-badlands-05027.herokuapp.com/"

/* 
| tracker.gg api calls
| get user info:
|   https://api.tracker.gg/api/v2/valorant/standard/profile/riot/Cetinator%23VLIZ
| get user matches per category:
|   https://api.tracker.gg/api/v2/valorant/standard/matches/riot/Cetinator%23VLIZ?type=unrated
*/

/* function to get all the data from a given user */

const getUserValoProfileInfo = async (valorant_name, valorant_tag) => {
    try {
        const url_check = PROXY_URL+URL_ENDPOINT+'profile/riot/'+valorant_name+'%23'+valorant_tag ; // # needed to be replaced with %23 sicne # is used as an anchor in html
        console.log("getting url: ", url_check);
        axios.get(url_check,{
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
              crossdomain: true 
        })
        .then(response => {
            console.log(response.data.data);
            console.log(response.data.data.segments[0].stats.rank.metadata.tierName) // Name of the current rank user
            console.log(response.data.data.segments[0].stats.rank.metadata.iconUrl) // image of the current rank user
            console.log(response.data.data.segments[0].stats.peakRank.metadata.tierName) // Name of the highest rank user
            console.log(response.data.data.segments[0].stats.peakRank.metadata.iconUrl) // image of the highest rank user
        })
        .catch(error => {
            console.log('There was an error!', error);
        });
    } catch (err) {
      console.error(err);
    }
};

const getProfileDataNeeded = async (data) => {console.log(data)};

export {
    getUserValoProfileInfo,
    getProfileDataNeeded
};