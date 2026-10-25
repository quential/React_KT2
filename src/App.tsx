import { useState } from 'react'
import { useAuth } from './components/AuthContext'

function App() {
  return (
      <main>
        <Header />
        <Page />
      </main>
  )
}

function Header() {
  const { user } = useAuth()

  return (
      <header>
        <h1>Моё приложение</h1>
        <p>{user ? `Вы вошли как ${user.name}` : 'Вы не авторизованы'}</p>
      </header>
  )
}

function Page() {
  return (
      <section>
        <LoginPanel />
        <ProfileSection />
      </section>
  )
}

function LoginPanel() {
  const { user, login, logout } = useAuth()
  const [name, setName] = useState('')

  if (user) {
    return (
        <div>
          <p>Здравствуйте, {user.name}!</p>
          <button onClick={logout}>Выйти</button>
        </div>
    )
  }

  return (
      <form
          onSubmit={(event) => {
            event.preventDefault()
            if (name.trim()) {
              login(name)
              setName('')
            }
          }}
      >
        <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Введите имя"
        />
        <button type="submit">Войти</button>
      </form>
  )
}

function ProfileSection() {
  return (
      <div>
        <ProfileCard />
      </div>
  )
}

function ProfileCard() {
  const { user } = useAuth()

  return (
      <article>
        <h2>Профиль</h2>
        {user ? <p>ID пользователя: {user.id}</p> : <p>Профиль недоступен</p>}
      </article>
  )
}

export default App