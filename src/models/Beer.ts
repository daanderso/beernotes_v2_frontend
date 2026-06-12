export type Beer = {
  id?: number;
  name: string;
  style: string;
  brewery: string;
  origin: string;
  note: string;
  rating?: number | null;
};