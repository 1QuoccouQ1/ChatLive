type SidebarProps = {
  activeChat: number;
  setActiveChat: (chat: number) => void;
  setTypeChat: (chat: string) => void;
  toggleAddChats: () => void;
};
type TMembers = {
  id: string;
  username: string;
  pivot: TPivot;
};
type TPivot = {
  group_id: string;
  user_id: string;
  role: string;
};
type THookSideBar = {
  listChats: TDataSideBar[];
  listSearchs: TDataSideBar[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  handleSelectedChat: (item: TDataSideBar) => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchFocus: () => void;
  showSearchResults: boolean;
  searchResultsRef: React.RefObject<HTMLUListElement>;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
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
  avatar?: string;
  members?: TMembers[];
};

export { SidebarProps, THookSideBar, TDataSideBar };
