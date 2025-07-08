"use client";

import { Images } from "@/src/constants/images";
import Image from "next/image";
import React from "react";
import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import {
  EmployeesLeaveCard,
  EventCard,
  NotificationCard,
  ReminderCard,
  StateCard,
} from "../cards";

interface CardVarietyListProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function CardVarietyList({ isOpen, setIsOpen }: CardVarietyListProps) {
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Handle drag start for cards
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    cardType: string
  ) => {
    e.dataTransfer.setData("text/plain", cardType);
    console.log("Dragging card type:", cardType);
  };

  return (
    <div
      className={twMerge(
        "bg-white fixed right-0 top-0 h-full w-[450px] transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
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
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, "StateCard")}
            className="cursor-grab"
          >
            <StateCard />
          </li>
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, "EventCard")}
            className="cursor-grab"
          >
            <EventCard />
          </li>
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, "ReminderCard")}
            className="cursor-grab"
          >
            <ReminderCard />
          </li>
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, "NotificationCard")}
            className="cursor-grab"
          >
            <NotificationCard />
          </li>
          <li
            draggable
            onDragStart={(e) => handleDragStart(e, "EmployeesLeaveCard")}
            className="cursor-grab"
          >
            <EmployeesLeaveCard />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(CardVarietyList);
