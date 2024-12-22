export const createFilterValidation = (watch) => {
    const ratingFrom = watch('ratingFrom')
    const ratingTo = watch('ratingTo')
    const yearFrom = watch('yearFrom')
    const yearTo = watch('yearTo')

    return {
        yearFrom: {
            min: {
                value: 1900,
                message: 'Year cannot be earlier than 1900'
            },
            max: {
                value: new Date().getFullYear(),
                message: `Year cannot be later than ${new Date().getFullYear()}`
            },
            validate: (value) =>
                !yearTo || Number(value) <= Number(yearTo) ||
                'Can\'t be more than end year'
        },
        yearTo: {
            min: {
                value: 1900,
                message: 'Year cannot be earlier than 1900'
            },
            max: {
                value: new Date().getFullYear(),
                message: `Year cannot be later than ${new Date().getFullYear()}`
            },
            validate: (value) =>
                !yearFrom || Number(value) >= Number(yearFrom) ||
                'Can\'t be less than start year'
        },
        ratingFrom: {
            min: {
                value: 0,
                message: 'Rating cannot be less than 0'
            },
            max: {
                value: 10,
                message: 'Rating cannot be more than 10'
            },
            validate: (value) =>
                !ratingTo || Number(value) <= Number(ratingTo) ||
                'Can\'t be more than end rating'
        },
        ratingTo: {
            min: {
                value: 0,
                message: 'Rating cannot be less than 0'
            },
            max: {
                value: 10,
                message: 'Rating cannot be more than 10'
            },
            validate: (value) =>
                !ratingFrom || Number(value) >= Number(ratingFrom) ||
                'Can\'t be less than start rating'
        }
    }
}

