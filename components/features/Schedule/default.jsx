import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const tournamentDate = (sDate, eDate) => {
  const mlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let tDate = null;

  const splitDate = (date) => {
    let dateArr = date.split('-');
    const monthIndex = dateArr[1] - 1;
    dateArr = [parseInt(dateArr[1], 10), parseInt(dateArr[2], 10), parseInt(dateArr[0], 10)];

    return {
      dateArr,
      monthIndex,
    };
  };

  const startDate = splitDate(sDate).dateArr;
  const endDate = splitDate(eDate).dateArr;
  const startMonthIndex = splitDate(sDate).monthIndex;
  const endMonthIndex = splitDate(eDate).monthIndex;

  if (startDate[0] === endDate[0]) {
    // eslint-disable-next-line no-const-assign
    tDate = `${mlist[startMonthIndex]} ${startDate[1]} - ${endDate[1]}, ${endDate[2]}`;
  } else {
    // eslint-disable-next-line no-const-assign
    tDate = `${mlist[startMonthIndex]} ${startDate[1]} - ${mlist[endMonthIndex]} ${endDate[1]}, ${endDate[2]}`;
  }
  return tDate;
};

const Schedule = () => {
  const tour = 'pga';
  const year = '2021';
  const scheduleData = useContent({
    source: 'sportradar-api',
    query: {
      tour: `${tour}`,
      year: `${year}`,
    },
  });

  if (scheduleData) {
    const date = new Date();
    const today = `${date.getFullYear()
    }-${
      (`0${date.getMonth() + 1}`).slice(-2)
    }-${
      date.getDate()}`;
    return (
      <div className="schedule-widget sportsradar-widget">
        <div className="schedule-header">
          <h1>Current PGA Schedule</h1>
        </div>
        <div className="b-margin-bottom-d40-m20"></div>
        <div>
          <table className="schedule-table">
            <thead>
                <tr>
                  <th>Date</th>
                  <th>Tournament</th>
                  <th>Defending Champion</th>
                </tr>
            </thead>
            <tbody>
            {scheduleData.tournaments
              .filter(
                tournament => (tournament.end_date >= today),
              )
              .map(tournament => (
                  <tr key={tournament.id}>
                      <td key={tournament.id} className="tournament-date">{tournamentDate(tournament.start_date, tournament.end_date)}</td>
                      <td key={tournament.id} className="tournament-name">{tournament.name}</td>
                      <td key={tournament.id} className="tournament-winner">{tournament.defending_champ == null ? ' ' : `${tournament.defending_champ.first_name} ${tournament.defending_champ.last_name}`}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="b-margin-bottom-d40-m20"></div>
        <div>
          <div className="schedule-subheader">
            <h5>Past Tournament</h5>
          </div>
          <table className="schedule-table">
            <thead>
                <tr>
                  <th>Date</th>
                  <th>Tournament</th>
                  <th>Winner</th>
                </tr>
            </thead>
            <tbody>
            {scheduleData.tournaments
              .filter(
                tournament => (tournament.end_date < today && tournament.status === 'closed'),
              )
              .sort((a, b) => b.end_date.localeCompare(a.end_date))
              .map(tournament => (
                  <tr key={tournament.id}>
                      <td key={tournament.id} className="tournament-date">{tournamentDate(tournament.start_date, tournament.end_date)}</td>
                      <td key={tournament.id} className="tournament-name">{tournament.name}</td>
                      <td key={tournament.id} className="tournament-winner">{tournament.winner == null ? ' ' : `${tournament.winner.first_name} ${tournament.winner.last_name}`}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="b-margin-bottom-d40-m20"></div>
      </div>

    );
  }
  return null;
};

export default Schedule;
