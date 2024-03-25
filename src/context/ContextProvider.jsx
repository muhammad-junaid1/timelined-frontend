import React, { useContext, useEffect, useState } from "react";

const StateContext = React.createContext(null);

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const StateProvider = ({ children }) => {
  const [DATA, setDATA] = useState(null);
  const [epgData, setEpgData] = useState([]);
  const [teachers, setTeachers] = useState([]); 
  const [currentWeekDay, setCurrentWeekDay] = useState(
    days[new Date().getDay() - 1]
  );


  function getFormattedTime(h, m) {
    const date = new Date();
    date.setHours(h, m, 0, 0);

    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    var updatedDate =
      year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":00";
    return updatedDate;
  }

  const fetchEpg = (weekDay = currentWeekDay) => {
      const studentData = JSON.parse(localStorage.getItem("values"));
      const department = studentData.department;
      const section = studentData.section;

      const classesData =
        DATA?.classes?.find((item) => item?.label === department)?.classes[
          section
        ][weekDay] || [];
      const labsData =
        DATA?.labs?.find((item) => item?.label === department)?.labs[section][
          weekDay
        ] || [];


      const allData = [...classesData, ...labsData]?.map((item, index) => {
        let since = item?.slot?.split("-")[0];
        let till = item?.slot?.split("-")[1];

        if (item?.isLab) {
          const isPM =
            DATA?.labTimeSlots[weekDay]?.find(
              (i) => i?.formattedValue === item?.slot
            )?.startIndex > 1;

          since = getFormattedTime(
            isPM
              ? parseInt(since.split(":")[0]) + 12
              : parseInt(since.split(":")[0]),
            parseInt(since.split(":")[1])
          );
          till = getFormattedTime(
            isPM
              ? parseInt(till.split(":")[0]) + 12
              : parseInt(till.split(":")[0]),
            parseInt(till.split(":")[1])
          );

        } else {
          const isPM =
            DATA?.timeSlots[weekDay]?.find(
              (item) => item?.formattedValue === item?.slot
            )?.startIndex > 7;

          if (!isPM) {
            var pattern = /\b\d{2}:\d{2}-\d{2}:\d{2}\b/g;

            const matches = item?.formattedValue?.match(pattern);

            if (matches != null) {
              if (
                parseInt(till.split(":")[0]) < parseInt(since.split(":")[0])
              ) {
                since = getFormattedTime(
                  parseInt(since.split(":")[0]),
                  parseInt(since.split(":")[1])
                );
                till = getFormattedTime(
                  parseInt(till.split(":")[0]) + 12,
                  parseInt(till.split(":")[1])
                );
              } else {
                since = getFormattedTime(
                  parseInt(since.split(":")[0]),
                  parseInt(since.split(":")[1])
                );
                till = getFormattedTime(
                  parseInt(till.split(":")[0]),
                  parseInt(till.split(":")[1])
                );
              }
            } else {
              since = getFormattedTime(
                isPM
                  ? parseInt(since.split(":")[0]) + 12
                  : parseInt(since.split(":")[0]),
                parseInt(since.split(":")[1])
              );
              till = getFormattedTime(
                isPM
                  ? parseInt(till.split(":")[0]) + 12
                  : parseInt(till.split(":")[0]),
                parseInt(till.split(":")[1])
              );
            }
          } else {
            since = getFormattedTime(
              isPM
                ? parseInt(since.split(":")[0]) + 12
                : parseInt(since.split(":")[0]),
              parseInt(since.split(":")[1])
            );
            till = getFormattedTime(
              isPM
                ? parseInt(till.split(":")[0]) + 12
                : parseInt(till.split(":")[0]),
              parseInt(till.split(":")[1])
            );
          }
        }

        return {
          id: index,
          venue: item?.venue,
          since,
          till,
          formattedValue: item?.formattedValue,
          channelUuid: "day",
        };
      });

      setEpgData(allData);
  };

   const fetchTeachersList = async () => {
    try {
      fetch(import.meta.env.VITE_BACKEND_URL + "/teachers")
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setTeachers(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (DATA && localStorage.getItem("values")) {
      fetchEpg(currentWeekDay);
    }
  }, [currentWeekDay, DATA]);

  return (
    <StateContext.Provider
      value={{
        DATA,
        setDATA,
        currentWeekDay,
        setCurrentWeekDay,
        epgData,
        fetchTeachersList, 
        teachers, setTeachers, 
        fetchEpg
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

export const useStateContext = () => useContext(StateContext);
