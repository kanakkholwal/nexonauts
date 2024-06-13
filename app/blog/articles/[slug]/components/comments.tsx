"use client";

import Giscus from '@giscus/react';

export function CommentsSection() {
    return (
        <Giscus
            id="comments"
            data-repo="kanakkholwal/nexonauts"
            data-repo-id="R_kgDOKgo8BA"
            data-category="Show and tell"
            data-category-id="DIC_kwDOKgo8BM4CgEoh"
            data-mapping="og:title"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="preferred_color_scheme"
            data-lang="en"
            data-loading="lazy"
            loading="lazy"
        />
    );
}