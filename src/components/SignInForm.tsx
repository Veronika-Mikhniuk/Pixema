import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchSignIn, clearError } from '@/redux/auth-slice'
import { RootState } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { ISignInFormInputs } from '@/types/ISignInFormInputs'
import '@/styles/signInForm.scss'

export function SignInForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { sessionId, loading, error } = useSelector((state: RootState) => state.auth)

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ISignInFormInputs>({
        mode: "onBlur"
    })

    // clear error when changing fields
    useEffect(() => {
        const subscription = watch(() => {
            dispatch(clearError())
        })
        return () => subscription.unsubscribe() // when unmount - stop watching fields
    }, [watch])

    useEffect(() => {
        if (sessionId) {
            navigate('/')
        }
    }, [sessionId])

    const onSubmit = async (data: ISignInFormInputs) => {
        dispatch(fetchSignIn(data))
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
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
            {error && <p className="auth-form__auth-error">{error}</p>}

            <p className="auth-form__footer">
                Don't have an account? {' '}
                <NavLink to="/auth/sign-up" className="auth-form__link">
                    Sign Up
                </NavLink>
            </p>
        </form>
    )
}