import { createContext, useContext } from 'react';
import { apiService } from '../utils/api';

const ApiContext = createContext(apiService);

export const ApiProvider = ({ children }) => (
    <ApiContext.Provider value={apiService}>{children}</ApiContext.Provider>
);

// export const useApi = () => useContext(ApiContext);
export const useApi = () => useContext(ApiContext);