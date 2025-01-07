import { Search } from "lucide-react";
import React, {
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { InputSearchProps } from "./type";
import { useInputSearch } from "./hook";

const InputSearch: React.FC<InputSearchProps> = ({
  onSearch,
  onFocus,
  onBlur,
  onQueryChange,
  onSetIsSearch,
  onSetLoading,
}) => {
  const {
    debouncedSearch,
    query,
    lastQuery,
    setLastQuery,
    handleChange,
    handleKeyDown,
  } = useInputSearch(onSearch, onSetIsSearch, onSetLoading, onQueryChange);

  return (
    <>
      <span
        className="absolute inset-y-0 left-0 flex items-center pl-3"
        onClick={() => {
          debouncedSearch.cancel();
          if (query.trim() !== "" && query !== lastQuery) {
            onSearch(query);
            setLastQuery(query);
          }
        }}
      >
        <Search className="w-5 h-5 text-gray-400" />
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className="border-none mx-2 w-full md:w-[270px] lg:w-[350px] bg-transparent focus:outline-none text-white text-sm placeholder-gray-600"
        placeholder="Tìm kiếm....."
      />
    </>
  );
};

export default InputSearch;
