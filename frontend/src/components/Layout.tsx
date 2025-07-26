import { Outlet } from 'react-router-dom'

const Layout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout 