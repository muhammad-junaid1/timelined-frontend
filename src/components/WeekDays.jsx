import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import { Badge } from "@mui/material";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const WeekDays = () => {
  const { currentWeekDay, setCurrentWeekDay, epgData } = useStateContext();

  return (
    <div className="py-6 px-3 md:px-0 overflow-x-scroll md:overflow-hidden">
      <div className="weekdays bg-white flex items-center justify-center w-max mx-auto rounded-full shadow">
        {days?.map((day) => {
          return day === currentWeekDay ? (
            <Badge key={day} badgeContent={epgData?.length} color="primary">
              <button
                onClick={() => setCurrentWeekDay(day)}
                className={"active"}
              >
                {day}
              </button>
            </Badge>
          ) : (
            <button key={day} onClick={() => setCurrentWeekDay(day)}>{day}</button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekDays;
