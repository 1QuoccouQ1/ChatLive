type Message = {
  id: number;
  sender: string;
  content: string;
};

type ChatAreaProps = {
  activeChat: string;
  toggleGroupInfo: () => void;
};

export { Message, ChatAreaProps };
