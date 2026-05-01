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
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <div id="main">{children}</div>
      <CommandPalette />
      <ChatWidget />
    </>
  );
}
