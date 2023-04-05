import { ImageModule } from "@faker-js/faker";

export type ContentType = {
  id: number;
  title: string;
  image: string | ImageModule;
  description: string;
  contentType: string;
  demography: string;
};

export type TabItemType = {
  label: string;
  content?: React.ReactNode;
};
