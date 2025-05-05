interface Image {
  id: number;
  image: string;
  order: number;
  is_main: boolean;
}

interface Category {
  id: number;
  title: string;
}

interface Card {
  id: number;
  title: string;
  text: string;
  address: string;
  count: number;
  maps: string;
  categories: Category[];
  images: Image[];
}

export interface Country {
  id: string;
  title: string;
  description?: string;
  cards: Card[];
}
