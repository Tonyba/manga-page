import { ContentType } from "@/utils/types";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Content = () => {
  const [content, setContent] = useState<ContentType>();

  useEffect(() => {
    setContent({
      id: parseInt(faker.random.numeric()),
      contentType: faker.random.word(),
      title: faker.random.words(2),
      description: faker.lorem.words(80),
      demography: faker.datatype.string(),
      image: "https://picsum.photos/1024/450",
    });
  }, []);

  return (
    <section
      className="py-5"
      style={{
        backgroundImage: `url(${content?.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Image
        width={530}
        height={530}
        className="rounded-lg 
        h-[380px]  
        mx-auto
        -mb-10
        z-10
        relative
        "
        src={content?.image as string}
        alt={content?.title || ""}
      />
      <div
        className="
      max-w-7xl 
      w-full mx-auto
      bg-slate-600
      relative
      px-7
      pt-14
      pb-7
      
      rounded-md
      "
      >
        <h1 className="text-center font-medium mb-3 text-4xl">
          {content?.title}
        </h1>
        <p>{content?.description}</p>
      </div>
    </section>
  );
};

export default Content;
