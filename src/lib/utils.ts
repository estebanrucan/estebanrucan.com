export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.includes("#")) {
    return false;
  }

  const cleanHref = href.split("#")[0];
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}
