import { useState } from 'react';
import type React from 'react';

export type AnyKey = string | number | symbol;

export const useProxyRef = <TRef = null>(defaultValue: TRef = null as TRef) =>
  useState(
    () =>
      new Proxy({} as Record<AnyKey, React.MutableRefObject<TRef>>, {
        get: (obj, key) => {
          const value = obj[key];
          if (value) return value;

          return (obj[key] = {
            current: defaultValue,
          });
        },
      })
  )[0];
