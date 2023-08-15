import React, { FC, useState } from "react";

import { DiscussionEmbed } from "disqus-react";
import { DISQUS_SHORTNAME, NEXT_API_URL } from "@/utils/constants";
import dynamic from "next/dynamic";

type Props = {
  path: string;
  title: string;
};

const ChapterComments: FC<Props> = ({ path, title }) => {
  const disqusConfig = {
    url: NEXT_API_URL + path,
    identifier: path,
    title,
  };

  return (
    <section className="max-w-7xl mx-auto my-10 p-5">
      <DiscussionEmbed shortname={DISQUS_SHORTNAME!} config={disqusConfig} />
    </section>
  );
};

export default ChapterComments;
