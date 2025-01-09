type SidebarProps = {
  activeChat: number;
  setActiveChat: (chat: number) => void;
  setTypeChat: (chat: string) => void;
  toggleAddChats: () => void;
};
type TMembers = {
  id: string;
  username: string;
};
type THookSideBar = {
  listChats: TDataSideBar[];
  listSearchs: TDataSideBar[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  handleSelectedChat: (item: TDataSideBar) => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};
type TDataSideBar = {
  id: number;
  username?: string;
  email?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  content?: string;
  sender?: string;
  sender_username?: string;
  sender_id?: string;
  latest_message?: string;
  members?: TMembers[];
};

export { SidebarProps, THookSideBar, TDataSideBar };
