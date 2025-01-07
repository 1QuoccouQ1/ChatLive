import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAllGroups,
  getMembers,
} from "../../services/api-service/api-service";
import { THookInputSearch } from "./type";

export const useInputSearch = (
  onSearch,
  onSetIsSearch,
  onSetLoading,
  onQueryChange
): THookInputSearch => {
  const [query, setQuery] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");

  const debouncedSearch = useDebounce((searchQuery: string) => {
    if (searchQuery.trim() !== "" && searchQuery !== lastQuery) {
      onSearch(searchQuery);
      setLastQuery(searchQuery);
    }
  }, 1000);

  function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
  ) {
    const timeoutRef = useRef<number | null>(null);

    const debouncedFn = useCallback(
      (...args: Parameters<T>) => {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );

    const cancel = () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };

    return Object.assign(debouncedFn, { cancel });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value !== "") {
      onSetIsSearch(true);
      onSetLoading(true);
    } else {
      onSetIsSearch(false);
      onSetLoading(false);
    }
    setQuery(value);
    debouncedSearch(value);
    onQueryChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      debouncedSearch.cancel();
      if (query.trim() !== "" && query !== lastQuery) {
        onSearch(query);
        setLastQuery(query);
      }
    }
  };
  return {
    debouncedSearch,
    query,
    lastQuery,
    setLastQuery,
    handleChange,
    handleKeyDown,
  };
};
