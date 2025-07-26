import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-4 pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout 