class XHR {
  constructor(url) {
    this.url = url;
    this.defaultHeader = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      accept: '*',
    };
    this.resolveStatus = [200];
  }

  send(config) {
    return config;
  }

  get() {
    console.log(this.url);
    console.log(this.send('get'));
  }

  post() {
    console.log(this.url);
    console.log(this.send('post'));
  }
}
