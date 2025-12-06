import { useEffect, useRef, type RefObject } from "react";
import type { IPixiApp } from "../types/app";

export function useApp<TApp extends IPixiApp>(
  containerRef: RefObject<HTMLDivElement | null>,
  AppClass: new () => TApp,
  onAppReady?: (app: TApp) => void,
) {
  const appRef = useRef<TApp | null>(null);

  useEffect(() => {
    console.log(appRef.current);

    const container = containerRef.current;

    if (!container) return;

    if (!appRef.current || appRef.current?.isInitialized === false) {
      const app = new AppClass();

      appRef.current = app;

      const initApp = async () => {
        await app.init();
        container?.appendChild(app.canvas);

        if (onAppReady) {
          console.log("onAppReady");
          onAppReady(app);
        }
      };

      initApp();
    }

    return () => {
      if (appRef.current?.isInitialized === true) {
        console.log("useEffect cleanup ", appRef.current);

        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [containerRef, AppClass, onAppReady]);
}
