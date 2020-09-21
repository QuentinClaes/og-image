import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { fontSize, images, widths, heights, theme, md, rating, id, locale } =
    query || {};
  if (Array.isArray(fontSize)) {
    throw new Error("Expected a single fontSize");
  }
  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
    theme: theme === "dark" ? "dark" : "light",
    md: md === "1" || md === "true",
    fontSize: fontSize || "96px",
    images: getArray(images),
    widths: getArray(widths),
    heights: getArray(heights),
    rating: getArray(rating),
    id: getArray(id),
    locale: locale === "en" ? "en" : locale === "nl" ? "nl" : "fr" 
  };
  parsedRequest.images = getDefaultImages(
    parsedRequest.images,
    parsedRequest.theme
  );
  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  const defaultImage =
    theme === "light"
      ? "https://lh3.googleusercontent.com/proxy/26IeEIPUwebKU-oaR6A6ovSBWcmW4acQBtl6N2aChJq1-x_bt6DMPmZbqE2pk8tLw73ztFywj2M7aF6iyyBxl1yteKostM5UO00UQ8NVWSXSjHzTgdAiekl_75vhKakgsEBn2N0"
      : "data:image/png;base64,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";

  if (!images || !images[0]) {
    return [defaultImage];
  }
  if (
    !images[0].startsWith("https://assets.vercel.com/") &&
    !images[0].startsWith("https://assets.zeit.co/")
  ) {
    images[0] = defaultImage;
  }
  return images;
}
