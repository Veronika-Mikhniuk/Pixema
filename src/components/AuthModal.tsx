import '@/styles/authModal.scss'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    onNavigateToAuth: () => void
}

export function AuthModal({ isOpen, onClose, onNavigateToAuth }: AuthModalProps) {
    if (!isOpen) return null

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                <button className="auth-modal__close" onClick={onClose}>✖</button>
                <h2 className="auth-modal__title">Sign In Required</h2>
                <p className="auth-modal__text">
                    Please sign in or create an account to add movies to favorites
                </p>
                <div className="auth-modal__actions">
                    <button className="auth-modal__link" onClick={onNavigateToAuth}>
                        Sign In / Sign Up
                    </button>
                    <button className="auth-modal__ok" onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}