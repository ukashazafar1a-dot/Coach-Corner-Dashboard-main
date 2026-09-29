"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";
import useApp from "./useApp";
import { chatSocketURL } from "@/lib/utils";
import { chatMemberItem, chatGroupItem, chatView } from "@/helpers/types";
import ReconnectingWebSocket from "reconnecting-websocket";

// Connection states
type connectionState = "connected" | "disconnected" | "connecting";

interface SocketState {
  socket: ReconnectingWebSocket | null;
  connectionState: connectionState;
  currentUser: chatMemberItem | null;
  currentGroup: chatGroupItem | null;
  currentView: chatView;
}

const initialState: SocketState = {
  socket: null,
  connectionState: "disconnected",
  currentUser: null,
  currentGroup: null,
  currentView: "Direct",
};

// Action types
type SocketAction =
  | { type: "SET_CONNECTION"; payload: ReconnectingWebSocket | null }
  | { type: "SET_CONNECTION_STATE"; payload: connectionState }
  | { type: "SET_CURRENT_USER"; payload: chatMemberItem | null }
  | { type: "SET_CURRENT_GROUP"; payload: chatGroupItem | null }
  | { type: "SET_CURRENT_VIEW"; payload: chatView };

// Reducer function
const socketReducer = (
  state: SocketState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case "SET_CONNECTION":
      return { ...state, socket: action.payload };
    case "SET_CONNECTION_STATE":
      return { ...state, connectionState: action.payload };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        currentView: "Direct",
        currentGroup: null,
      };
    case "SET_CURRENT_GROUP":
      return {
        ...state,
        currentGroup: action.payload,
        currentView: "Group",
        currentUser: null,
      };
    case "SET_CURRENT_VIEW":
      return { ...state, currentView: action.payload };
    default:
      return state;
  }
};

interface SocketContextType extends SocketState {
  getConnection: () => Promise<ReconnectingWebSocket>;
  setCurrentUser: (user: chatMemberItem | null) => void;
  setCurrentGroup: (group: chatGroupItem | null) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);
  const { user,selectedTeam } = useApp();
  const socketRef = useRef<ReconnectingWebSocket | null>(null);

  const setCurrentUser = (user: chatMemberItem | null) => {
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  const setCurrentGroup = (group: chatGroupItem | null) => {
    dispatch({ type: "SET_CURRENT_GROUP", payload: group });
  };

  // Initialize WebSocket
  const initializeSocket = () => {
    if (socketRef.current) return; // Prevent multiple socket initializations

    //const toastId = toast.loading("Connecting to WebSocket...");
    const wsUrl = `${chatSocketURL}?access_token=${user?.token}&teamId=${selectedTeam?.id}`;

    const socket = new ReconnectingWebSocket(wsUrl, [], {
      connectionTimeout: 4000,
      maxRetries: 5,
      debug:true
    });

    socketRef.current = socket;

    dispatch({ type: "SET_CONNECTION", payload: socket  });
    dispatch({ type: "SET_CONNECTION_STATE", payload: "connecting" });

    socket.addEventListener("open", () => {
      //toast.success("WebSocket connected successfully.", { id: toastId });
      dispatch({ type: "SET_CONNECTION_STATE", payload: "connected" });
    });

    socket.addEventListener("close", () => {
      //toast.error("WebSocket connection lost. Reconnecting...", { id: toastId });
      dispatch({ type: "SET_CONNECTION_STATE", payload: "disconnected" });
    });

    // socket.addEventListener("message", (event) => {
    //   try {
    //     console.log(`Message Recieved....`);
    //   } catch (error) {
    //     console.error("Failed to parse message:", event.data);
    //   }
    // });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      //toast.error("An error occurred with WebSocket.", { id: toastId });
    });
  };
  const getConnection = async (): Promise<ReconnectingWebSocket> => {
    if (state.socket) {
      return state.socket;
    }

    initializeSocket();
    throw new Error("Connection in progress. Please wait.");
  };
  useEffect(() => {
    if (user && !socketRef.current) {
      if(selectedTeam){
        initializeSocket();
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        dispatch({ type: "SET_CONNECTION", payload: null });
        dispatch({ type: "SET_CONNECTION_STATE", payload: "disconnected" });
      }
    };
  }, [user,selectedTeam]);

  return (
    <SocketContext.Provider
      value={{
        ...state,
        setCurrentUser,
        setCurrentGroup,
        getConnection
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export { SocketProvider, useSocket };
