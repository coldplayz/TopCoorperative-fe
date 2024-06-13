'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createBreadcrumbItems } from "@/lib/utils";
import { MAX_BREADCRUMB_ITEMS } from "@/app.config";

const log = console.log; // SCAFF

export default function BreadCrumbs() {
  const pathname = usePathname();

  const AllBreadCrumbsItems = createBreadcrumbItems(pathname);
  // const AllBreadCrumbsItems = createBreadcrumbItems('/dashboard/requests/pending');
  const breadCrumbItems = AllBreadCrumbsItems.slice(-MAX_BREADCRUMB_ITEMS);

  // log(pathname); // SCAFF

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {
            breadCrumbItems.map((item, i) => {
              if (breadCrumbItems.length === 1) {
                // Only item; use home icon
                return (
                  <BreadcrumbItem key={item.href}>
                    <BreadcrumbPage>
                      <FaHome />
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }

              if (i === (breadCrumbItems.length - 1)) {
                // Last item; make as non-link item
                return (
                  <BreadcrumbItem key={item.href}>
                    <BreadcrumbPage>
                      {item.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }

              if (i === 0) {
                // First item; use home icon
                return (
                <>
                  <BreadcrumbItem key={item.href}>
                    <BreadcrumbLink asChild>
                      <Link href={item.href}><FaHome /></Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
                );
              }

              // Not last or only item; make a link item
              return (
                <>
                  <BreadcrumbItem key={item.href}>
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
