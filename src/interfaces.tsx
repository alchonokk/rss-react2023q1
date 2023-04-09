export type FormProps = {
  updateData(
    name: string | undefined,
    surName: string | undefined,
    date: string | undefined,
    city: string | undefined,
    male: boolean | undefined,
    female: boolean | undefined,
    file: string | undefined
  ): void;
};

export type FormData = {
  name: string;
  surName: string;
  date: string;
  city: string;
  male: boolean;
  female: boolean;
  file: string;
};

export type FormDataNew = {
  name: string;
  surName: string;
  date: string;
  city: string;
  gender: string;
  filePicture: string;
};

export type FormState = {
  name: string | undefined;
  surName: string | undefined;
  date: string | undefined;
  city: string | undefined;
  male: boolean | undefined;
  female: boolean | undefined;
  file: string | undefined;
  fields: FormData[];
};

export type SearchCard = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

export type IValueToModal = {
  isShowing: boolean;
  hide: () => void;
  cardData: Partial<SearchCard>;
};
