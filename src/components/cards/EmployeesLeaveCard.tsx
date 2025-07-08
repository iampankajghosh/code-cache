"use client";

import React from "react";
import { LuChevronDown } from "react-icons/lu";

function EmployeesLeaveCard() {
  return (
    <div className="w-full bg-white px-6 py-5 rounded-[14px] border border-gray-200">
      <div className="flex items-center justify-between gap-2 mb-5">
        <p className="font-medium text-base">Events</p>

        <button className="cursor-pointer font-[450] text-xs capitalize bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full flex items-center justify-between px-[13px] py-[4.5px] transition-colors duration-200 ease-in-out">
          <span>this week</span>

          <LuChevronDown size={18} className="translate-x-[5px]" />
        </button>
      </div>

      <ul>
        <li className="py-3 pl-4 flex items-center gap-2 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-5 before:bg-blue-600 before:rounded-full">
          <p className="flex items-center justify-between gap-2 flex-1 font-[450] tracking-wide">
            <span>Julia’s 1st Work Anniversary!</span>
            <span>24 Jun, 2025</span>
          </p>
        </li>

        <li className="py-3 pl-4 flex items-center gap-2 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-5 before:bg-blue-600 before:rounded-full">
          <p className="flex items-center justify-between gap-2 flex-1 font-[450] tracking-wide">
            <span>Employee Appreciation Day!</span>
            <span>25 Jun, 2025</span>
          </p>
        </li>

        <li className="py-3 pl-4 flex items-center gap-2 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-5 before:bg-blue-600 before:rounded-full">
          <p className="flex items-center justify-between gap-2 flex-1 font-[450] tracking-wide">
            <span>Amanda’s Birthday!</span>
            <span>26 Jun, 2025</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default React.memo(EmployeesLeaveCard);
