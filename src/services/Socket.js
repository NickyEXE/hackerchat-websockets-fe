export default class Socket {

  constructor(api){
    this.api = api
    this.socket = new WebSocket(api);
    this.messageHandler = console.log
    this.addListener()
  }

  setHandler = (func) => this.messageHandler = func

  subscribe = (id) => {
    this.id = id
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
          id: this.id,
          channel: 'ChannelChannel'
      }),
    }
    this.socket.send(JSON.stringify(msg));
  }

  unsubscribe = () => {
    const msg = {
      command: 'unsubscribe',
      identifier: JSON.stringify({
          id: this.id,
          channel: 'ChannelChannel'
      }),
    }
    this.socket.send(JSON.stringify(msg));
  }

  addListener = () => {
    this.socket.onmessage = (event) => {
      const response = event.data;
      const msg = JSON.parse(response);
      // Ignores pings.
      if (msg.type === "ping") {
          return;
      }
      // Renders any newly created messages onto the page.
      if (msg.message) {
          this.messageHandler(msg.message)
      }
    };
  }
}
