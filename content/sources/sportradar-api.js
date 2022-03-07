/* eslint-disable */
import axios from 'axios';
import { sportradarAPIkey, sportradarAPIVersion, sportradarAccessLevel } from 'fusion:environment';

const params = {
  tour: 'text',
  year: 'text',
  tournamentId: 'text',
};

const fetch = (query) => {
  const { tour, year, tournamentId } = query;

  if (!tour || !year || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }

  function getScheduleData() {
    const sportradarAPILink = `https://api.sportradar.us/golf/${sportradarAccessLevel}/${tour}/${sportradarAPIVersion}/en/${year}/tournaments/schedule.json?api_key=${sportradarAPIkey}`;
    return axios.get(sportradarAPILink, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }

  function getLeaderboardData() {
    const golfLeaderboardAPILink = `https://api.sportradar.us/golf/${sportradarAccessLevel}/${tour}/${sportradarAPIVersion}/en/${year}/tournaments/${tournamentId}/leaderboard.json?api_key=${sportradarAPIkey}`;
    return axios.get(golfLeaderboardAPILink, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }

  if (!tournamentId) {
    return getScheduleData().then(({data}) => data);
  } else {
    return getLeaderboardData(tournamentId).then(({data}) => data);
  }
};

export default {
  fetch,
  params,
};
