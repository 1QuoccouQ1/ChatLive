import Pusher, { Channel } from "pusher-js";

class PusherService {
  private pusher: Pusher | null = null;
  private channel: Channel | null = null;

  constructor() {
    this.pusher = null;
    this.channel = null;
  }

  initPusher(key, cluster) {
    if (!this.pusher) {
      this.pusher = new Pusher(key, {
        cluster: cluster,
        forceTLS: true,
      });
    }
  }

  subscribeToChannel(channelName, eventName, callback) {
    if (!this.pusher) {
      throw new Error("Pusher chưa được khởi tạo.");
    }

    this.channel = this.pusher.subscribe(channelName);
    this.channel.bind(eventName, function (data) {
      callback(data);
    });
  }

  unsubscribeChannel() {
    if (this.channel) {
      this.pusher?.unsubscribe(this.channel.name);
    }
  }
}

const pusherService = new PusherService();
export default pusherService;
