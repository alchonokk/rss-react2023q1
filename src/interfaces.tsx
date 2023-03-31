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
