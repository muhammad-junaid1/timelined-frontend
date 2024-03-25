import { Timeline, ChannelItem, ProgramItem } from "./components";

import { Epg, Layout } from "planby";
import { useApp } from "./useApp";
import { useState } from "react";
import SelectTeacher from "../SelectTeacher";

const TimelineComponent = () => {
  const { isLoading, getEpgProps, getLayoutProps } = useApp();
  const [modal, setModal] = useState({
    isOpened: false
  }); 

  return (
    <div
      className="timeline-component"
      style={{ height: "270px", width: "100vw" }}
    >
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <ProgramItem setModal={setModal} key={program.data.id} program={program} {...rest} />
          )}
          renderChannel={() => undefined}
        />
      </Epg>

        {modal?.isOpened && (
        <SelectTeacher
          modal={modal}
          handleClose={() => setModal({ isOpened: false })}
        />
      )}
    </div>
  );
};

export default TimelineComponent;
