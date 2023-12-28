import {
  MdDashboard,
  MdCategory,
  MdInfo,
  MdOutlineFolderOpen,
  MdLoyalty,
  MdQuestionMark,
} from "react-icons/md";

export const AdminNavLinks = [
  {
    Key: 1,
    Title: "DASHBOARD",
    Linkto: "/admin/",
    Logo: <MdDashboard />,
  },
  {
    Key: 2,
    Title: "CATEGORY",
    Linkto: "/admin/category",
    Logo: <MdCategory />,
  },
  {
    Key: 1,
    Title: "ABOUT",
    Linkto: "/admin/about",
    Logo: <MdInfo />,
  },
  // {
  //   Key: 1,
  //   Title: "CONTACT",
  //   Linkto: "/admin/contact",
  // },
  {
    Key: 1,
    Title: "PRODUCTS",
    Linkto: "/admin/products",
    Logo: <MdOutlineFolderOpen />,
  },
  {
    Key: 1,
    Title: "BOOKING",
    Linkto: "/admin/booking",
    Logo: <MdLoyalty />,
  },
  // {
  //   Key: 1,
  //   Title: "SOCIAL MEDIA",
  //   Linkto: "/admin/social",
  // },
  // {
  //   Key: 1,
  //   Title: "USER",
  //   Linkto: "/admin/account",
  // },
  // {
  //   Key: 1,
  //   Title: "REVIEWS",
  //   Linkto: "/admin/reviews",
  // Logo: <MdDashboard/>,
  // },
  {
    Key: 1,
    Title: "INQUIRY",
    Linkto: "/admin/inquiry",
    Logo: <MdQuestionMark />,
  },
];
