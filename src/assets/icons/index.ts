import homePageDefault from './home-page-icon.svg'
import homePageActive from './home-page-icon-active.svg'
import trendsPageDefault from './trends-page-icon.svg'
import trendsPageActive from './trends-page-icon-active.svg'
import favouritePageDefault from './Favorites-page-icon.svg'
import favouritePageActive from './favorites-page-icon-active.svg'
import settingsPageDefault from './settings-page-icon.svg'
import settingsPageActive from './settings-page-icon-active.svg'
import profileDropdown from './profile-dropdown-icon.svg'
import filterDefault from './profile-dropdown-icon.svg'
import darkThemeDefault from './theme-off-icon.svg'
import darkThemeActive from './theme-on-icon.svg'


import { IIcons } from '@/types/IIcons'

export const icons: IIcons = {
    nav: {
        home: {
            active: homePageActive,
            default: homePageDefault
        },
        trends: {
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
        active: filterDefault,
        default: filterDefault //TODO: Change
    },
    darkTheme: {
        active: darkThemeActive,
        default: darkThemeDefault
    }
}