type SidebarProps = {
  activeChat: number;
  setActiveChat: (chat: number) => void;
  setTypeChat: (chat: string) => void;
  toggleAddChats: () => void;
};
type THookSideBar = {
  filteredChats: TDataSideBar[];
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
};

export { SidebarProps, THookSideBar, TDataSideBar };
