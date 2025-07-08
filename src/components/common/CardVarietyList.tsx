"use client";

import { Images } from "@/src/constants/images";
import Image from "next/image";
import React, { useState } from "react";
import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import {
  EmployeesLeaveCard,
  EventCard,
  NotificationCard,
  ReminderCard,
  StateCard,
} from "../cards";

function CardVarietyList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={twMerge(
        "bg-white fixed right-0 top-0 h-full w-[450px] transition-transform duration-300 ease-in-out",
        !sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-[74px] w-full border-l border-gray-200 px-4 flex items-center justify-between">
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
          <LuX size={20} />
        </button>
      </div>

      <div className="flex-1 w-full border-l border-gray-200 h-[calc(100vh-74px)] overflow-hidden overflow-y-auto px-4">
        <ul className="py-6 px-4 flex flex-col gap-4">
          <li>
            <StateCard />
          </li>
          <li>
            <EventCard />
          </li>
          <li>
            <ReminderCard />
          </li>
          <li>
            <NotificationCard />
          </li>
          <li>
            <EmployeesLeaveCard />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(CardVarietyList);
