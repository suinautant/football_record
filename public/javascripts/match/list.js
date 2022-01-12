var httpRequest;
makeRequest();

function makeRequest() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('GET', '/api/match');
  httpRequest.send();
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      document.querySelector('#jsTable').innerHTML = listMatch();
    } else {
      document.querySelector('#jsRoot').innerHTML = 'API 오류';
    }
  }
}

function listMatch() {
  const lists = JSON.parse(httpRequest.responseText);
  let result = '';
  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    result += `
      <tr>
        <td class="text-center">${i + 1}</td>
        <td class="text-center">${list.competition}</td>
        <td class="text-center">${list.round}</td>
        <td class="text-center">
          <a href="/match/${list.idx}" style="color: #000; text-decoration: none"> 
            ${list.other_team} 
          </a> 
        </td>
        <td class="text-center"> ${list.date} </td>
        <td class="text-center">${list.location}</td>
        <td class="text-center">${list.goals_for}</td>
        <td class="text-center">${list.goals_against}</td>
      </tr>
                `;
  }
  return result;
}
