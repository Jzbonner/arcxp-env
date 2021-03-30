/* eslint-disable eol-last */
/* eslint-disable no-console */
import axios from 'axios';

const { sportradarAPIkey, sportradarAPIVersion, sportradarAccessLevel } = require('../../environment/index');

const params = {
  tour: 'text',
  year: 'text',
};

let scheduleData;

const fetch = (query) => {
  const { tour, year } = query;
  // let tournamentId;

  if (!tour || !year || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }

  const sportradarAPILink = `https://api.sportradar.us/golf/${sportradarAccessLevel}/${tour}/${sportradarAPIVersion}/en/${year}/tournaments/schedule.json?api_key=${sportradarAPIkey}`;

  const response = axios.get(sportradarAPILink, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  scheduleData = response.data;
  // scheduleData.tournaments.map((tournament) => (
  //   tournament.status == 'inprogress' ? tournamentId = tournament.id : tournamentId = '8fd31d7c-2357-448b-b16f-e1953fe77757'
  // ));
  const leaderboardData = axios.get(`https://api.sportradar.us/golf/${sportradarAccessLevel}/${tour}/${sportradarAPIVersion}/en/${year}/tournaments/e8d09c79-21e7-4c40-bde4-9f3f3a1e9d65/leaderboard.json?api_key=${sportradarAPIkey}`);
  console.log('Response', leaderboardData);

  const responseObj = {
    ScheduleData: scheduleData,
    LeaderboardData: leaderboardData,
  };

  return responseObj;
};

export default {
  fetch,
  params,
};