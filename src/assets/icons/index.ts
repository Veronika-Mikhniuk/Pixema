import homePageDefault from './home-page-icon.svg'
import homePageActive from './home-page-icon-active.svg'
import trendsPageDefault from './trends-page-icon.svg'
import trendsPageActive from './trends-page-icon-active.svg'
import favouritePageDefault from './Favorites-page-icon.svg'
import favouritePageActive from './favorites-page-icon-active.svg'
import settingsPageDefault from './settings-page-icon.svg'
import settingsPageActive from './settings-page-icon-active.svg'
import profileDropdown from './profile-dropdown-icon.svg'
import filterDefault from './filter-button-icon.svg'
import filterActive from './filter-button-icon-active.svg'
import darkThemeDefault from './theme-off-icon.svg'
import darkThemeActive from './theme-on-icon.svg'


import { IIcons } from '@/types/IIcons'

export const icons: IIcons = {
    nav: {
        home: {
            active: homePageActive,
            default: homePageDefault
        },
        popular: {
            active: trendsPageActive,
            default: trendsPageDefault
        },
        topRated: {
            active: trendsPageActive,
            default: trendsPageDefault
        },
        upcoming: {
            active: trendsPageActive,
            default: trendsPageDefault
        },
        favourite: {
            active: favouritePageActive,
            default: favouritePageDefault
        },
        settings: {
            active: settingsPageActive,
            default: settingsPageDefault
        }
    },
    profile: {
        dropdown: profileDropdown //TODO: Change
    },
    searchFilter: {
        active: filterActive,
        default: filterDefault
    },
    darkTheme: {
        active: darkThemeActive,
        default: darkThemeDefault
    }
}