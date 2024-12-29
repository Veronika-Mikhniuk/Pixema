import { IFilterFormData, IApiParams } from '@/types/IFilterParams'

type ContentType = 'films' | 'series'

export const prepareFilterParams = (formData: IFilterFormData, contentType: ContentType): IApiParams => {

    const apiParams = contentType === 'films'
        ? {
            sort_by: formData.sortBy,
            'vote_average.gte': formData.ratingFrom || '',
            'vote_average.lte': formData.ratingTo || '',
            'primary_release_date.gte': formData.yearFrom ? `${formData.yearFrom}-01-01` : '',
            'primary_release_date.lte': formData.yearTo ? `${formData.yearTo}-12-31` : '',
            'with_origin_country': formData.country || '',
            'with_genres': formData.genres ? formData.genres.join(',') : ''
        }
        : {
            sort_by: formData.sortBy,
            'vote_average.gte': formData.ratingFrom || '',
            'vote_average.lte': formData.ratingTo || '',
            'first_air_date.gte': formData.yearFrom ? `${formData.yearFrom}-01-01` : '',
            'first_air_date.lte': formData.yearTo ? `${formData.yearTo}-12-31` : '',
            'with_origin_country': formData.country || '',
            'with_genres': formData.genres ? formData.genres.join(',') : ''
        }

    const cleanApiParams = Object.fromEntries(
        Object.entries(apiParams).filter(([_, value]) => value !== '')
    )
    return cleanApiParams as IApiParams
}

export const convertUrlFilterParams = (
    filterParams: Record<string, string>,
    contentType: ContentType
): Record<string, string> => {
    if (contentType === 'films') {
        return Object.fromEntries(
            Object.entries(filterParams).map(([key, value]) => {
                const filmKey = key === 'first_air_date.gte' ? 'primary_release_date.gte' :
                    key === 'first_air_date.lte' ? 'primary_release_date.lte' :
                        key === 'origin_country' ? 'with_origin_country' :
                            key

                return [filmKey, value]
            })
        )
    }
    if (contentType === 'series') {
        return Object.fromEntries(
            Object.entries(filterParams).map(([key, value]) => {
                const filmKey = key === 'primary_release_date.gte' ? 'first_air_date.gte' :
                    key === 'primary_release_date.lte' ? 'first_air_date.lte' :
                        key

                return [filmKey, value]
            })
        )
    }
    return filterParams
}