// app/routes/__root.tsx
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { ClerkProvider } from "@clerk/tanstack-start";
import * as React from "react";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "TanStack Start Starter",
    },
  ],
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Html lang="de">
        <Head>
          <Meta />
          <ColorSchemeScript />
        </Head>
        <Body>
          <MantineProvider>
            {children}
            <ScrollRestoration />
            <Scripts />
          </MantineProvider>
        </Body>
      </Html>
    </ClerkProvider>
  );
}
