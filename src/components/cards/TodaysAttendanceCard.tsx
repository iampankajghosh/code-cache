import React from "react";
import { StateCard } from "../common";

function TodaysAttendanceCard() {
  return (
    <StateCard
      title="Today's Attendance"
      value={76}
      change="+10%"
      changeColor="text-green-600"
      description="vs Last Day"
      footerText="Employees present"
      buttonLabel="View All"
      buttonLink="#"
    />
  );
}

export default TodaysAttendanceCard;
