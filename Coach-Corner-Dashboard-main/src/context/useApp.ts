import { useContext } from "react";
import AppContext from "./AppContext";

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within a EditorProvider");
  }

  return context;
};

export default useApp;
