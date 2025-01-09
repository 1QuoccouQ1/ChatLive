import { TUserSearch } from "../AddChats/type";
import { TDataSideBar } from "../Sidebar/type";

type GroupInfoProps = {
  onClose: () => void;
  informationGroup: TDataSideBar;
};
type THookGroupInfo = {
  listMembers: TUserSearch[];
  removeMember: (id: number) => void;
  searchTerm: string;
  handleSearch: (term: string) => void;
  searchResults: TUserSearch[];
  addMember: (member: TUserSearch) => void;
  handleDeleteGroup: () => void;
};

export { GroupInfoProps, THookGroupInfo };
