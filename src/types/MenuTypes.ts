export type PageType = 'home' | 'popular' | 'favourite' | 'settings'

export interface IMenuItem {
    path: string
    page: PageType
    text: string
}