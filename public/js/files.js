'use strict';
// Init files module
function init() {
  var fileList;
  // global selectors
  var getBtn = document.querySelector('#get-files');
  var filesSection = document.querySelector('section.files');

  function createElement(tag, className) {
    var element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  function renderTable(list) {
    filesSection.innerHTML = '';
    var table = createElement('table');
    var tbody = '<tbody>';
    tbody += '<tr><th>files:</th></tr>';

    list.forEach(function(el) {
      tbody += renderFileRow(el);
    });

    tbody += '</tbody>';
    table.innerHTML = tbody;
    filesSection.append(table);
    // table.addEventListener('click', handleUserActions);
  }

  function renderFileRow(file) {
    return `
      <tr>
        <td><span class="file-name">${file}</span></td>
      </tr>
    `;
  }

  function renderMessage() {
    var p = createElement('p', 'error-message');
    p.innerText = "You don't have any file uploaded";
    usersSection.append(p);
  }

  function getFileList() {
    // var table = filesSection.querySelector('table');
    var files_url = window.location.origin + '/api/files';
    axios(files_url)
      .then(res => updateFileList(res.data))
      .catch(err => console.log(err));
  }

  function updateFileList(data) {
    fileList = [];
    if (data.files.length > 0) {
      [].push.apply(fileList, data.files);
      renderTable(data.files);
    } else {
      renderMessage();
    }
  }

  getBtn.addEventListener('click', getFileList);
}

document.addEventListener('DOMContentLoaded', init);
