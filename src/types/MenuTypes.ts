export type PageType = 'home' | 'popular' | 'topRated' | 'upcoming' | 'favourite' | 'settings'

export interface IMenuItem {
    path: string
    page: PageType
    text: string
}