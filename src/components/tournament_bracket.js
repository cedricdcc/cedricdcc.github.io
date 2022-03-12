import { Bracket, RoundProps, Seed, SeedItem, SeedTeam,SeedTime, RenderSeedProps } from 'react-brackets';
import React from 'react';


function TournamentBracket(props) {
    //break down const props
    const rounds  = props.rounds;
    console.log(rounds);

    const CustomSeed = ({ seed, title, breakpoint, roundIndex, seedIndex }) => {
        // breakpoint passed to Bracket component
        // to check if mobile view is triggered or not
        // mobileBreakpoint is required to be passed down to a seed
        const homeTeam = seed.teams[0];
        const awayTeam = seed.teams[1];
        console.log(seed.title);
        //vars for the styling of the seeds
        let fontsizee = 9;
        let color_winner = "red";
        let width_bracket = "10vw";
        let min_width = "150px";
        let min_height = "25px";
        let height_bracket = "2vh";
        let color_edge = "black";
        let width_edge = "2px";
        let state_edge = "none";
        let box_shadow = "none";
        if(seed.title == "32th Final"){
          fontsizee = 9;
          height_bracket = "2vh";
        }
        if(seed.title == "16th Final"){
          fontsizee = 10;
          height_bracket = "2.5vh";
        }
        if(seed.title == "8th Final"){
          fontsizee = 11;
          height_bracket = "3vh";
        }
        if(seed.title == "Quarter Final"){
          fontsizee = 12;
          height_bracket = "3.5vh";
        }
        if(seed.title == "Semi Final"){
          fontsizee = 13;
          height_bracket = "4vh";
        }
        if(seed.title == "Small Final"){
          fontsizee = 20;
          color_edge = "silver";
          state_edge = "solid";
          height_bracket = "4.5vh";
          box_shadow = "10px 10px 2vw silver";
        }
        if(seed.title == "Grand Final"){
          fontsizee = 20;
          color_edge = "gold";
          state_edge = "solid";
          width_bracket = "12vw";
          color_winner = "green";
          height_bracket = "5vh";
          box_shadow = "2px 5px 2vw gold";
        }
        return (
          <Seed mobileBreakpoint={breakpoint} style={{ fontSize: fontsizee }}>
            <div>date tbp here</div>
            <SeedItem style={{ width:width_bracket,minWidth:min_width,borderColor:color_edge,borderWidth:width_edge,borderStyle:state_edge,boxShadow:box_shadow}}>
              <div>
                <SeedTeam
                  style={{
                    backgroundColor: homeTeam.score > awayTeam.score && color_winner,
                    height:height_bracket,minHeight:min_height
                  }}
                >
                  <div>{homeTeam.name}</div>
                  <div>{homeTeam.score}</div>
                </SeedTeam>
                <SeedTeam
                  style={{
                    backgroundColor: homeTeam.score < awayTeam.score && color_winner,
                    height:height_bracket,minHeight:min_height
                  }}
                >
                  <div>{awayTeam.name}</div>
                  <div>{awayTeam.score}</div>
                </SeedTeam>
              </div>
            </SeedItem>
            <div>special status here</div>
          </Seed>
        );
      };

    return (
        <Bracket 
        rounds={rounds}
        mobileBreakpoint={767}
        renderSeedComponent={CustomSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
        />
    )
}

export default TournamentBracket