import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { handleLogin } from '@/components/services/handleLogin'
import Nav from '../../../components/navegation/nav'
import SplitText from '../../../components/react-bits/textAparicionAnimations/SplitText'
import '../auth.css'

const initialCredentials = {
  email: '',
  password: '',
  rememberMe: false,
}

function LoginInterface({ onAuthenticated }) {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      await handleLogin({
        provider: 'email',
        email: credentials.email,
        password: credentials.password,
        onSuccess: onAuthenticated,
      })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    console.log('Forgot password requested')
    setMessage('Recuperación de contraseña lista para conectar.')
  }

  return (
    <div className="auth-page">
      <Nav />
      <main className="flex min-h-[calc(100vh-57px)] items-center justify-center p-4 sm:p-8">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md border border-black bg-white p-6 sm:p-10"
      >
        <header className="flex flex-col items-center">
          <div className="flex size-28 items-center justify-center border border-black" aria-hidden="true">
            <UserRound size={56} strokeWidth={1.5} />
          </div>
          <SplitText
            tag="h1"
            id="login-title"
            text="Iniciar sesión"
            className="mt-6 text-3xl font-semibold"
          />
        </header>

        <form className="mt-8 grid gap-5 border border-black p-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium" htmlFor="login-email">
            Correo electrónico
            <span className="flex border border-black focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
              <Mail className="m-3 shrink-0" size={20} aria-hidden="true" />
              <input
                className="min-h-11 min-w-0 flex-1 border-l border-black px-3 text-base outline-none"
                id="login-email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="login-password">
            Contraseña
            <span className="flex border border-black focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
              <LockKeyhole className="m-3 shrink-0" size={20} aria-hidden="true" />
              <input
                className="min-h-11 min-w-0 flex-1 border-l border-black px-3 text-base outline-none"
                id="login-password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </span>
          </label>

          <div className="flex flex-col gap-4 border border-black p-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm" htmlFor="remember-me">
              <input
                className="size-5 border border-black accent-black"
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={credentials.rememberMe}
                onChange={handleChange}
              />
              Recordarme
            </label>
            <button
              className="border border-black px-3 py-2 text-sm font-medium"
              type="button"
              onClick={handleForgotPassword}
            >
              Olvidé mi contraseña
            </button>
          </div>

          <button
            className="min-h-12 border border-black px-4 font-semibold tracking-widest disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'INGRESANDO...' : 'INGRESAR'}
          </button>

          <Link
            className="min-h-12 border border-black px-4 font-semibold"
            to="/register"
          >
            Crear una cuenta
          </Link>

          {message && (
            <p className="border border-black p-3 text-sm" role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>
      </section>
      </main>
    </div>
  )
}

export default LoginInterface
