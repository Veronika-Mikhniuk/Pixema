import { useState, useRef } from 'react'
import { getInitials } from '@/utils/getInitials'
import { UserDropdownMenu } from '@/components/UserDropdownMenu'
import profileDropdownIcon from '@/assets/icons/profile-dropdown-icon.svg'
import '@/styles/user.scss'

export function User({ username }: { username: string }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const initials: string = username ? getInitials(username) : 'U'

    return (
        <div className="user">
            <div className="user__initials">
                <span>{initials}</span>
            </div>
            <p className="user__name">{username || "User"}</p>
            <button
                ref={buttonRef}
                type="button"
                className="user__dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img src={profileDropdownIcon} alt="*" />
            </button>
            <UserDropdownMenu
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                buttonRef={buttonRef}
            />
        </div>
    )
}