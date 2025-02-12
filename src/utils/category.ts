import { CATEGORY_ICONS } from "@/data";
import { IconType } from "react-icons";

export const getCategoryByNameId = (
  categoryId: string,
  categories: Category[]
): Category | undefined => {
  return categories.find((item) => item.nameId === categoryId);
};

export const getNominatedsByCategory = (
  nominateds: Nominated[],
  categories: Category[]
) => {
  return categories
    .filter((item) => item.active)
    .map((category) => {
      return {
        category,
        nominateds: nominateds.filter(
          (nominated) => nominated.category === category.nameId
        ),
      };
    });
};

export const getIconByCategory = (categoryNameId: string = ""): IconType => {
  return CATEGORY_ICONS[categoryNameId as ""] || CATEGORY_ICONS[""];
};
