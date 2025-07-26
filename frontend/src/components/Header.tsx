import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  path: string
  label: string
}

const Header = (): JSX.Element => {
  const location = useLocation()

  const navItems: NavItem[] = [
    { path: '/', label: '홈' },
    { path: '/about', label: '소개' },
  ]

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            KPSA Hackathon 2025
          </Link>

          <nav className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 