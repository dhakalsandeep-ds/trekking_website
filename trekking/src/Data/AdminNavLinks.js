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
    Title: "PRODUCTS",
    Linkto: "/admin/products",
    Logo: <MdOutlineFolderOpen />,
  },
 
  {
    Key: 1,
    Title: "INQUIRY",
    Linkto: "/admin/inquiry",
    Logo: <MdQuestionMark />,
  },
];
