export interface Genre {
    id: number;
    name: string;
  }

export interface film {
    id: number
    title: string
    year: number
    description: string
    imageUrl: string
    genre: Genre[]

}