import { createContext, useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  // " https://backendnizz.onrender.com"
  const axiosInstance = axios.create({
    baseURL: "https://backendnizz.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Intercept Axios requests to set loading state
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoadingState(true);
      return config;
    },
    (error) => {
      setLoadingState(false);
      return Promise.reject(error);
    }
  );

  // Intercept Axios responses to set loading state
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoadingState(false);
      return response;
    },
    (error) => {
      setLoadingState(false);
      return Promise.reject(error);
    }
  );

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoadingState,
        axiosInstance,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node,
};
