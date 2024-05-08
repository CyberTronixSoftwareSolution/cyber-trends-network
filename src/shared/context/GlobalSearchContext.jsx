import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const GlobalSearchContext = createContext({});

export const useGlobalSearch = () => {
  return useContext(GlobalSearchContext);
};

export const GlobalSearchProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = useState("");

  const setGlobalSearchValue = (searchValue) => {
    setGlobalSearch(searchValue);
  };
  return (
    <GlobalSearchContext.Provider
      value={{
        globalSearch,
        setGlobalSearchValue,
      }}
    >
      {children}
    </GlobalSearchContext.Provider>
  );
};

GlobalSearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
