import { Message } from "./types";
import { Post } from "./types";

export const posts: Post[] = [
  {
    id: 1,
    postId: 1,
    adminId: 1,
    adminImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1706013885/cc-site-assets/dashboard-assets/Ellipse_1_nedmlm.png",
    adminName: "Ronald Richards",
    postTime: "- 10 min ago",
    adminDesignation: "Head Coach",
    postDetail: "Congrats Team for winning the match.",
    postImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707731136/cc-site-assets/dashboard-assets/image_50_c7inyd.png",
    comments: [
      {
        id: 1,
        isActive: true,
        commenterImage:
          "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707820704/Ellipse_8_egebov.png",
        commenterName: "Ronald Richards",
        commenterTime: "10 mints ago",
        commenterDesignation: "coach",
        commenterComment: "Congratulations team",
      },
      {
        id: 2,
        isActive: true,
        commenterImage:
          "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707820704/Ellipse_8_egebov.png",
        commenterName: "Ronald Richards",
        commenterTime: "- 20 mints ago",
        commenterDesignation: "coach",
        commenterComment: "Congratulations team",
      },
    ],
  },
  {
    id: 2,
    postId: 2,
    adminId: 2,
    adminImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707820704/Ellipse_8_egebov.png",
    adminName: "Ronald Richards",
    postTime: "- 15 min ago",
    adminDesignation: " Coach",
    postDetail: "Congrats Team for winning the match.",
    postImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707731136/cc-site-assets/dashboard-assets/image_50_c7inyd.png",
    comments: [
      {
        id: 1,
        isActive: true,
        commenterImage:
          "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1706013885/cc-site-assets/dashboard-assets/Ellipse_1_nedmlm.png",
        commenterName: "Ronald Richards",
        commenterTime: "10 mints ago",
        commenterDesignation: "coach",
        commenterComment: "Congratulations team",
      },
    ],
  },
  {
    id: 3,
    postId: 3,
    adminId: 3,
    adminImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707820704/Ellipse_8_egebov.png",
    adminName: "Ronald Richards",
    postTime: "10 min ago",
    adminDesignation: "Head Coach",
    postDetail: "Congrats Team for winning the match.",
    postImage:
      "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1707731136/cc-site-assets/dashboard-assets/image_50_c7inyd.png",
    comments: [
      {
        id: 1,
        isActive: true,
        commenterImage:
          "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1706013885/cc-site-assets/dashboard-assets/Ellipse_1_nedmlm.png",
        commenterName: "Ronald Richards",
        commenterTime: "10 mints ago",
        commenterDesignation: "coach",
        commenterComment: "Congratulations team",
      },
    ],
  },
];


export const team = {
  name: "Elite Strikers",
  totalMembers: 15,
  players: [
    {
      id: 401,
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex.morgan@example.com",
      teamRole: "Forward",
      status: "Active",
    },
    {
      id: 402,
      firstName: "Jordan",
      lastName: "Pickford",
      email: "j.pickford@example.com",
      teamRole: "Goalkeeper",
      status: "Active",
    },
    {
      id: 403,
      firstName: "Mia",
      lastName: "Hamm",
      email: "m.hamm@example.com",
      teamRole: "Forward",
      status: "Active",
    },
    {
      id: 404,
      firstName: "Lionel",
      lastName: "Messi",
      email: "l.messi@example.com",
      teamRole: "Forward",
      status: "Pending",
    },
    {
      id: 405,
      firstName: "Megan",
      lastName: "Rapinoe",
      email: "m.rapinoe@example.com",
      teamRole: "Midfielder",
      status: "Active",
    },
    {
      id: 406,
      firstName: "Kevin",
      lastName: "De Bruyne",
      email: "k.debruyne@example.com",
      teamRole: "Midfielder",
      status: "Pending",
    },
    {
      id: 407,
      firstName: "Cristiano",
      lastName: "Ronaldo",
      email: "c.ronaldo@example.com",
      teamRole: "Forward",
      status: "Active",
    },
    {
      id: 308,
      firstName: "Neymar",
      lastName: "Jr",
      email: "n.jr@example.com",
      teamRole: "Forward",
      status: "Active",
    },
    {
      id: 309,
      firstName: "Sergio",
      lastName: "Ramos",
      email: "s.ramos@example.com",
      teamRole: "Defender",
      status: "Pending",
    },
    {
      id: 310,
      firstName: "Eden",
      lastName: "Hazard",
      email: "e.hazard@example.com",
      teamRole: "Midfielder",
      status: "Active",
    },
  ],
};
