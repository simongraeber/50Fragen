import { io, Socket } from "socket.io-client";
import store from "@/lib/store";
import { setOnline, setOffline } from "@/reducers/onlineStatusReducer";
import { toast } from "@/components/ui/use-toast.ts";
import { baseURL } from "@/lib/http";

export const socketServerURL = "http://localhost:4000"// TODO use baseURL + "/quiz-session";

let socket: Socket | null = null;
let eventQueue: { event: string; callback?: (...args: any[]) => void }[] = [];

const processEventQueue = (): void => {
  while (eventQueue.length > 0) {
    const { callback } = eventQueue.shift()!;
    if (callback) callback();
  }
};

const handleError = (errorMessage: unknown) => {
  console.error("Socket IO Error:: ", errorMessage);
  if (errorMessage) {
    toast({
      title: "Socket IO Error",
      description: String(errorMessage),
      variant: "destructive",
    });
  }
  throw Error(String(errorMessage));
};

export const initializeSocket = (): void => {
  console.log("Initializing socket");
  if (!socket) {
    socket = io(socketServerURL);

    socket.on("connect", () => {
      store.dispatch(setOnline());
      console.log("Socket is connected");
    });

    socket.on("disconnect", () => {
      store.dispatch(setOffline());
      console.log("Socket is disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error(`Connect error due to: ${err.message}`);
    });

    processEventQueue();
    onEvent("errorEvent", handleError);
  } else {
    console.warn(
      "Socket already initialized—this may only occur accidentally in development."
    );
  }
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    store.dispatch(setOffline());
  }
};

const handleSocketError = (error: never): void => {
  handleError(error);
};

export const emitEvent = <T>(event: string, data?: T): void => {
  if (socket) {
    socket.emit(event, data, (error: never) => {
      if (error) handleSocketError(error);
    });
  } else {
    eventQueue.push({ event, callback: () => emitEvent(event, data) });
    console.warn("Socket not initialized. Event queued: ", event);
  }
};

export const onEvent = <T>(event: string, callback: (data: T) => void): void => {
  if (socket) {
    socket.on(event, callback);
  } else {
    eventQueue.push({ event, callback: () => onEvent(event, callback) });
    console.warn("Socket not initialized. Event queued: ", event);
  }
};

export const offEvent = (event: string): void => {
  if (socket) {
    socket.off(event);
  } else {
    eventQueue = eventQueue.filter((e) => e.event !== event);
    console.warn("Socket not initialized. Event removed from queue: ", event);
  }
};