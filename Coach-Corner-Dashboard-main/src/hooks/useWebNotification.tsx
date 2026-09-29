"use client";
import { Site } from "@/helpers/Site";
import { useState, useCallback } from "react";

interface NotificationHookResult {
  sendMessage: (title: string, options?: NotificationOptions) => void;
  askForPermission: () => Promise<NotificationPermission>;
  permission: NotificationPermission;
  error: string | null;
}

export const useWebNotification = (): NotificationHookResult => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission || "default"
  );
  const [error, setError] = useState<string | null>(null);

  const askForPermission = async (): Promise<NotificationPermission> => {
    if (!("Notification" in window)) {
      setError("This browser does not support desktop notification");
      return "denied";
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (err) {
      setError("Error requesting notification permission");
      return "denied";
    }
  };

  const sendMessage = (title: string, options?: NotificationOptions) => {
    if (!("Notification" in window)) {
      setError("This browser does not support desktop notification");
      return;
    }

    if (permission !== "granted") {
      setError("Notification permission not granted");
      return;
    }

    try {
      new Notification(title, {
        body: options?.body || "",
        icon: options?.icon || Site?.placeholder,
        ...options,
      });
    } catch (err) {
      setError("Failed to send notification");
      console.error("Notification error:", err);
    }
  };

  return {
    sendMessage,
    askForPermission,
    permission,
    error,
  };
};
