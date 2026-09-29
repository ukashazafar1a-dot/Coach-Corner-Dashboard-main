export type FootballTeamRole =
  | "Quarterback"
  | "Running Back"
  | "Wide Receiver"
  | "Tight End"
  | "Offensive Lineman"
  | "Defensive Lineman"
  | "Linebacker"
  | "Cornerback"
  | "Safety"
  | "Kicker"
  | "Punter";

export type footballTeamRoles = {
  label: FootballTeamRole;
  value: FootballTeamRole;
}[];

export const footballTeamRoles: footballTeamRoles = [
  { label: "Quarterback", value: "Quarterback" },
  { label: "Running Back", value: "Running Back" },
  { label: "Wide Receiver", value: "Wide Receiver" },
  { label: "Tight End", value: "Tight End" },
  { label: "Offensive Lineman", value: "Offensive Lineman" },
  { label: "Defensive Lineman", value: "Defensive Lineman" },
  { label: "Linebacker", value: "Linebacker" },
  { label: "Cornerback", value: "Cornerback" },
  { label: "Safety", value: "Safety" },
  { label: "Kicker", value: "Kicker" },
  { label: "Punter", value: "Punter" },
];
