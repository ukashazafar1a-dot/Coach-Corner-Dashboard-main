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
import { MdLocationOn } from "react-icons/md";

const notices = [
  {
    title: "Offensive Drills",
    date: "2025-02-15",
    time: "10:00 AM",
    location: "Highland Sports Complex",
    description:
      "Focus on offensive plays and improving shooting accuracy. Ensure players understand positioning during fast breaks.",
    attendees: ["John Doe", "Alice Smith", "Michael Johnson"],
  },
  {
    title: "Defensive Strategy Practice",
    date: "2025-02-18",
    time: "3:00 PM",
    location: "Downtown Community Gym",
    description:
      "Work on defensive formations and techniques, including zone defense and man-to-man coverage.",
    attendees: ["Emily Davis", "James Brown", "Sarah Wilson"],
  },
  {
    title: "Team Scrimmage",
    date: "2025-02-20",
    time: "5:30 PM",
    location: "Greenfield Sports Arena",
    description:
      "Simulated game practice to assess team dynamics and individual performance under game conditions.",
    attendees: ["Full Team"],
  },
  {
    title: "Conditioning and Fitness",
    date: "2025-02-22",
    time: "8:00 AM",
    location: "Eastwood Fitness Center",
    description:
      "Strength and conditioning drills to improve endurance and agility. Players should bring water and wear athletic attire.",
    attendees: ["Mark Lee", "Jennifer Taylor", "Team Trainers"],
  },
  {
    title: "Special Teams Practice",
    date: "2025-02-25",
    time: "6:00 PM",
    location: "North Ridge Training Facility",
    description:
      "Concentrate on special teams' plays, including free throws and set-piece strategies.",
    attendees: ["Andrew Walker", "Sophia Green", "Jacob Martinez"],
  },
];
const PracticeBlock = () => {
  return (
    <Card className="w-full">
      <CardHeader className="p-4 space-y-0">
        <CardTitle className="mb-0 text-base">
          Upcoming Practice Schedules
        </CardTitle>
        <CardDescription className="mt-0">
          All the upcoming practice schedules
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
                <p className="text-sm text-muted-foreground two-lines inline mb-1">
                  {notice?.description}
                </p>
                <div className="flex items-center justify-start gap-1 text-gray-700">
                    <MdLocationOn className="w-4 h-4 fill-red-500"/>
                    <span className="text-sm font-medium">{notice?.location}</span>
                </div>
              </div>
              <div className="text-xs font-medium">
                <span className="text-sm text-green-600 font-medium">
                  {notice?.date} {notice?.time}
                </span>
              </div>
            </div>
          );
        })}
        <span className="py-1 mx-auto text-sm text-gray-600 block underline">
          View All
        </span>
      </CardContent>
    </Card>
  );
};

export default PracticeBlock;
