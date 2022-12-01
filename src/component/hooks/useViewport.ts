import { useEffect, useMemo, useState } from "react";
import { singletonHook } from "react-singleton-hook";

interface UseViewPortResult {
  width: number;
  height: number;
  breakpoint: {
    width: number,
    height: number
  };
}

const initialResult: UseViewPortResult = {
  width: 375,
  height: 667,
  breakpoint: {
    width: 360,
    height: 340
  }
,
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
      return {
        width: 360,
        height: 340
      }

    } else if (width <= 900) {
      return {
        width: 730,
        height: 400
      }

    } else if (width <= 1200) {
      return {
        width: 900,
        height: 550
      }

    }
    else if (width <= 1400) {
      return {
        width: 1200,
        height: 600
      }
    }
    else if (width <= 1920) {
      return {
        width: 1300,
        height: 600
      }
    }
    else {
      return {
        width: 1760,
        height: 1000
      }
    }

  }, [width]);

  return { width, height, breakpoint };
};

export default singletonHook(initialResult, useViewport);
