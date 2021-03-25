export default class Socket {

  constructor(api, id, handler){
    this.api = api
    this.subscribe(id)
    this.addListener()
    this.messageHandler = handler
  }

  setHandler = (func) => this.messageHandler = func

  subscribe = (id) => {
    this.socket = new WebSocket(this.api)
    this.id = id
    this.socket.onopen = () => {
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
            id: id,
            channel: 'ChannelChannel'
        }),
      }
      this.socket.send(JSON.stringify(msg))
    }
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
      console.log(msg)
      // Renders any newly created messages onto the page.
      if (msg.message) {
          this.messageHandler(msg.message)
      }
    };
  }
}
