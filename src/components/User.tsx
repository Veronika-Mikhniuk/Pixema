import { getInitials } from '@/utils/getInitials'
import '@/styles/user.scss'
import profileDropdownIcon from '@/assets/icons/profile-dropdown-icon.svg'

export function User({ username }: { username: string }) {
    const initials: string = username ? getInitials(username) : 'U'

    return (
        <div className="user">
            <div className="user__initials">
                <span>{initials}</span>
            </div>
            <p className="user__name">{username || "User"}</p>
            <button type="button" className="user__dropdown-button">
                <img src={profileDropdownIcon} alt="*" />
            </button>
        </div>
    )
}