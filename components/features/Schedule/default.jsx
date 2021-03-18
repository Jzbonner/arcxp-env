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
                </tr>
            </thead>
            <tbody>
            {scheduleData.tournaments
              .filter(
                tournament => (tournament.end_date >= today && tournament.status === 'scheduled'),
              )
              .map(tournament => (
                  <tr key={tournament.id}>
                      <td key={tournament.id} className="tournament-date">{tournamentDate(tournament.start_date, tournament.end_date)}</td>
                      <td key={tournament.id} className="tournament-name">{tournament.name}</td>
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
