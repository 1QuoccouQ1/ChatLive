import { Search } from "lucide-react";
import React from "react";
import { InputSearchProps } from "./type";
import { useInputSearch } from "./hook";
import styles from './styles.module.scss'; 

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
    <div className={styles.inputWrapper}>
      <span
        className={styles.searchIcon}
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
        className={styles.inputField}
        placeholder="Tìm kiếm....."
      />
    </div>
  );
};

export default InputSearch;
