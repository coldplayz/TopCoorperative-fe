import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { join } from "path";

import { ClientRoutes } from "@/app.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function createBreadcrumbItems(
  pathname: string = ClientRoutes.dashboard.home
) {
  const [root, ...children] = pathname
    .split('/')
    .filter((segment)=> !!segment); // remove empty strings

  // Init the items array
  const items = [
    { label: capitalize(root), href: `/${root}` },
  ];

  children.forEach((segment, i) => {
    // `i` will correctly point to the last element in `items`
    const item = {
      label: capitalize(segment),
      href: join(items[i].href, segment),
    };

    items.push(item);
  });

  return items;
}

/**
 * Join together pieces of a URL path. Note: `/`s are regarded as delimiters.
 */
/*
export function join(...strArr: string[]) {
  let joinedStr = '';
  const arrLen = strArr.length;

  strArr.forEach((str, i) => {
    const strNoSlash = str.replace(/\//g, '');
    if (i === arrLen - 1) {
      joinedStr += `${strNoSlash}`;
    } else {
      joinedStr += `${strNoSlash}/`;
    }
  });

  return joinedStr;
}
*/

// Test
// console.log(join('dashboard/', '/requests/', 'pending'));

// Test
// console.log(createBreadcrumbItems('/dashboard/requests/pending')); // SCAFF
