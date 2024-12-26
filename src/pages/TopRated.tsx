import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function TopRated() {
    return (
        <>
            <TabSwitcher path='topRated' />
            <Outlet />
        </>
    )
}