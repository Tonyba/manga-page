import React, { useEffect, useState } from "react";
import AdComponent from "../Ad/AdComponent";
import Tabs from "../Tabs/Tabs";
import { ContentType, TabItemType } from "@/utils/types";
import { faker } from "@faker-js/faker";
import CardLoop from "../cardLoop/cardLoop";

export const HomeSidebar = () => {
  const [tabs, setTabs] = useState<TabItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const example: TabItemType[] = [];

    for (let index = 0; index < 3; index++) {
      const items: ContentType[] = [];

      for (let j = 0; j < 5; j++) {
        items.push({
          id: parseInt(faker.random.numeric()),
          contentType: faker.random.word(),
          title: faker.random.words(20),
          description: faker.lorem.words(20),
          demography: faker.datatype.string(),
          image: faker.image,
        });
      }

      example.push({
        content: <CardLoop items={items} itemType="list" oneCol={true} />,
        label: faker.lorem.words(1),
      });
    }

    console.log(example);
    setTabs(example);
    setLoading(false);
  }, []);

  return (
    <>
      <AdComponent />

      <h3 className="my-5 text-2xl font-semibold text-center">
        Recomendaciones
      </h3>

      <Tabs tabs={tabs} loading={loading} />
    </>
  );
};
