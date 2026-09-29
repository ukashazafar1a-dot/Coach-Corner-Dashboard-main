export type toastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "custom"
  | "loading"
  | "dismiss"
  | "promiss";

export type Claims = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone": string;
  OrgCode: string;
  Permission: Permissions;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
    | string
    | "Management";
  exp: number;
  iss: string;
  aud: string;
};

export type Coachclaim =
  | "Permission.Settings.View"
  | "Permission.Settings.Edit"
  | "Permission.Teams.View"
  | "Permission.Teams.Create"
  | "Permission.Teams.Edit"
  | "Permission.Teams.Delete"
  | "Permission.Groups.View"
  | "Permission.Groups.Create"
  | "Permission.Groups.Edit"
  | "Permission.Groups.Delete"
  | "Permission.Players.View"
  | "Permission.Players.Create"
  | "Permission.Players.Edit"
  | "Permission.Players.Delete"
  | "Permission.Noticeboards.View"
  | "Permission.Noticeboards.Create"
  | "Permission.Noticeboards.Edit"
  | "Permission.Noticeboards.Delete"
  | "Permission.Noticeboards.ViewDeleted"
  | "Permission.Chats.View"
  | "Permission.Chats.GroupMessage"
  | "Permission.Chats.DirectMessage"
  | "Permission.Posts.View"
  | "Permission.Posts.Send"
  | "Permission.Posts.Like"
  | "Permission.Posts.Comment"
  | "Permission.Posts.Delete"
  | "Permission.Posts.ViewDeleted"
  | "Permission.Posts.Edit"
  | "Permission.Posts.Create"
  | "Permission.Meetings.View"
  | "Permission.Meetings.Create"
  | "Permission.Meetings.Edit"
  | "Permission.Meetings.Delete"
  | "Permission.PlayBooks.View"
  | "Permission.PlayBooks.Create"
  | "Permission.PlayBooks.Edit"
  | "Permission.PlayBooks.Delete"
  | "Permission.Plays.View"
  | "Permission.Plays.Create"
  | "Permission.Plays.Edit"
  | "Permission.Plays.Delete"
  | "Permission.Reports.View"
  | "Permission.Tools.View"
  | "Permission.Subscriptions.View"
  | "Permission.Subscriptions.Create"
  | "Permission.Subscriptions.Edit"
  | "Permission.Subscriptions.Delete"
  | "Permission.Subscriptions.ViewDeleted";

export type User = {
  fName: string;
  lName: string;
  email: string;
  image: string;
  token: string;
  refreshToken: string;
  tokenExpiryTime?: string;
  expireAt?: string;
  id: string;
};

export type OrganizationAddress = {
  street: string | null;
  areaTown: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
};
export type OrganizationItem = {
  id: string;
  name: string;
  image: string | null;
  address: OrganizationAddress | null;
};
export type OrganizationObj = {
  name: string;
  status: string;
  logo: string | null;
  icon: string | null;
  id: string;
  teamCount: number;
  claims: Coachclaim[] | null;
};

export type SportObj = {
  id: number;
  name: string;
};
export type TeamObj = {
  id: string;
  name: string;
  image: string | null;
};
export type CoachObj = {
  id: string;
  name: string;
  email: string;
};
export type CookieType = "user" | "orgId" | "teamId";
export type billingType = "Monthly" | "Yearly";

