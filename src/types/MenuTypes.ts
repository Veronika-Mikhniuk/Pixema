export type PageType = 'home' | 'trends' | 'favourite' | 'settings'

export interface IMenuItem {
    path: string
    page: PageType
    text: string
}