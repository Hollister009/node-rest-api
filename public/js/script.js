// API calls
var userList = [];

function updateList(data) {
  if (data.length > 0) {
    userList.push.apply(userList, data);
  }
  console.log(userList);
}

function init() {
  var users_url = window.location.origin + '/api/users';

  axios(users_url)
    .then(res => updateList(res.data))
    .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', init);
