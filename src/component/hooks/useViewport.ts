import { useEffect, useMemo, useState } from "react";
import { singletonHook } from "react-singleton-hook";

interface UseViewPortResult {
  width: number;
  height: number;
  breakpoint: "sm" | "md";
}

const initialResult: UseViewPortResult = {
  width: 375,
  height: 667,
  breakpoint: "sm",
};

const useViewport = (): UseViewPortResult => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const breakpoint = useMemo(() => {
    if (width <= 600) {
      return "sm";
    } else if (width <= 900) {
      return "md";
    } else {
      return "md";
    }
  }, [width]);

  return { width, height, breakpoint };
};

export default singletonHook(initialResult, useViewport);
