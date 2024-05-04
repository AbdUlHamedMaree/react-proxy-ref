/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MutableRefObject } from 'react';
import { useState } from 'react';

export type ProxyRefObject<TRef = undefined> = Record<keyof any, MutableRefObject<TRef>>;

export function useProxyRef<TRef>(defaultValue: TRef): ProxyRefObject<TRef>;
export function useProxyRef<TRef>(): ProxyRefObject<TRef | undefined>;

export function useProxyRef<TRef>(defaultValue?: TRef) {
  return useState(
    () =>
      new Proxy({} as ProxyRefObject<TRef | undefined>, {
        get: (obj, key) => {
          const value = obj[key];

          if (value) return value;

          return (obj[key] = {
            current: defaultValue,
          });
        },
      })
  )[0];
}
