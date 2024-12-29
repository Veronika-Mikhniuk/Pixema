import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccountDetails } from '@/redux/auth-slice'
import { Title } from '@/components/Title'
import { RootState, AppDispatch } from '@/redux/store'
import '@/styles/profile.scss'

export function Profile() {
    const dispatch = useDispatch<AppDispatch>()
    const { sessionId, loading, error, accountData } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (sessionId) {
            dispatch(fetchAccountDetails(sessionId))
        }
    }, [sessionId, dispatch])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!accountData) return null

    return (
        <div className="profile">
            <Title secondary>Profile</Title>
            <div className="profile__card">
                <div className="profile__info-item">
                    <span className="profile__label">ID</span>
                    <p className="profile__value">{accountData.id}</p>
                </div>
                <div className="profile__info-item">
                    <span className="profile__label">Username</span>
                    <p className="profile__value">{accountData.username}</p>
                </div>
                {accountData.name && (
                    <div className="profile__info-item">
                        <span className="profile__label">Name</span>
                        <p className="profile__value">{accountData.name}</p>
                    </div>
                )}
                {accountData.language && (
                    <div className="profile__info-item">
                        <span className="profile__label">Language</span>
                        <p className="profile__value">{accountData.language}</p>
                    </div>
                )}
                {accountData.country && (
                    <div className="profile__info-item">
                        <span className="profile__label">Country</span>
                        <p className="profile__value">{accountData.country}</p>
                    </div>
                )}
            </div>
        </div>
    )
}