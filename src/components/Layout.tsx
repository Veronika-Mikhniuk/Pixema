import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Main } from "@/components/Main"
import { LeftMenuPanel } from './LeftMenuPanel'
import { Outlet } from "react-router-dom"

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
                gap: '40px'
            }}>

            <Header />
            <Main>
                <LeftMenuPanel />
                <div className="container">
                    <Outlet />
                </div>
            </Main>
            <Footer />
        </div>
    )

}