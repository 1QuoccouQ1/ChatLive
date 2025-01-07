type Message = {
  id: number;
  sender: string;
  content: string;
};

type ChatAreaProps = {
  activeChat: number;
  typeChat: string;
  toggleGroupInfo: () => void;
};

export { Message, ChatAreaProps };
