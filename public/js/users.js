// Init users module
function init() {
  var userList = [];
  // global selectors
  var fetchBtn = document.querySelector('#fetch-users');
  var addBtn = document.querySelector('#add-user');
  var usersSection = document.querySelector('section.users');

  function createElement(tag, className) {
    var element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  function renderTable(list) {
    usersSection.innerHTML = '';
    var table = createElement('table');
    var tbody = '<tbody>';
    tbody += '<tr><th>users:</th><th>actions:</th></tr>';

    list.forEach(function(el) {
      tbody += renderUserRow(el);
    });

    tbody += '</tbody>';
    table.innerHTML = tbody;
    usersSection.append(table);
    table.addEventListener('click', handleUserActions);
  }

  function renderUserRow(user) {
    return `
      <tr>
        <td><span class="user-name">${user.name}</span></td>
        <td>
          <span class="user-controls">
            <a href="#" class="update" data-name="${user.name}">Update</a>
            <a href="#" class="delete" data-name="${user.name}">Delete</a>
          </span>
        </td>
      </tr>
    `;
  }

  function renderMessage() {
    var p = createElement('p', 'error-message');
    p.innerText = 'Currently no user is present in the database...';
    usersSection.append(p);
  }

  function updateList(data) {
    userList.length = 0;

    if (data.length > 0) {
      userList.push.apply(userList, data);
      renderTable(data);
    } else {
      renderMessage();
    }
  }

  function fetchUsers() {
    var table = usersSection.querySelector('table');
    if (table) {
      table.removeEventListener('click', handleUserActions);
    }

    var users_url = window.location.origin + '/api/users';
    axios(users_url)
      .then(res => updateList(res.data))
      .catch(err => console.log(err));
  }

  function handleUserActions(evt) {
    evt.preventDefault();

    var eName = evt.target.innerText.toLowerCase();
    if (eName === 'update') {
      updateUser(getUser(evt.target));
    } else if (eName === 'delete') {
      deleteUser(getUser(evt.target));
    }
  }

  function getUser(el) {
    var userName = el.dataset.name;
    return findUserByName(userList, userName);
  }

  function normalizeName(name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  }

  function updateUser(user) {
    var url = window.location.origin + '/api/users/' + user._id;
    var newName = prompt('Enter new name:(name should be longer than 1 symbol)', '');

    if (newName !== null && newName.length > 1) {
      axios({
        method: 'put',
        url: url,
        data: {
          name: normalizeName(newName),
        },
      })
        .then(res => console.log(res.data))
        .then(() => fetchUsers())
        .catch(err => console.log(err));
    } else {
      alert('Invalid name, try again!');
    }
  }

  function deleteUser(user) {
    var url = window.location.origin + '/api/users/' + user._id;

    axios({
      method: 'delete',
      url: url
    })
      .then(res => console.log(`User ${res.data.name} deleted`))
      .then(() => fetchUsers())
      .catch(err => console.log(err));
  }

  function findUserByName(list, name) {
    var user = list.find(el => el.name === name);
    return user;
  }

  fetchBtn.addEventListener('click', fetchUsers);
}

document.addEventListener('DOMContentLoaded', init);
