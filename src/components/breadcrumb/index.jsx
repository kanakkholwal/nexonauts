import Link from "next/link";
import { removeStringAfterWord } from "src/lib/scripts";

import { usePathname } from "next/navigation";
import React from "react";
import { GrFormNext } from "react-icons/gr";

export function BreadCrumb() {
  const path = usePathname();
  const pathArray = path.split("/");

  return (
    <nav
      className="flex justify-start gap-1 truncate mb-5 px-4 py-3 w-full"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {pathArray.map((item, index, list) => {
        if (index === 0) {
          return (
            <div
              key={`${pathArray[0]}_${pathArray[1]}_breadcrumbs_${index}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                itemProp="item"
                itemScope
                itemType="https://schema.org/Thing"
              >
                <span title="name">Home</span>
              </Link>
            </div>
          );
        }
        return (
          <React.Fragment key={index}>
            <GrFormNext />
            <div key={index}>
              <Link
                href={`${removeStringAfterWord(path, item)}`}
              data-active={index === list.length - 1 ? "true" : "false"}
              >
                <span>{item}</span>
              </Link>
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
export function BlogBreadCrumb({ category, slug, title }) {
  return (
    <div style={{ marginBottom: "0" }}>
      <div>
        <Link href="/blog">
          <span>Blog</span>
        </Link>
      </div>
      <GrFormNext />
      <div>
        <Link href={`/blog/labels/category`} data-active={"false"}>
          <span>{category}</span>
        </Link>
      </div>
      <GrFormNext />
      <div>
        <Link href={`/blog/posts/${slug}`} data-active={"true"}>
          <span>{title}</span>
        </Link>
      </div>
    </div>
  );
}
