interface IIconSet {
    active: string
    default: string
}

interface INavIcons {
    home: IIconSet
    trends: IIconSet
    favourite: IIconSet
    settings: IIconSet
}

export interface IIcons {
    nav: INavIcons
    profile: {
        dropdown: string
    }
    searchFilter: IIconSet
}