import TournamentBracket from "../components/tournament_bracket";
import {Accordion} from 'react-bootstrap';
import '../css/tournament.css';

function TourneyPage() {
  const temprounds = [
    {
        title: "8th Final",
        seeds: [
          {
            id: 1,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 1, name: "dog", score: 7 },
              { id: 2, name: "cat", score: 6 }
            ]
          },
          {
            id: 2,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 3, name: "Clones", score: 2 },
              { id: 4, name: "test", score: 5 }
            ]
          },
          {
            id: 3,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 5, name: "cheek", score: 1 },
              { id: 6, name: "Beta", score: 7 }
            ]
          },
          {
            id: 4,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 7, name: "noname", score: 2 },
              { id: 8, name: "chonker", score: 6 }
            ]
          },
          {
            id: 1,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 1, name: "cheekclappers", score: 7 },
              { id: 2, name: "asslickers", score: 6 }
            ]
          },
          {
            id: 2,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 3, name: "eeeeee", score: 2 },
              { id: 4, name: "miauw", score: 1 }
            ]
          },
          {
            id: 3,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 5, name: "boxers", score: 1 },
              { id: 6, name: "測試高中F", score: 7 }
            ]
          },
          {
            id: 4,
            date: new Date().toDateString(),title: "8th Final",
            teams: [
              { id: 7, name: "oofed", score: 2 },
              { id: 8, name: "qergfe", score: 6 }
            ]
          }
        ]
      },
    {
      title: "Quarter Final",
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),title: "Quarter Final",
          teams: [
            { id: 1, name: "dog", score: 7 },
            { id: 2, name: "test", score: 6 }
          ]
        },
        {
          id: 2,
          date: new Date().toDateString(),title: "Quarter Final",
          teams: [
            { id: 3, name: "Beta", score: 2 },
            { id: 4, name: "chonker", score: 1 }
          ]
        },
        {
          id: 3,
          date: new Date().toDateString(),title: "Quarter Final",
          teams: [
            { id: 5, name: "cheekclappers", score: 1 },
            { id: 6, name: "eeeeee", score: 7 }
          ]
        },
        {
          id: 4,
          date: new Date().toDateString(),title: "Quarter Final",
          teams: [
            { id: 7, name: "測試高中F", score: 2 },
            { id: 8, name: "qergfe", score: 6 }
          ]
        }
      ]
    },
    {
      title: "Semi Final",
      seeds: [
        {
          id: 5,
          date: new Date().toDateString(),title: "Semi Final",
          teams: [
            { id: 1, name: "dog", score: 10 },
            { id: 3, name: "Beta", score: 6 }
          ]
        },
        {
          id: 6,
          date: new Date().toDateString(),title: "Semi Final",
          teams: [
            { id: 6, name: "eeeeee", score: 2 },
            { id: 8, name: "qergfe", score: 6 }
          ]
        }
      ]
    },
    {
      title: "Grand Final",
      seeds: [
        {
          id: 7,
          date: new Date().toDateString(),title: "Grand Final",
          teams: [
            { id: 1, name: "dog", score: 0 },
            { id: 8, name: "qergfe", score: 6 }
          ]
        }
      ]
    },
    {
      title: "Small Final",
      seeds: [
        {
          id: 8,
          date: new Date().toDateString(),title: "Small Final",
          teams: [
            { id: 3, name: "Beta", score: 1 },
            { id: 6, name: "eeeeee", score: 6 }
          ]
        }
      ]
    }
  ];
    return (
        <>
        <Accordion defaultActiveKey="0" className="brackets" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Winner Bracket</Accordion.Header>
            <Accordion.Body >
              <div className="brackets">
                  <TournamentBracket rounds={temprounds}/>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Elimination Bracket</Accordion.Header>
            <Accordion.Body>
              <div className="brackets">
                  <TournamentBracket rounds={temprounds}/>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </>
    )
    }
    
export default TourneyPage