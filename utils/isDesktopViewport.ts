import { Page } from "@playwright/test";

export const isDesktopViewport = (page: Page): boolean => {
  const size = page.viewportSize();
  return (size?.width ?? 0) >= 600;
}