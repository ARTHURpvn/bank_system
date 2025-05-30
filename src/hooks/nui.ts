/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MutableRefObject, useEffect, useRef } from "react";

export const isEnvBrowser = (): boolean =>
  typeof window !== "undefined" && !(window as any).invokeNative;

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

  if (typeof window !== "undefined" && isEnvBrowser() && mockData)
    return mockData;

  const resourceName =
    typeof window !== "undefined" && (window as any).GetParentResourceName
      ? (window as any).GetParentResourceName()
      : "nui-frame-app";

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);
  const respFormatted = await resp.json();

  return respFormatted;
}

const noop = () => {};

interface NuiMessageData<T = unknown> {
  action: string;
  data: T;
}

type NuiHandlerSignature<T> = (data: T) => void;

export const useNuiEvent = <T = unknown>(
  action: string,
  handler: (data: T) => void
) => {
  const savedHandler: MutableRefObject<NuiHandlerSignature<T>> = useRef(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const eventListener = (event: MessageEvent<NuiMessageData<T>>) => {
      const { action: eventAction, data } = event.data;
      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };
    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};
