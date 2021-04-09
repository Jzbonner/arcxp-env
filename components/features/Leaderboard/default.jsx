/* eslint-disable */
import React, { useRef } from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const Leaderboard = () => {
  const tour = 'pga';
  const year = '2021';
  let tournamentId;
  // const ref = useRef(null);

  const scheduleData = useContent({
    source: 'sportradar-api',
    query: {
      tour: tour,
      year: year,
    },
  });

  let tournaments = scheduleData.tournaments;
  for (let i = 28; i < tournaments.length; i++) {
    if (tournaments[i].status === "inprogress" || tournaments[i].status === "closed") {
      if (tournaments[i].event_type === "stroke") {
        tournamentId = tournaments[i].id;
      }
    }
  }

  const leaderboardData = useContent({
    source: 'sportradar-api',
    query: {
      tour: tour,
      year: year,
      tournamentId: tournamentId,
    },
  });

  // const scroll = (scrollOffset) => {
  //   ref.current.scrollLeft += scrollOffset;
  // };

  if (leaderboardData) {
    return (
      <div className="leaderboard-widget sportsradar-widget">
        <div className="leaderboard-header">
          <h1>PGA Leaderboard</h1>
        </div>
        <div className="tour-info">
          <h5 className="tour-name">{leaderboardData.name}</h5>
          <p>Start: {leaderboardData.start_date} - End: {leaderboardData.end_date}</p>
        </div>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="player-rank">Rank</th>
              <th className="player-name">Name</th>
              {/* <div className="scrollable-div"> */}
              <th className="player-round">Round 1</th>
              <th className="player-round">Round 2</th>
              <th className="player-round">Round 3</th>
              <th className="player-round">Round 4</th>
              <th className="player-strokes">Total</th>
              <th className="player-thru">Thru</th>
              {/* </div> */}
            </tr>
          </thead>
          <tbody>
            {/* <button onClick={() => scroll(-20)}>LEFT</button> */}
            {Array.from(leaderboardData.leaderboard).map(player => (
              <tr key={player.id}>
                <td className="player-rank">{player.position}{player.tied == true ? 't' : null}</td>
                <td className="player-name">{player.first_name} {player.last_name}</td>
                {/* <div className="scrollable-div"> */}
                <td className="player-round">{player.rounds[0] ? player.rounds[0].strokes : '-'}</td>
                <td className="player-round">{player.rounds[1] ? player.rounds[1].strokes : '-'}</td>
                <td className="player-round">{player.rounds[2] ? player.rounds[2].strokes : '-'}</td>
                <td className="player-round">{player.rounds[3] ? player.rounds[3].strokes : '-'}</td>
                <td className="player-strokes">{player.score} ({player.strokes})</td>
                <td className="player-thru">{player.rounds[player.rounds.length - 1].thru === 18 ? 'F' : player.rounds[player.rounds.length -1].thru === 0 && player.rounds[player.rounds.length -2].thru === 18 ? 'F' : player.rounds[player.rounds.length -1].thru === 0 ? player.rounds[player.rounds.length -2].thru : player.rounds[player.rounds.length - 1].thru}</td>
                {/* </div> */}
              </tr>
            ))}
            {/* <button onClick={() => scroll(20)}>RIGHT</button> */}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default Leaderboard;
