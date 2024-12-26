import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function Home() {
    return (
        <>
            <TabSwitcher />
            <Outlet />
        </>
    )
}