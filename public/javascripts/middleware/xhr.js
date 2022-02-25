class XHR {
  constructor(url) {
    this.url = url;
    this.defaultHeader = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      accept: '*',
    };
    // 허용 된 xhr.status 값
    this.resolveStatus = [200];
  }

  bodyParser(data) {
    if (!(data instanceof FormData) && typeof data === 'object') {
      return JSON.stringify(data);
    }

    return data;
  }

  dataParser(xhr) {
    const contentType = xhr.getResponseHeader('Content-Type');
    const data = xhr.response;

    if (contentType && contentType.indexOf('json') !== -1) {
      return JSON.parse(data);
    } else {
      return data;
    }
  }

  send(config) {
    return new Promise((resolve, reject) => {
      try {
        const xhr = new XMLHttpRequest();
        if (!xhr) throw 'XMLHttpRquest의 인스턴스를 만들 수 없습니다.';

        // 객체 생성시 지정한 도메인과 하위 주소를 합치기
        const mergedUrl = typeof config.url === 'string' && config.url !== '/' ? this.url + config.url : this.url;

        xhr.open(config.method, mergedUrl);

        // 헤더 설정
        Object.entries({ ...this.defaultHeader, ...config.headers }).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });

        // 상태 변경 실행 함수
        xhr.onreadystatechange = () => {
          try {
            if (xhr.readyState === xhr.DONE) {
              if (this.resolveStatus.includes(xhr.status)) {
                resolve({
                  status: xhr.status,
                  data: this.dataParser(xhr),
                });
              } else {
                // 허용되지 않은 상태 코드 일 경우, 상태 코드와 응답 reject 처리
                reject({ status: xhr.status, data: xhr.response });
              }
            }
          } catch (error) {
            reject(error);
          }
        };

        xhr.send(this.bodyParser(config.body));
      } catch (error) {
        reject(error);
      }
    });
  }

  get(url, headers) {
    return this.send({
      method: 'GET',
      url,
      headers,
    });
  }

  post(url, body, headers) {
    return this.send({
      method: 'POST',
      url,
      body,
      headers,
    });
  }
}

// TEST
// (async () => {
//   const req = new XHR('http://localhost:3000/api');
//   const res = await req.get('/match');
//   const resPost = await req.post('/post', { test: 'test' });
//   console.log(res);
// })();
