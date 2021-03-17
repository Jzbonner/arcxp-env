/* eslint-disable */
import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const golfLeadershipWidget = () => {
  const tour = 'pga';
  const year = '2020';
  const tournamentId = '6ba4893c-c82e-4269-a0ab-c99a05c854a8';

  const leaderboardData = useContent({
    source: 'sportradarLeaderboard-api',
    query: {
      golfTour: tour,
      year: year,
      tournamentId: tournamentId,
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
