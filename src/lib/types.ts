export type Field = "interactive" | "designer" | "maps" | "mastermind" | "hands";

export interface Folk {
  id: number;
  data: FolkData;
}

export interface FolkData {
  name: string;
  page: string;
  type: Field | string;
  image: string;
  reason?: string;
  reasonMobile?: string;
}

export interface FeaturedFolk {
  folkId: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  description: string;
  location: string;
  url: string;
  type: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
  date: string;
  expires: string;
}

export interface Work {
  id: string;
  title: string;
  url: string;
  source: string;
  authorNames: string[];
  folkIds?: number[];
  note: string;
  collection: string;
  accent: string;
  gif?: string;
}
