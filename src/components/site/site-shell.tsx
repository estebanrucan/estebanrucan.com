import type { ReactNode } from "react";

import { ChatWidget } from "./chat-widget";
import { CommandPalette } from "./command-palette";
import { Header } from "./header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      {children}
      <CommandPalette />
      <ChatWidget />
    </>
  );
}
