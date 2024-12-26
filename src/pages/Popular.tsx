import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function Popular() {
    return (
        <>
            <TabSwitcher path='popular' />
            <Outlet />
        </>
    )
}