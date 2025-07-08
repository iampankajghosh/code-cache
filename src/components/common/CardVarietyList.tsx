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
  TodaysAttendanceCard,
} from "../cards";

interface CardVarietyListProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  availableCardTypes: string[];
  onRemoveCard: (cardId: string, cardType: string) => void;
}

function CardVarietyList({
  isOpen,
  setIsOpen,
  availableCardTypes,
  onRemoveCard,
}: Readonly<CardVarietyListProps>) {
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Handle drag start for cards
  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    cardType: string
  ) => {
    e.dataTransfer.setData("text/plain", cardType);
    console.log("Dragging card type:", cardType);
  };

  // Handle dropping a card back to the list
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardType = e.dataTransfer.getData("text/plain");
    const cardId = e.dataTransfer.getData("cardId");
    console.log("Dropped card back to list:", { cardId, cardType });
    if (cardId && cardType) {
      onRemoveCard(cardId, cardType);
    }
  };

  // Render card component based on type
  const renderCard = (cardType: string) => {
    switch (cardType) {
      case "TodaysAttendanceCard":
        return <TodaysAttendanceCard />;
      case "EventCard":
        return <EventCard />;
      case "ReminderCard":
        return <ReminderCard />;
      case "NotificationCard":
        return <NotificationCard />;
      case "EmployeesLeaveCard":
        return <EmployeesLeaveCard />;
      default:
        return null;
    }
  };

  return (
    <div
      className={twMerge(
        "bg-white fixed right-0 top-0 h-full w-[450px] transition-transform duration-300 ease-in-out z-10",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={isOpen ? handleDrop : undefined}
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
          {availableCardTypes.length > 0 ? (
            availableCardTypes.map((cardType) => (
              <li
                key={cardType}
                draggable
                onDragStart={(e) => handleDragStart(e, cardType)}
                className="cursor-grab"
              >
                {renderCard(cardType)}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No cards available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(CardVarietyList);
