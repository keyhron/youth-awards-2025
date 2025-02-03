export interface INominated {
  id: string;
  name: string;
  winner: boolean;
  created: number | Date | string;
  votes: number;
  image: string;
  category: string;
}

export type TOldWinners = INominated[];
export type TNominateds = INominated[];

export interface ICategory {
  id: string;
  name: string;
  nameId: string;
  active: boolean;
}

export type TCategories = ICategory[];

export interface INominatedByCategory {
  category: ICategory;
  nominateds: TNominateds;
}

export type TNominatedsByCategory = INominatedByCategory[];

export interface TInitialData {
  categories: TCategories;
  // nominateds: TNominateds;
  // oldWinners: TOldWinners;
}

export interface IVote {
  id?: string;
  fullname: string;
  questions: {
    howDefine: string;
    forMeIs: string;
    forThisYear: string;
  };
  votes: Record<string, INominated>;
  created: Date | number | string;
}

