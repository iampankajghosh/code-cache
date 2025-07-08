"use clinent";

import React from "react";

function Header() {
  const dayType = "morning";

  const fullname = "Pankaj Ghosh";
  const displayName = fullname.split(" ")[0];

  const eventName = "rath yatra";

  return (
    <header className="bg-white border-b border-gray-200 h-[74px] flex items-center justify-between px-5">
      <div className="flex item-center capitalize">
        <p className="font-[450] border-r border-gray-200 py-1 pr-6">
          Good {dayType},{" "}
          <span className="text-blue-600 font-[450]">{`${displayName}!`}</span>
        </p>

        <p className="py-1 pl-5 text-gray-600">Happy {eventName}!</p>
      </div>
    </header>
  );
}

export default Header;
