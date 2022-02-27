import axios from 'axios';
import { auth, db, logout } from "./firebase-config";
/* all functions with api.tracker.gg as endpoint are handled here */
/* endpoint for getting all the valorant profile data */
const URL_ENDPOINT = "https://api.tracker.gg/api/v2/valorant/standard/";
/* url to heroku setup proxy server */
const PROXY_URL = "https://immense-beyond-07190.herokuapp.com/"

/* 
| tracker.gg api calls
| get user info:
|   https://api.tracker.gg/api/v2/valorant/standard/profile/riot/Cetinator%23VLIZ
| get user matches per category:
|   https://api.tracker.gg/api/v2/valorant/standard/matches/riot/Cetinator%23VLIZ?type=unrated
| getting all season ids : 
|   https://valorant-api.com/v1/seasons/competitive
| get all agents info:
|   https://api.tracker.gg/api/v2/valorant/standard/profile/riot/Cetinator%23VLIZ/segments/agent?playlist=unrated&seasonId=573f53ac-41a5-3a7d-d9ce-d6a6298e5704
| season info:
|   https://api.tracker.gg/api/v2/valorant/standard/profile/riot/Cetinator%23VLIZ/segments/season?playlist=unrated&seasonId=573f53ac-41a5-3a7d-d9ce-d6a6298e5704
*/

/* function to get all the data from a given user */
const getUserValoProfileInfo = async (valorant_name, valorant_tag) => {
    try {
        const url_check = PROXY_URL+URL_ENDPOINT+'profile/riot/'+valorant_name+'%23'+valorant_tag ; // # needed to be replaced with %23 sicne # is used as an anchor in html
        console.log("getting url: ", url_check);
        const axiosreques = axios.get(url_check,{
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
              crossdomain: true 
        })
        .then(response => {
            if(response.status == 200){
                //gather all data
                try {
                    console.log(response.data.data);
                    console.log(response.data.data.segments[0].stats.rank.metadata.tierName) // Name of the current rank user
                    console.log(response.data.data.segments[0].stats.rank.metadata.iconUrl) // image of the current rank user
                    console.log(response.data.data.segments[0].stats.peakRank.metadata.tierName) // Name of the highest rank user
                    console.log(response.data.data.segments[0].stats.peakRank.metadata.iconUrl) // image of the highest rank user
                    getTotalTimePlayed(response.data.data).then(result =>{
                        console.log(result)
                    })
                } catch (error) {
                    
                }
                return true
            }
            
        })
        .catch(error => {
            //do error response here
            console.log("error handling here");
            console.log('There was an error!', error);
            return false;
        });
        return axiosreques
    } catch (err) {
      console.error(err);
    }
}


const getUserInfo = async (valorant_name, valorant_tag) => {
    try {
        const url_check = PROXY_URL+URL_ENDPOINT+'profile/riot/'+valorant_name+'%23'+valorant_tag ; // # needed to be replaced with %23 sicne # is used as an anchor in html
        console.log("getting url: ", url_check);
        const axiosreques = axios.get(url_check,{
            headers: {
                'Access-Control-Allow-Origin': '*',
              },
              crossdomain: true 
        })
        .then(response => {
            if(response.status == 200){
                //gather all data
                console.log(response.data.data);
                const crntier = response.data.data.segments[0].stats.rank.metadata.tierName;
                const crntiericon = response.data.data.segments[0].stats.rank.metadata.iconUrl;
                const maxtier = response.data.data.segments[0].stats.peakRank.metadata.tierName;
                const maxtiericon = response.data.data.segments[0].stats.peakRank.metadata.iconUrl;
                const tiervaluestrsplit = response.data.data.segments[0].stats.rank.metadata.iconUrl.split('tiers/');
                const value_tier_pre = tiervaluestrsplit[1].split(".");
                const value_tier_final = value_tier_pre[0];
                const time_played =  getTotalTimePlayed(response.data.data).then(resulto => {
                    return {
                        "current_tier":crntier,
                        "current_tier_icon":crntiericon,
                        "max_tier":maxtier,
                        "max_tier_icon":maxtiericon,
                        "time_played":resulto,
                        "tier_value" : parseInt(value_tier_final),
                        "last_updated":Date.now()
                    }
                })
                return time_played
            }
            
        })
        .catch(error => {
            //do error response here
            console.log("error handling here");
            console.log('There was an error!', error);

        });
        return axiosreques
    } catch (err) {
        return false
      console.error(err);
    }
};

const getTotalTimePlayed = async (profiledata) => {
    var minutes_played = 0
    const all_segements = profiledata.segments
    for (let i = 0; i < all_segements.length; i++) {
        //check if segment is playlist
        if(all_segements[i].type == "playlist"){
            var duration = all_segements[i].stats.timePlayed.value
            var minutes = (duration / (1000 * 60 ));
            // count up all the minutes
            var minutes_played = minutes_played + minutes;
        }
    }
    //convert minutesplayed into hours:minutes
    var hours_played_total = Math.floor(minutes_played / 60);
    var minutes_played_left = Math.floor(minutes_played % 60);
    return {"hours_played":hours_played_total,"minutes_played":minutes_played_left}
};

export {
    getUserValoProfileInfo,
    getUserInfo
};