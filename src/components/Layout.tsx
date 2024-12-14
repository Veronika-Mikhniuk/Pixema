import { Header } from '@/components/Header'
import { Main } from "@/components/Main"
import { LeftMenuPanel } from '@/components/LeftMenuPanel'
import { Outlet } from 'react-router-dom'

export function Layout() {
    return (
        <div
            className="layout"
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '1700px',
                minHeight: '100vh',
                padding: '0 10px',
                margin: '0 auto',
                position: 'relative',
                height: '100vh',
            }}>

            <Header />
            <Main>
                <LeftMenuPanel />
                <div className="container">
                    <Outlet />
                </div>
            </Main>
        </div>
    )

}