export type registerForm = {
  billType: string;
  organizationName: string;
  organizationType: string;
  street: string;
  areaTown: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  bio: string;
  fName: string;
  confirmPassword: string;
  packageId: string;
  lName: string;
  email: string;
  password: string;
};
export type orderObject = {
  billType: string;
  user: {
    organizationName: string;
    organizationType: string;
    organizerAddress: {
      street: string;
      areaTown: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    description: string;
    fName: string;
    lName: string;
    email: string;
    password: string;
    billType: string;
  };
  packageId: string;
};

export type SingleMenuItem = {
  title: string;
  url: string;
  id: number;
  icon?: React.JSX.Element | null;
  claim: Coachclaim;
};
export type SidebarMenuItem = {
  id: number;
  title: string;
  url: string;
  icon: React.JSX.Element | null;
  isDropdown: boolean;
  type?: string;
  links: SingleMenuItem[] | null;
  claim?: Coachclaim;
};

export type GroupMemberItem = {
  fName: string;
  lName: string;
  name?: string;
  image?: string | null; // Image URL of the member (nullable)
  teamRole: string | null; // Role of the member in the team
  email?: string;
  role?: string;
  address: string | null;
  bio: string | null;
  registeredAt: string;
  userId: string;
  phoneNumber: string | null;
  personalClaims: {
    height: string | null;
    weight: string | null;
    dob: string | null;
    gender: string | null;
    parentName: string | null;
    parentNumberPrimary: string | null;
    parentNumberSecondary: string | null;
    parentEmail: string | null;
  };
};
export type Member = {
  memberId: number; // Unique identifier for the member
  name: string; // Name of the member
  image: string | null; // Image URL of the member (nullable)
  teamRole: string; // Role of the member in the team
  age?: number;
  height?: string | null;
  weight?: string | null;
  email?: string;
  phone?: string;
  parentName?: string;
  parentContact?: string;
  aboutPlayer?: string;
};
export type MemberItem = {
  memberId: number; // Unique identifier for the member
  fName: string;
  lName: string;
  name?: string;
  image?: string | null; // Image URL of the member (nullable)
  teamRole: string; // Role of the member in the team
  email?: string;
  role?: string;
};
export type CoachItem = {
  id: string;
  fName: string;
  lName: string;
};
export type Group = {
  id: string; // Unique identifier for the team
  name: string; // Name of the team
  coach: CoachItem; // Email of the coach
  totalMembers: number; // Total number of members in the team
  members: MemberItem[];
  icon: string | null;
  logo: string | null;
};

export type Post = {
  id: number;
  postId: number;
  adminId: number;
  adminImage: string;
  adminName: string;
  postTime: string;
  adminDesignation: string;
  postDetail: string;
  postImage: string;
  comments: Comment[]; // Array of comments
};
type Comment = {
  id: number;
  isActive: boolean;
  commenterImage: string;
  commenterName: string;
  commenterTime: string;
  commenterDesignation: string;
  commenterComment: string;
};
export type Player = {
  id: number;
  name: string;
  lastName: string;
  role: string;
  age: number;
  height: string;
  weight: string;
  email: string;
  phone: string;
  parentName: string;
  parentContact: string;
  aboutPlayer: string;
  image: string;
};

export type Team = {
  name: string;
  totalMembers: number;
  players: TeamPlayer[];
};

export type TeamPlayer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  teamRole: string;
  status: string;
};

export type chatUsers = chatUser[];

export type chatUser = {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
};

export type chatGroups = chatGroup[];

export type chatGroup = {
  type: string;
  id: number;
  name: string;
  image: string;
  lastMessage: string;
};

export type Message = {
  sender: string;
  message: string;
  timestamp: string;
};

export type Conversations = {
  [key: string]: Message[];
};

export type Step = "Organization" | "Profile" | "Payment";
export type direction = "prev" | "next";
export type NoticeStatus = "Active" | "Draft";
export type NoticePriority = "Info" | "Normal" | "Urgent" | "Low";
export type NoticeItem = {
  id: string;
  title: string;
  shortDescription: string | null;
  noticeStatus: NoticeStatus;
  severity: NoticePriority;
  isViewed: boolean;
  publisher: PostUser;
  dated: string;
  totalViews: number;
};

export type NoticeObject = {
  usersViewed: any;
  id: string;
  title: string;
  shortDescription: string | null;
  noticeStatus: NoticeStatus;
  severity: NoticePriority;
  isViewed?: boolean;
  description?: string | null;
  shotDescription?: string | null;
};

export type PostUser = {
  id: string;
  fName: string | null;
  lName: string | null;
  email: string;
  image: null | string;
  role: string;
};

