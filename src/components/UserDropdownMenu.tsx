import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { signOut } from '@/redux/auth-slice'
import '@/styles/userDropdownMenu.scss'

interface IDropdownMenuProps {
    isOpen: boolean
    onClose: () => void
    buttonRef: React.RefObject<HTMLButtonElement>
}

export function UserDropdownMenu({ isOpen, onClose, buttonRef }: IDropdownMenuProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleProfileClick = () => {
        navigate('/profile')
        onClose()
    }

    const handleSignOutClick = () => {
        dispatch(signOut())
        navigate('/')
        onClose()
    }

    return (
        <div ref={menuRef} className="dropdown" onClick={onClose}>
            <div
                className="dropdown__menu"
                onClick={e => e.stopPropagation()}
            >
                <div className="dropdown__content">
                    <button
                        className="dropdown__button"
                        onClick={() => handleProfileClick()}
                    >
                        Profile
                    </button>
                    <button
                        className="dropdown__button"
                        onClick={() => handleSignOutClick()}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}