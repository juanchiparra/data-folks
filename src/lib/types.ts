export type Field =
    | "interactive"
    | "designer"
    | "maps"
    | "mastermind"
    | "hands";

export interface FolkData {
    name: string;
    page: string;
    type: Field | string;
    image: string;
    reason?: string;
    reasonMobile?: string;
}

export interface Folk {
    id: number;
    data: FolkData;
}

export interface FeaturedFolk {
    folkId: number;
}
