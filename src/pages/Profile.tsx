import { useSelector } from 'react-redux'
import { Title } from '@/components/Title'
import { RootState } from '@/redux/store'

export function Profile() {
    const { username } = useSelector((state: RootState) => state.auth)

    return (
        <div className="profile">
            <Title>Profile</Title>
            <div className="mt-6">
                <p className="text-[var(--text-primary)]">Username: {username}</p>
            </div>
        </div>
    )
}