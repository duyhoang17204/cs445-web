import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

const useAppContext = () => {
  const context = useContext(AppContext);
  return {
    ...context,
  };
};

export default useAppContext;
