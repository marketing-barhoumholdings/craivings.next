"use client";

import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("../src/ClientApp"), { ssr: false });

export default function Home() {
  return /*#__PURE__*/ _jsx(ClientApp, {});
}