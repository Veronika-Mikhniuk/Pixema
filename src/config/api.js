export const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2IyMWNlMzhhODkxZWIzNDEzOWUzNjE3YTYwZjYxZCIsIm5iZiI6MTczMzYxMDE0OS43MDU5OTk5LCJzdWIiOiI2NzU0Y2FhNTJlNDc5M2NlOTY0OTY1NTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TCiQRxVf7UTCnikYs41wUUyv4YEVn2yF_PbzDNZV_xM'
}

export const filmsEndpoints = {
    films: {
        all: '/discover/movie', // have filtering queryParams
        // have only pagination pages
        popular: '/movie/popular',
        topRated: '/movie/top_rated',
        upcoming: '/movie/upcoming'
    },
    tv: {
        all: '/discover/tv', // have filtering queryParams
        // have only pagination pages
        popular: '/tv/popular',
        topRated: '/tv/top_rated',
        onTheAir: '/tv/on_the_air'
    }
}

export const defaultParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    sort_by: 'popularity.desc'
}

export const baseImgUrl = 'https://image.tmdb.org/t/p/'

export const maxPageLimit = 500 //according to api docs