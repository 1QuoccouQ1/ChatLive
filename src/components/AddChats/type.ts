type AddChatsProps = {
  onClose: () => void;
};

type TUserSearch = {
  id: number;
  username: string;
  avatar: string;
  email: string;
  pivot: TPivot;
};
type TPivot = {
  group_id: string;
  user_id: string;
  role: string;
};
type THookAddChats = {
  groupName: string;
  setGroupName: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  handleSearch: (term: string) => void;
  searchResults: TUserSearch[];
  addMember: (member: TUserSearch) => void;
  selectedMembers: TUserSearch[];
  removeMember: (id: number) => void;
  createGroup: () => void;
};

export { AddChatsProps, TUserSearch, THookAddChats };
