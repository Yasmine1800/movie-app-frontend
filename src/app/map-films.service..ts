import { film } from '../model/film.model';

export const mapFilmData = (film: any): film => {
        return {
            id: film.id,
            title: film.title,
            year: film.release_date,
            description: film.overview,
            imageUrl: film.poster_path,
            genre: film.genres
        };
}
