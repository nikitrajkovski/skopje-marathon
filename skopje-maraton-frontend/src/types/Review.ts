export type Review = {
  id: number;
  comment: string;
  rating: number;
  user: {
    id: number;
    fullName: string;
  };
};