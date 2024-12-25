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
            validate: (value) => {
                // Проверяем только если заполнены оба поля
                if (value && yearTo) {
                    return Number(value) <= Number(yearTo) || 'Can\'t be more than end year'
                }
                return true
            }
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
            validate: (value) => {
                if (value && yearFrom) {
                    return Number(value) >= Number(yearFrom) || 'Can\'t be less than start year'
                }
                return true
            }
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
            validate: (value) => {
                if (value && ratingTo) {
                    return Number(value) <= Number(ratingTo) || 'Can\'t be more than end rating'
                }
                return true
            }
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
            validate: (value) => {
                if (value && ratingFrom) {
                    return Number(value) >= Number(ratingFrom) || 'Can\'t be less than start rating'
                }
                return true
            }
        }
    }
}

