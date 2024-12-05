import { ReactNode } from 'react'

export function Main({ children }: { children: ReactNode }) {
    return (
        <main className="layout__main" style={{ display: 'flex', justifyContent: 'start', width: '100%', flex: 1 }}>{children}</main>
    )
}