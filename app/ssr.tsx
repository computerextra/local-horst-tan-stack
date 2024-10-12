// app/ssr.tsx
/// <reference types="vinxi/types/server" />
import { getRouterManifest } from "@tanstack/start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";
import { createRouter } from "./router";
import { createClerkHandler } from "@clerk/tanstack-start/server";

export default createClerkHandler(
  createStartHandler({
    createRouter,
    getRouterManifest,
  })
)(defaultStreamHandler);
