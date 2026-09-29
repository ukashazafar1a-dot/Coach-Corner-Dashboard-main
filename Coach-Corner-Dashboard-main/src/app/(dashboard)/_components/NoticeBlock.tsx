import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hoursAgo } from "@/lib/utils";
const notices = [
  {
    title: "Scheduled Maintenance Notification",
    description:
      "Our platform will be undergoing scheduled maintenance on March 15th, 2025, from 12:00 AM to 3:00 AM CST. During this time, some features may be unavailable. We apologize for any inconvenience and appreciate your understanding.",
    excerpt:
      "Scheduled maintenance on March 15th, 2025. Limited platform availability.",
    status: "Active",
    priority: "High",
    date: "2025-01-05T20:30:00Z",
  },
  {
    title: "New Feature Alert: Video Analysis Tools",
    description:
      "We are excited to announce the release of our new Video Analysis Tools! Coaches can now upload, review, and share game footage with detailed annotations. This feature helps teams understand gameplay and improve strategies effectively.",
    excerpt: "New Video Analysis Tools now available for all users.",
    status: "Active",
    priority: "Medium",
    date: "2025-01-05T20:30:00Z",
  },
  {
    title: "Holiday Support Hours",
    description:
      "Please note that our support team will have limited availability during the holiday season from December 24th, 2024, to January 2nd, 2025. For urgent issues, email us at support@thecoachcorner.com, and we will respond as soon as possible.",
    excerpt: "Limited support hours during the holidays.",
    status: "Active",
    priority: "Low",
    date: "2025-01-05T20:30:00Z",
  },
  {
    title: "Upcoming Webinar: Game Planning Masterclass",
    description:
      "Join us for an exclusive webinar on April 10th, 2025, where our certified coaches will share advanced game-planning techniques. Register now to secure your spot and gain insights into building winning strategies for your team.",
    excerpt: "Register for our Game Planning Masterclass on April 10th, 2025.",
    status: "Active",
    priority: "Medium",
    date: "2025-01-05T20:30:00Z",
  },
  {
    title: "System Update Completed Successfully",
    description:
      "We have completed the scheduled system update on January 5th, 2025. The platform is now up and running with enhanced performance and minor bug fixes. Thank you for your patience during this process.",
    excerpt: "System update completed. Platform performance improved.",
    status: "Resolved",
    priority: "Low",
    date: "2025-01-05T20:30:00Z",
  },
];

const NoticeBlock = () => {
  return (
    <Card className="w-full mb-3">
      <CardHeader className="p-4 space-y-0">
        <CardTitle className="mb-0 text-base">Recent Notices</CardTitle>
        <CardDescription className="mt-0">
          All the recent notices for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {notices?.map((notice, index) => {
          return (
            <div
              className="flex items-start justify-between py-2 border-b last:border-none mb-2"
              key={index}
            >
              <div className="block">
                <p className="text-sm font-medium leading-none">
                  {notice?.title}
                </p>
                <p className="text-sm text-muted-foreground two-lines inline">
                  {notice?.excerpt} 
                </p>
                <span className="text-xs text-green-600 font-medium">{hoursAgo(notice?.date)}</span>
              </div>
              <div className="text-xs font-medium">
                <p className="leading-none">{notice?.priority}</p>
              </div>
            </div>
          );
        })}
        <span className="py-1 mx-auto text-sm text-gray-600 block underline">View All</span>
      </CardContent>
    </Card>
  );
};

export default NoticeBlock;
