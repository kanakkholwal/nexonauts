import { BiBell } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import {
    IoLogoGithub,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoTwitter,
} from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { RiAdminLine, RiAppsLine } from "react-icons/ri";
import {
    TbBrandBlogger,
    TbBrandGoogleAnalytics,
    TbDashboard,
    TbMessageDots,
    TbSmartHome,
    TbTools,
} from "react-icons/tb";
import { BreadCrumb } from "src/componentsbreadcrumb";
import Footer from "src/componentslayouts/footer";
import Header from "src/componentslayouts/header";
import SideNav from "src/componentslayouts/sidenav";
import { ContentWrapper, MainWrapper } from "src/componentslayouts/wrapper";

const SocialMedia = [
  {
    name: "Github",
    icon: <IoLogoGithub />,
    url: "https://github.com/kkupgrader",
  },
  {
    name: "Instagram",
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com/kanakkholwal/",
  },
  {
    name: "LinkedIn",
    icon: <IoLogoLinkedin />,
    url: "https://www.linkedin.com/in/kanak-kholwal/",
  },
  {
    name: "Twitter",
    icon: <IoLogoTwitter />,
    url: "https://twitter.com/KanakKholwal",
  },
];
const userRoutes = [
  {
    title: "Home",
    icon: <TbSmartHome size={16} />,
    path: "/",
  },
  {
    title: "Dashboard",
    icon: <TbDashboard size={16} />,
    path: "/dashboard",
    sessionRequired: true,
  },
  {
    title: "Apps",
    icon: <RiAppsLine size={16} />,
    path: "/apps",
  },
  {
    title: "Tools",
    icon: <TbTools size={16} />,
    path: "/tools",
  },
  {
    title: "Blog",
    icon: <TbBrandBlogger size={16} />,
    path: "/blog",
  },
  {
    title: "Profile",
    icon: <TbBrandBlogger size={16} />,
    path: "/dashboard/profile",
    sessionRequired: true,
  },
];

const routes = (userRole) => {
  if (userRole === "admin")
    return [
      {
        title: "Dashboard",
        path: "/dashboard/admin",
        icon: <RiAdminLine />,
      },
      {
        title: "Analytics",
        path: "/dashboard/admin/analytics",
        icon: <TbBrandGoogleAnalytics />,
        children: [
          {
            title: "Pages",
            path: "/dashboard/admin/analytics/pages",
          },
          {
            title: "Remove",
            path: "/dashboard/admin/analytics/remove-unnecessary",
          },
        ],
      },
      {
        title: "Blog",
        path: "/dashboard/admin/blog",
        icon: <TbBrandBlogger />,
        children: [
          {
            icon: <MdOutlineArticle />,
            title: "Posts",
            path: "/dashboard/admin/blog/posts",
          },
        ],
      },
      {
        title: "Apps",
        path: "/dashboard/admin/apps",
        icon: <RiAppsLine />,
        children: [
          {
            title: "Submit",
            path: "/dashboard/admin/apps/submit",
          },
        ],
      },
      {
        title: "Public Tools",
        path: "/dashboard/admin/public-tools",
        icon: <RiAppsLine />,
        children: [
          {
            title: "Add New Tools",
            path: "/dashboard/admin/public-tools/add",
          },
        ],
      },
      {
        title: "Users",
        path: "/dashboard/admin/users",
        icon: <FiUsers />,
      },
      {
        title: "Messages",
        path: "/dashboard/admin/messages",
        icon: <TbMessageDots />,
      },

      {
        title: "Notifications",
        path: "/dashboard/admin/notifications",
        icon: <BiBell />,
      },
      // ...userRoutes
    ].filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  else {
    // return unique from array
    return [...userRoutes];
  }
};
export default function DashboardPage({ headerChildren, children, user }) {
  return (
    <>
      <SideNav routes={routes(user.role)} user={user} />
      <MainWrapper id="main_wrapper" className="isSidenavOpen">
        <Header user={user} routes={routes(user.role)}>
          {headerChildren ? headerChildren : null}
        </Header>
        <ContentWrapper>
          <BreadCrumb />
          {children}
        </ContentWrapper>
        <Footer socialMedia={SocialMedia} />
      </MainWrapper>
    </>
  );
}
export function AdminDashboard({ headerChildren, children, user }) {
  return (
    <>
      <SideNav routes={routes(user.role)} user={user} />
      <MainWrapper id="main_wrapper" className="isSidenavOpen">
        <Header user={user} routes={routes(user.role)}>
          {headerChildren ? headerChildren : null}
        </Header>
        <ContentWrapper>{children}</ContentWrapper>
        <Footer socialMedia={SocialMedia} />
      </MainWrapper>
    </>
  );
}
