var axios = require("axios");
var id = "2a9f1481e564bcbb74c7";
var sec = "34b6771d1475e56c6bc6550b5a8cfc2e40ab74e4";
var params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
  return axios
    .get("https://api.github.com/users/" + username + params)
    .then((user) => {
      return user.data;
    });
}
function getRepos(username) {
  return axios.get(
    "https://api.github.com/users/" +
      username +
      "/repos" +
      params +
      "&per_page=100"
  );
}
function getStarCount(repos) {
  var cnt = 0;
  repos.data.forEach((repo) => {
    cnt += repo.stargazers_count;
  });
  return cnt;
}
function calculateStars(repos, profile) {
  var followers = profile.followers;
  var totalstars = getStarCount(repos);
  return followers * 3 + totalstars;
}
function handleError(error) {
  console.warn(error);
  return null;
}
function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then((data) => {
    var profile = data[0];
    var repos = data[1];
    // console.log(profile, repos);
    return { profile: profile, score: calculateStars(repos, profile) };
  });
}
function sortPlayers(players) {
  return players.sort((a, b) => {
    return b.score - a.score;
  });
}
module.exports = {
  battle: function (players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );
    return axios.get(encodedURI).then((res) => {
      return res.data.items;
    });
  },
};
