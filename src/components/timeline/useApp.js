import React from "react";

import { fetchChannels } from "./helpers";
import { useStateContext } from "../../context/ContextProvider";

import { useEpg } from "planby";

// Import theme
import { theme } from "./helpers/theme";

export function useApp() {
  const [channels, setChannels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {epgData} = useStateContext();

  const channelsData = React.useMemo(() => channels, [channels]);

  const { getEpgProps, getLayoutProps } = useEpg({
    channels: channelsData,
    epg: epgData,
    dayWidth: 6500,
    sidebarWidth: 20,
    itemHeight: 170,
    isSidebar: true,
    isTimeline: true,
    isLine: true,
    isBaseTimeFormat: true,
    theme,
  });

  const handleFetchResources = React.useCallback(async () => {
    setIsLoading(true);
    const channels = await fetchChannels();
    setChannels(channels);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
      handleFetchResources();
   }, [handleFetchResources]);

  return { getEpgProps, getLayoutProps, isLoading };
}
