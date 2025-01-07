import Action from "pusher-js/types/src/core/connection/protocol/action";
import React from "react";

type InputSearchProps = {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onQueryChange: (query: string) => void;
  onSetIsSearch: (isSearch: boolean) => void;
  onSetLoading: (isLoading: boolean) => void;
};
type THookInputSearch = {
  debouncedSearch: ((searchQuery: string) => void) & {
    cancel: () => void;
  };
  query: string;
  lastQuery: string;
  setLastQuery: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export { InputSearchProps, THookInputSearch };
