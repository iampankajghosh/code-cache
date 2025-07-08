"use client";

import React from "react";
import { IStateCard } from "./types";
import Link from "next/link";

function StateCard({
  title,
  value,
  change,
  changeColor = "text-green-600",
  description,
  footerText,
  buttonLabel = "View All",
  buttonLink = "#",
}: Readonly<IStateCard>) {
  return (
    <div className="w-full h-full bg-blue-50 px-6 py-5 rounded-[14px] border border-blue-100">
      <p className="font-medium text-base mb-5">{title}</p>

      <div className="flex items-end justify-between">
        <p className="text-gray-600">
          <span className="text-gray-900 text-2xl mr-1 font-medium">
            {value}
          </span>
          <span className={changeColor}>{change}</span> {description}
          {footerText && <span className="block">{footerText}</span>}
        </p>

        <Link
          href={buttonLink}
          className="cursor-pointer text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white leading-none border border-blue-600 px-4 py-2 rounded-md transition-all duration-300 ease-in-out"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}

export default React.memo(StateCard);
