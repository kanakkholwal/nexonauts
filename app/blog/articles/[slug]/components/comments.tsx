"use client";

import Giscus from "@giscus/react";

export function CommentsSection() {
  return (
    <Giscus
      id="comments"
      repo="kanakkholwal/nexonauts"
      repoId="R_kgDOKgo8BA"
      category="Show and tell"
      categoryId="DIC_kwDOKgo8BM4CgEoh"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  );
}
