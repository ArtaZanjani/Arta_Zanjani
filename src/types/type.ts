import type { UUID } from "crypto";

export type ProjectType = {
  id: UUID;
  title: string;
  category: string;
  link: string;
  image: string;
};
