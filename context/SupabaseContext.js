import { createContext, useContext } from "react";

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ client, children }) => (
  <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
);

export const useSupabase = () => useContext(SupabaseContext);
