import { CATEGORY_ICONS } from '@/data';
import { ICategory, TCategories, TNominateds } from '@/interfaces';
import { IconType } from 'react-icons';

export const getCategoryByNameId = (
  categoryId: string,
  categories: TCategories
): ICategory | undefined => {
  return categories.find((item) => item.nameId === categoryId);
};

export const getNominatedsByCategory = (
  nominateds: TNominateds,
  categories: TCategories
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

export const getIconByCategory = (categoryNameId: string = ''): IconType => {
  return CATEGORY_ICONS[categoryNameId as ''] || CATEGORY_ICONS[''];
};

