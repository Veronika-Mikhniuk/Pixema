import { Outlet } from 'react-router-dom'
import { TabSwitcher } from '@/components/TabSwitcher'

export function SearchResult() {
    return (
        <>
            <TabSwitcher path='search' />
            <Outlet />
        </>
    )
}