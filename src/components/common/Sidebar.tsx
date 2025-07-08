"use client";

import { Images } from "@/src/constants/images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  LuCalendar1,
  LuCalendarCog,
  LuCalendarPlus,
  LuChartLine,
  LuChevronDown,
  LuFolderClosed,
  LuGrid2X2Plus,
  LuHourglass,
  LuLogOut,
  LuPanelLeft,
  LuSettings,
  LuSettings2,
  LuUserRoundCheck,
  LuUserRoundCog,
  LuUserRoundPlus,
  LuUsersRound,
} from "react-icons/lu";
import { twMerge } from "tailwind-merge";

const PRIMARY_NAV_LINKS = [
  {
    name: "dashboard",
    href: "#",
    icon: <LuChartLine size={20} />,
  },
  {
    name: "projects",
    href: "#",
    icon: <LuFolderClosed size={20} />,
  },
  {
    name: "employee details",
    href: "#",
    icon: <LuUsersRound size={20} />,
    children: [
      { name: "add employee", href: "#", icon: <LuUserRoundPlus size={18} /> },
      {
        name: "manage employees",
        href: "#",
        icon: <LuUserRoundCog size={18} />,
      },
    ],
  },
  {
    name: "leave details",
    href: "#",
    icon: <LuCalendar1 size={20} />,
    children: [
      { name: "add leave", href: "#", icon: <LuCalendarPlus size={18} /> },
      {
        name: "manage leave",
        href: "#",
        icon: <LuCalendarCog size={18} />,
      },
    ],
  },
  {
    name: "others",
    href: "#",
    icon: <LuSettings2 size={20} />,
    children: [{ name: "settings", href: "#", icon: <LuSettings size={18} /> }],
  },
];

const SECONDARY_NAV_LINKS = [
  {
    name: "productivity",
    href: "#",
    icon: <LuHourglass size={20} />,
  },
  {
    name: "roles & responsibilities",
    href: "#",
    icon: <LuUserRoundCheck size={20} />,
    children: [
      {
        name: "add role",
        href: "#",
        icon: <LuUserRoundPlus size={18} />,
      },
      {
        name: "manage roles",
        href: "#",
        icon: <LuUserRoundCog size={18} />,
      },
    ],
  },
  {
    name: "new & edit layout",
    href: "#",
    icon: <LuGrid2X2Plus size={20} />,
  },
];

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderNavLinks = (links: typeof PRIMARY_NAV_LINKS) => (
    <ul className="flex flex-col gap-3 border-b border-gray-200 py-6 px-4">
      {links.map((link) => (
        <li key={link.name}>
          {!link?.children?.length ? (
            <Link
              href={link.href}
              className="group capitalize bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-md flex items-center gap-[10px] px-[18px] py-3 transition-colors duration-200 ease-in-out"
            >
              <span className="group-hover:text-blue-600 transition-colors duration-200 ease-in-out">
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          ) : (
            <>
              <button className="group w-full capitalize bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-md flex items-center justify-between gap-[10px] px-[18px] py-3 transition-colors duration-200 ease-in-out">
                <div className="flex items-center gap-[10px]">
                  <span className="group-hover:text-blue-600 transition-colors duration-200 ease-in-out">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </div>
                <LuChevronDown size={18} />
              </button>

              <ul className="pl-6 h-auto overflow-hidden transition-all duration-300 ease-in-out">
                {link.children.map((child) => (
                  <li
                    key={child.name}
                    className="border-l border-gray-200 px-3 pb-2 last:mb-0"
                  >
                    <Link
                      href={child.href}
                      className="group capitalize bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-md flex items-center gap-[10px] px-3 py-2 transition-colors duration-200 ease-in-out"
                    >
                      <span className="group-hover:text-blue-600 transition-colors duration-200 ease-in-out">
                        {child.icon}
                      </span>
                      <span>{child.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={twMerge(
        "bg-white flex flex-col h-full transition-all duration-300 ease-in-out",
        !sidebarOpen ? "w-[300px]" : "w-0"
      )}
    >
      <div className="h-[74px] w-full border-b border-gray-200 px-4 flex items-center justify-between">
        <Image
          src={Images.DashboardLogo}
          width={124}
          height={26}
          alt="Dashboard Logo"
        />
        <button
          className="text-gray-600 cursor-pointer"
          onClick={toggleSidebar}
        >
          <LuPanelLeft size={20} />
        </button>
      </div>

      <nav className="flex-1 w-full border-r border-gray-200 h-[calc(100vh-74px)] overflow-hidden overflow-y-auto">
        {renderNavLinks(PRIMARY_NAV_LINKS)}
        {renderNavLinks(SECONDARY_NAV_LINKS)}
      </nav>

      <div className="h-[74px] w-full border-r border-gray-200 px-4 flex items-center justify-between">
        <button className="w-full cursor-pointer bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 rounded-md flex items-center gap-[10px] px-[18px] py-3 transition-colors duration-200 ease-in-out">
          <LuLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default React.memo(Sidebar);