export type PostItem = {
  id: string;
  user: PostUser;
  createdAt: string;
  message: string | null;
  media: null | null;
  iLiked: boolean;
  tLikes: number;
  tComments: number;
};

export type CommentItem = {
  id: number;
  user: PostUser;
  dated: string;
  message: string | null;
  tLikes: number;
  iliked: boolean;
};

export type PlaybookItem = {
  id: number;
  createdBy: PostUser;
  name: string;
  createdAt: string;
  lastModified: null | string;
  totalPlays: number;
  description: string | null;
};

export type InviteLinkItem = {
  id: string;
  type: "Email" | "Link";
  createdAt: string;
  lastModified: null | string;
  limited: number;
  expirationDate: string;
  status: InviteStatus;
  role: "Coach" | "Player";
  totalSignedUp: number;
  inviteCode: string | null;
};

export type InviteStatus =
  | "Sent"
  | "Active"
  | "Draft"
  | "Initiated"
  | "Expired";

export type PendingInviteItem = {
  id: number;
  type: "Join" | "Sent" | "Invited";
  createdAt: string;
  lastModified: null | string;
  inviteCode: null | string;
  user: PostUser;
  status: "Pending" | "Accepted" | "Declined";
};

export type TeamMemberItem = {
  teamMemberId: number;
  fName: string;
  lName: string | null;
  image: null | string;
  email: string;
  role: "Player" | "Coach";
};

export type SingleTeam = {
  id: string;
  sportId: number;
  name: string;
  logo: string | null;
  icon: string | null;
  description: string | null;
};

export type AddMemberItem = {
  userId: string;
  fName: string;
  lName: string;
  email: string;
  teamRole?: string;
};
export type GroupInviteItem = {
  fName: string;
  lName: string;
  email: string;
  teamRole: string | null;
  role: string;
};

// Here are the Subscription Types
export type FeatureType =
  | "Teams"
  | "TeamGroups"
  | "GroupMembers"
  | "Storage"
  | "Sports"
  | "Chat"
  | "Coaches";
export type FeatureItem = {
  type: FeatureType;
  remainingQouta: number;
};
export type SubscriptionItem = {
  id: string;
  endDate: string;
  status: boolean;
  name?: string;
  features: FeatureItem[];
};

// Play Related Types
export type PlaySize = "Short" | "Long";
export type fieldTypes =
  | "High School Tackle"
  | "NFL Flag"
  | "College Tackle"
  | "High School Girls' Flag & Women's College Flag"
  | "Professional Tackle"
  | "IFAF 7on7 Flag"
  | "College"
  | "High School"
  | "Professional";

export type fieldTypeItem = {
  label: fieldTypes;
  value: fieldTypes;
};

// PlayBook Page
export type PlayBook = {
  id: number;
  name: string;
  description: string | null;
  plays: any;
};

// Chat Module Types Here
export type chatView = "Group" | "Direct";
export type chatMemberItem = {
  teamMemberId: number;
  userId: string;
  fName: string;
  lName: string | null;
  image: string | null;
  email: string;
  role: string | null;
  newMsgCount: number;
};

export type chatGroupItem = {
  id: string;
  name: string;
  image: string | null;
  msgCount: number;
};

export type chatMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  dateTime: string;
  isEdited: boolean;
  isViewd: boolean;
  sender?: GroupMessageSender;
};

export type chatMemberMessage = {
  teamId: string;
  message: chatMessage;
};

export type GroupMessageSender = {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  image: string | null;
};

export type chatGroupMessage = {
  teamId: string;
  groupId: string;
  message: chatMessage;
};

export type SocketMessage = {
  type: "direct" | "group";
  teamId: string;
  groupId?: string;
  message: chatMessage;
};

// Practice Schedule Types

export type PracticeSchedule = {
  id: string;
  groupName: string;
  title: string;
  startTime: string;
  endTime: string;
  location: {
    street: string;
    areaTown: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: string;
};
