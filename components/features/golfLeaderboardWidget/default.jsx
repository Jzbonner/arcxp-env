import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const golfLeadershipWidget = () => {
  const tour = 'pga';
  const year = '2020';
  const tournamentId = 'b681c361-bf1d-414a-98b5-a341671cd922';

  const leaderboardData = useContent({
    source: 'sportradarLeaderboard-api',
    query: {
      golfTour: `${tour}`,
      year: `${year}`,
      tournamentId: `${tournamentId}`,
    },
  });

  console.log(leaderboardData);

  if (leaderboardData) {
    return (
      <div className="leaderboard-widget sportsradar-widget">
        <div className="leaderboard-header">
          <h1>PGA Leaderboard</h1>
        </div>
        <div className="tour-info">
          <h5 className="tour-name">{leaderboardData.name}</h5>
          <p>{leaderboardData.start_date} - {leaderboardData.end_date}</p>
        </div>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Round 1</th>
              <th>Round 2</th>
              <th>Round 3</th>
              <th>Round4</th>
              <th>Total</th>
              <th>Thru</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(player => (
              <tr key={player.id}>
                <td key={player.id} className="player-rank">{player.position}{player.tied === true ? 't' : null}</td>
                <td key={player.id} className="player-name">{player.first_name} {player.last_name}</td>
                {player.rounds.map(round => (
                  <td key={player.id} className="player.round">{round.strokes}</td>
                ))}
                <td key={player.id} className="player-strokes">{player.score} ({player.strokes})</td>
                <td key={player.id} className="player-thru">12:40</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
  return null;
};

export default golfLeadershipWidget;

// import React, { useEffect, useState } from 'react';
// import './default.scss';

// const golfLeadershipWidget = () => {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch('https://dry-falls-89182.herokuapp.com/https://api.sportradar.us/golf-t2/leaderboard/pga/2015/tournaments/b681c361-bf1d-414a-98b5-a341671cd922/leaderboard.json?api_key=g96bba2r5x2v8x5vsfkgzq5r')
//       .then(res => res.json())
//       .then(
//         (result) => {
//           console.log(result);
//           setIsLoaded(true);
//           setItems(result.leaderboard);
//         },
//         (err) => {
//           setIsLoaded(true);
//           setError(err);
//         },
//       );
//   });

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="leaderboard-widget sportsradar-widget">
//       <div className="leaderboard-header">
//         <h1>PGA Leaderboard</h1>
//       </div>
//       <div className="tour-info">
//         <h5 className="tour-name">{items.name}</h5>
//         <p>{items.start_date} - {items.end_date}</p>
//       </div>
//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>Name</th>
//             <th>Round 1</th>
//             <th>Round 2</th>
//             <th>Round 3</th>
//             <th>Round4</th>
//             <th>Total</th>
//             <th>Thru</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(player => (
//             <tr key={player.id}>
//               <td key={player.id} className="player-rank">{player.position}{player.tied === true ? 't' : null}</td>
//               <td key={player.id} className="player-name">{player.first_name} {player.last_name}</td>
//               {player.rounds.map(round => (
//                 <td key={player.id} className="player.round">{round.strokes}</td>
//               ))}
//               <td key={player.id} className="player-strokes">{player.score} ({player.strokes})</td>
//               <td key={player.id} className="player-thru">12:40</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default golfLeadershipWidget;
