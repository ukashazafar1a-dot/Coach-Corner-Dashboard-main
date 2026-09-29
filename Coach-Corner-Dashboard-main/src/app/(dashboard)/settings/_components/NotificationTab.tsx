"use client";
import { useState } from "react";
import { LuMessageSquare } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const NotificationTab = () => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    notice: false,
    post: false,
    chat: false,
    approvals: false,
  });
  const [smsSettings, setSmsSettings] = useState({
    notice: false,
    post: false,
    chat: false,
    approvals: false,
  });

  const toggleEmailSetting = (setting: keyof typeof emailSettings) => {
    setEmailSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const toggleSmsSetting = (setting: keyof typeof smsSettings) => {
    setSmsSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className="container ms-0 me-auto px-0 pb-4 md:pb-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Notification Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaRegBell className="mr-2" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Receive notifications on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="push-notifications"
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
            />
            <label htmlFor="push-notifications">
              Enable push notifications
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AiOutlineMail className="mr-2" />
            Email Notifications
          </CardTitle>
          <CardDescription>{`Choose which emails you'd like to receive`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(emailSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label htmlFor={`email-${key}`} className="flex-grow">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <Switch
                  id={`email-${key}`}
                  checked={value}
                  onCheckedChange={() =>
                    toggleEmailSetting(key as keyof typeof emailSettings)
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LuMessageSquare className="mr-2" />
            SMS Notifications
          </CardTitle>
          <CardDescription>{`Choose which SMS alerts you'd like to receive`}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(smsSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label htmlFor={`sms-${key}`} className="flex-grow">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <Switch
                  id={`sms-${key}`}
                  checked={value}
                  onCheckedChange={() =>
                    toggleSmsSetting(key as keyof typeof smsSettings)
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="bg-white">
        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">Communication emails</div>
              <div className="text-sm text-gray-500">Receive emails about your account activity.</div>
            </div>
            <div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
