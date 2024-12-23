import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import '@/styles/signInForm.scss'

export function SignInForm() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            // Здесь будет логика авторизации
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log('Form data:', data)
            navigate('/') // редирект на главную
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="auth-form__title">Sign In</h2>

            <div className="auth-form__field">
                <label className="auth-form__label">
                    Username
                </label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters'
                        }
                    })}
                />
                {errors.username && (
                    <p className="auth-form__error">{errors.username.message}</p>
                )}
            </div>

            <div className="auth-form__field">
                <label className="auth-form__label">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    })}
                />
                {errors.password && (
                    <p className="auth-form__error">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="auth-form__submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="auth-form__footer">
                Don't have an account? {' '}
                <NavLink to="/auth/sign-up" className="auth-form__link">
                    Sign Up
                </NavLink>
            </p>
        </form>
    )
}