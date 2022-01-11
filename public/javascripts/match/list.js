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
  let result = `
        <div class="row">
          <div class="col text-center">번호</div>
          <div class="col col-3 text-center">상대팀</div>
          <div class="col col-3 text-center">날짜</div>
          <div class="col col-3 text-center">장소</div>
          <div class="col text-center">득점</div>
          <div class="col text-center">실점</div>
        </div>
  `;
  for (let i = 0; i < lists.length; i++) {
    const list = lists[i];
    result += `
    <div class="row">
      <div class="col text-center">${i + 1}</div>
      <div class="col col-3 text-center">${list.otherTeam}</div>
      <div class="col col-3 text-center">${list.date}</div>
      <div class="col col-3 text-center">${list.location}</div>
      <div class="col text-center">${list.goalsFor}</div>
      <div class="col text-center">${list.goalsAgainst}</div>
    </div>
    `;
  }
  return result;
}
