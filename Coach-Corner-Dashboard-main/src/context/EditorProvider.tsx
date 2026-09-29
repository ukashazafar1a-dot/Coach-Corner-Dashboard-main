"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define the shape of your state
interface EditorState {
  toggleMenu: boolean;
}

// Define action types
type EditorAction = { type: "SET_SIDEBAR"; payload: boolean };

// Create an initial state
const initialState: EditorState = {
  toggleMenu: false,
};

// Create a reducer function
const themeReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "SET_SIDEBAR":
      return { ...state, toggleMenu: action.payload };
    default:
      return state;
  }
};

interface EditorContextType extends EditorState {
  toggleSidebar: (value: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Create a context provider component
interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleSidebar = (value: boolean) => {
    dispatch({ type: "SET_SIDEBAR", payload: value });
  };

  return (
    <EditorContext.Provider value={{ ...state, toggleSidebar }}>
      {children}
    </EditorContext.Provider>
  );
};

// Create a custom hook for using the context
const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);

  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }

  return context;
};

export { EditorProvider, useEditor };
