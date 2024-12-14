import { ReactNode, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function Main({ children }: { children: ReactNode }) {

    const containerRef = useRef<HTMLDivElement | null>(null)
    const location = useLocation()

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' }) // scrolling to the top of the page when pagination link was pressed
        }
    }, [location])

    return (
        <main
            className="layout__main"
            ref={containerRef}
            style={{ display: 'flex', justifyContent: 'start', width: '100%', flex: '1', overflow: 'auto', height: 'calc(100vh - 96px)' }}>{children}
        </main>
    )
}