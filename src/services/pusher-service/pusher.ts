import Pusher, { Channel } from "pusher-js";

class PusherService {
  private pusher: Pusher | null = null;
  private channels: { [key: string]: Channel } = {}; 

  constructor() {
    this.pusher = null;
    this.channels = {}; 
  }

  initPusher(appKey: string, cluster: string) {
    if (!this.pusher) {
      this.pusher = new Pusher(appKey, {
        cluster: cluster,
      });
    }
  }

  subscribeToChannel(channelName: string, eventName: string, callback: (data: any) => void) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = this.pusher?.subscribe(channelName) as Channel; // Lưu Channel vào object
    }
    this.channels[channelName].bind(eventName, callback);
  }

  unsubscribeChannel(channelName: string) {
    if (this.channels[channelName]) {
      this.channels[channelName].unbind_all();
      this.pusher?.unsubscribe(channelName);
      delete this.channels[channelName]; 
    }
  }
}

const pusherService = new PusherService();
export default pusherService;

