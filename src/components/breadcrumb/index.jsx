import { removeStringAfterWord } from "lib/scripts";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";
import { GrFormNext } from "react-icons/gr";


export function BreadCrumb() {

    const path = usePathname()
    const pathArray = path.split('/');

    return (
        <nav className="flex justify-start gap-1 truncate mb-5 px-4 py-3 w-full" itemScope='itemscope'
            itemType='https://schema.org/BreadcrumbList'>
            {pathArray.map((item, index, list) => {
                if (index === 0) {
                    return <ItemListElement key={`${pathArray[0]}_${pathArray[1]}_breadcrumbs_${index}`} itemProp='itemListElement'
                        itemScope='itemscope'
                        itemType='https://schema.org/ListItem'>
                        <Link href="/" itemProp='item'
                            itemScope='itemscope'
                            itemType='https://schema.org/Thing'>
                            <span name='name'>Home</span>
                        </Link>
                    </ItemListElement>;
                }
                return (
                    <React.Fragment key={index}>
                        <GrFormNext />
                        <ItemListElement key={index}>
                            <Item href={`${removeStringAfterWord(path, item)}`} active={index === (list.length - 1) ? "true" : "false"}>
                                <ItemName>{item}</ItemName>
                            </Item>
                        </ItemListElement>
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
export function BlogBreadCrumb({ category, slug, title }) {

    return (
        <BreadcrumbList style={{ marginBottom: "0" }}>
            <ItemListElement>
                <Item href="/blog">
                    <ItemName>Blog</ItemName>
                </Item>
            </ItemListElement>
            <GrFormNext />
            <ItemListElement>
                <Item href={`/blog/labels/category`} active={"false"}>
                    <ItemName>{category}</ItemName>
                </Item>
            </ItemListElement>
            <GrFormNext />
            <ItemListElement>
                <Item href={`/blog/posts/${slug}`} active={"true"}>
                    <ItemName>{title}</ItemName>
                </Item>
            </ItemListElement>
        </BreadcrumbList>
    )
}