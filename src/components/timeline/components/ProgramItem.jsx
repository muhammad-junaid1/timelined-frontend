import {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from "planby";
import { useState } from "react";

export const ProgramItem = ({ program, setModal, ...rest }) => {
  const { styles, formatTime, set12HoursTimeFormat, isLive } = useProgram({
    program,
    ...rest,
  });

  const { data } = program;
  const { formattedValue, since, till, venue } = data;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  const handleClick = () => {
    setModal({
      isOpened: true,
      label: data?.formattedValue,
    });
  };

  const teacher = JSON.parse(
    localStorage.getItem(data?.formattedValue) || null
  );

  return (
    <>
      <ProgramBox
        onClick={handleClick}
        className="program-content"
        width={styles.width}
        style={styles.position}
      >
        <ProgramContent width={styles.width} isLive={isLive}>
          <ProgramFlex>
            {/* {<ProgramImage src={image} alt="Preview" />} */}
            <ProgramStack className="flex flex-col justify-between">
              <div>
                <ProgramTitle>{formattedValue}</ProgramTitle>
                <ProgramText style={{color: "var(--primary-color)", fontSize: 14}}>{venue}</ProgramText>
                <ProgramText>
                  {sinceTime} - {tillTime}
                </ProgramText>
              </div>

              {teacher && (
                <div className="flex items-center">
                  <div className="w-[35px] h-[35px] image-wrapper shadow mr-3">
                    <ProgramImage
                      src={"http://isb.nu.edu.pk/" + teacher.ImagePath}
                    />
                  </div>
                  <ProgramText>{teacher?.Name}</ProgramText>
                </div>
              )}
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      </ProgramBox>
    </>
  );
};
