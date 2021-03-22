import React from 'react';
import { useContent } from 'fusion:content';
import './default.scss';

const tournamentDate = (sDate, eDate) => {
  const mlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startDate = new Date(sDate);
  const endDate = new Date(eDate);
  const tDate = `${mlist[startDate.getMonth()]}. ${startDate.getDate()} - ${mlist[endDate.getMonth()]}. ${endDate.getDate()}`;
  return tDate;
};

const isCurrYear = (eDate) => {
  const endDate = new Date(eDate);
  const date = new Date();
  if (endDate.getFullYear() === date.getFullYear()) {
    return true;
  }
  return false;
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
          <h1>PGA Schedule</h1>
        </div>
        <div className="b-margin-bottom-d40-m20"></div>
        <div>
          <div className="schedule-subheader">
            <h5>Current Tournament</h5>
          </div>
          <table className="schedule-table">
            <thead>
                <tr>
                  <th>Date</th>
                  <th>Tournament/Course</th>
                  <th>Defending Champion</th>
                </tr>
            </thead>
            <tbody>
            {scheduleData.tournaments
              .filter(
                tournament => (tournament.start_date <= today && tournament.end_date >= today && tournament.status === '1inprogress'),
              )
              .map(tournament => (
                  <tr key={tournament.id}>
                      <td key={tournament.id} className="tournament-date">{tournamentDate(tournament.start_date, tournament.end_date)}</td>
                      <td key={tournament.id} className="tournament-name">{tournament.name}</td>
                      <td key={tournament.id} className="tournament-defchamp">{tournament.defending_champ.first_name}&nbsp;{tournament.defending_champ.last_name}</td>
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
                tournament => (tournament.end_date < today && tournament.status === 'closed' && isCurrYear(tournament.end_date)),
              )
              .sort((a, b) => b.end_date.localeCompare(a.end_date))
              .map(tournament => (
                  <tr key={tournament.id}>
                      <td key={tournament.id} className="tournament-date">{tournamentDate(tournament.start_date, tournament.end_date)}</td>
                      <td key={tournament.id} className="tournament-name">{tournament.name}</td>
                      <td key={tournament.id} className="tournament-winner">{tournament.winner.first_name}&nbsp;{tournament.winner.last_name}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
  return null;
};

export default Schedule;
