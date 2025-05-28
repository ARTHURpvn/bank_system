import { MutableRefObject, useEffect, useRef } from "react";
const noop = () => {};

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

interface FivemWindow extends Window {
  GetParentResourceName?: () => string;
}

type NuiHandlerSignature<T> = (data: T) => void;

export const isEnvBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
  mockData?: T
): Promise<T> {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  if (isEnvBrowser() && mockData) return mockData;

  const resourceName =
    (window as FivemWindow).GetParentResourceName?.() ?? "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  const respFormatted = await resp.json();

  return respFormatted;
}

export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent) => {
      const nuiData = event.data as NuiMessageData<T>;
      if (nuiData.action === action && savedHandler.current) {
        savedHandler.current(nuiData.data);
      }
    };
    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
