import { useEffect } from "react";
import useForceUpdate from "./useForceUpdate";
import { throttle } from "throttle-debounce";

const DEFAULT_THROTTLE_DELAY = 1000;

const useWindowSizes = (throttleDelay = DEFAULT_THROTTLE_DELAY) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const listener = throttle(throttleDelay, forceUpdate);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [forceUpdate, throttleDelay]);

  return { innerHeight: window.innerHeight, innerWidth: window.innerWidth };
};

export default useWindowSizes;
