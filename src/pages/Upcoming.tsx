import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function Upcoming() {
    return (
        <>
            <TabSwitcher path='upcoming' />
            <Outlet />
        </>
    )
}