interface Nominated {
  id: string;
  name: string;
  winner: boolean;
  created: number | Date | string;
  votes: number;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  nameId: string;
  active: boolean;
}

interface NominatedByCategory {
  category: Category;
  nominateds: Nominated[];
}

interface TInitialData {
  categories: Category[];
  // nominateds: Nominateds;
  // oldWinners: Nominateds;
}

interface Vote {
  id?: string;
  fullname: string;
  questions: {
    howDefine: string;
    forMeIs: string;
    forThisYear: string;
  };
  votes: Record<string, Nominated>;
  created: Date | number | string;
}
