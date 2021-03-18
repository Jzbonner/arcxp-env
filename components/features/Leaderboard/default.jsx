/* eslint-disable */
import React, {useRef } from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const Leaderboard = () => {
  const tour = 'pga';
  const year = '2021';
  const tournamentId = '6ba4893c-c82e-4269-a0ab-c99a05c854a8';
  // const ref = useRef(null);

  const leaderboardData = useContent({
    source: 'sportradarLeaderboard-api',
    query: {
      golfTour: tour,
      year: year,
      tournamentId: tournamentId,
    },
  });

  // const scroll = (scrollOffset) => {
  //   ref.current.scrollLeft += scrollOffset;
  // };

  // console.log(leaderboardData);

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
              <th className="player-rank">Rank</th>
              <th className="player-name">Name</th>
              {/* <div className="scrollable-div"> */}
                <th className="player-round">Round 1</th>
                <th className="player-round">Round 2</th>
                <th className="player-round">Round 3</th>
                <th className="player-round">Round4</th>
                <th className="player-strokes">Total</th>
                <th className="player-thru">Thru</th>
              {/* </div> */}
            </tr>
          </thead>
          <tbody>
            {/* <button onClick={() => scroll(-20)}>LEFT</button> */}
            {Array.from(leaderboardData.leaderboard).map(player => (
              <tr key={player.id}>
                <td className="player-rank">{player.position}{player.tied === true ? 't' : null}</td>
                <td className="player-name">{player.first_name} {player.last_name}</td>
                {/* <div className="scrollable-div"> */}
                    {player.rounds.map(round => (
                      <td className="player-round">{round.strokes}</td>
                    ))}
                    <td className="player-strokes">{player.score} ({player.strokes})</td>
                    <td className="player-thru">12:40</td>
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
