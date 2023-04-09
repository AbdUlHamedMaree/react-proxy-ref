# @mrii/react-proxy-ref

A simple package to create one ref for multiple elements.

if you have a case where you need to create a large/dynamic number of refs, this package is the best fit for it.

it'll exports a hook that will create a proxy object, so you can assign multiple refs to it.

## Installation

```bash
# yarn
yarn add @mrii/react-proxy-ref

# npm
npm i @mrii/react-proxy-ref
```

## Usage

```tsx
import type React from 'react';
import { useProxyRef } from '@mrii/react-proxy-ref';

export const Component: React.FC = () => {
  const proxyRef = useProxyRef<HTMLInputElement | null>(
    null /* defaultValue, optional, default to `null` */
  );

  const way1 = () => {
    // use the refs if you know the names
    proxyRef.email.current?.value;
    proxyRef.password.current?.value;
  };

  const way2 = () => {
    // get all the refs if it's dynamic
    const refs = Object.values(proxyRef);

    refs.forEach(ref => {
      ref.current?.value;
    });
  };

  return (
    <>
      <input ref={proxyRef.email} name='email' />
      <input ref={proxyRef.password} name='password' />
    </>
  );
};
```

## How it works

it will create a proxy that will return `{ current: defaultValue }` when you'll try to access a key from it, and it will store it in the proxy, so you can access the value later
