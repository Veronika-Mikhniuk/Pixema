import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function Favourites() {
    return (
        <>
            <TabSwitcher path='favourites' />
            <Outlet />
        </>
    )
}