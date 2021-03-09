import React, { useEffect, useState } from 'react';

const golfLeadershipWidget = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://dry-falls-89182.herokuapp.com/https://api.sportradar.us/golf-t2/leaderboard/pga/2015/tournaments/b681c361-bf1d-414a-98b5-a341671cd922/leaderboard.json?api_key=g96bba2r5x2v8x5vsfkgzq5r')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.leaderboard);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        },
      );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="leaderboard-widget">
      <div className="leaderboard-header">
        <h1>PGA</h1>
        <h3>Leaderboard</h3>
      </div>
      <div>
        <h5 className="tour-name">{items.name}</h5>
        <p>{items.start_date} - {items.end_date}</p>
      </div>
      <table>
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
          {items.map(player => (
            <tr key={player.id}>
              <td key={player.id}>{player.position}{player.tied === true ? 't' : null}</td>
              <td key={player.id}>{player.first_name} {player.last_name}</td>
              {player.rounds.map(round => (
                <td key={player.id}>{round.strokes}</td>
              ))}
              <td key={player.id}>{player.score} ({player.strokes})</td>
              <td key={player.id}>12:40</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default golfLeadershipWidget;
