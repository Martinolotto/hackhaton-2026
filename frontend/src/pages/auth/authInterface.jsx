import { useState } from 'react'
import { Link } from 'react-router'
import { handleRegister } from '@/components/services/registerHandler'
import Nav from '../../components/navegation/nav'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptedTerms: false,
}

function AuthInterface({ onRegistered }) {
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.acceptedTerms) {
      setMessage('Debes aceptar los términos y condiciones para crear una cuenta.')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      const result = await handleRegister({
        provider: 'email',
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        onSuccess: onRegistered,
      })

      if (result.requiresEmailConfirmation) {
        setMessage('Revisa tu correo electrónico para confirmar tu cuenta.')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialRegister = async () => {
    setIsSubmitting(true)
    setMessage('')

    try {
      await handleRegister({ provider: 'google' })
    } catch (error) {
      setMessage(error.message)
      setIsSubmitting(false)
    }
  }

  const handleBackToWebsite = () => {
    console.log('Back to website')
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <main className="min-h-[calc(100vh-57px)] p-4 sm:p-8 lg:flex lg:items-center lg:justify-center lg:p-12">
      <section
        aria-label="Crear una cuenta"
        className="mx-auto grid w-full max-w-6xl border border-black bg-white md:grid-cols-2"
      >
        <aside className="flex min-h-112 flex-col border-b border-black p-5 md:min-h-150 md:border-r md:border-b-0 md:p-8">
          <header className="flex items-center justify-between gap-4">
            <p className="border border-black px-3 py-2 text-lg font-bold tracking-widest">
              AMU
            </p>
            <button
              type="button"
              onClick={handleBackToWebsite}
              className="border border-black px-3 py-2 text-sm font-medium"
            >
              Volver al sitio →
            </button>
          </header>

          <div className="mt-8 flex flex-1 items-center justify-center border border-black p-6 text-center">
            <p className="max-w-56 text-sm">Espacio reservado para la imagen principal</p>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Capturando momentos,
              <br />
              creando recuerdos
            </h1>
            <div className="mt-6 flex justify-center gap-2" aria-label="Indicador de diapositivas">
              <span className="h-1 w-7 border border-black" />
              <span className="h-1 w-7 border border-black" />
              <span className="h-1 w-7 border-2 border-black" />
            </div>
          </div>
        </aside>

        <section className="flex min-h-150 flex-col p-5 sm:p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Crear una cuenta</h2>
            <p className="mt-3 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link
                className="font-medium underline underline-offset-2"
                to="/login"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>

          <form className="mt-9 grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium" htmlFor="firstName">
                Nombre
                <input
                  className="min-h-11 w-full border border-black px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium" htmlFor="lastName">
                Apellido
                <input
                  className="min-h-11 w-full border border-black px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium" htmlFor="email">
              Correo electrónico
              <input
                className="min-h-11 w-full border border-black px-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium" htmlFor="password">
              Contraseña
              <span className="flex border border-black focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2">
                <input
                  className="min-h-11 min-w-0 flex-1 px-3 text-base outline-none"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  className="border-l border-black px-3 text-sm font-medium"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </span>
            </label>

            <label className="flex items-start gap-3 text-sm" htmlFor="acceptedTerms">
              <input
                className="mt-0.5 size-5 border border-black accent-black"
                id="acceptedTerms"
                name="acceptedTerms"
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={handleChange}
              />
              <span>
                Acepto los{' '}
                <a className="underline underline-offset-2" href="#terminos">
                  términos y condiciones
                </a>
                .
              </span>
            </label>

            <button
              className="min-h-12 border border-black px-4 font-medium disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            {message && (
              <p className="border border-black p-3 text-sm" role="status" aria-live="polite">
                {message}
              </p>
            )}
          </form>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
            <span className="border-t border-black" />
            <span>O regístrate con</span>
            <span className="border-t border-black" />
          </div>

          <div className="mt-4 grid gap-4">
            <button
              className="min-h-11 border border-black px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={handleSocialRegister}
              disabled={isSubmitting}
            >
              Google
            </button>
          </div>
        </section>
      </section>
      </main>
    </div>
  )
}

export default AuthInterface
