import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface BaseLayoutProps {
  children?: ReactNode
  className?: string
  mainClassName?: string
}

const BaseLayout = ({
  children,
  className = "min-h-[100dvh] max-w-[412px] mx-auto",
  mainClassName = ""
}: BaseLayoutProps): JSX.Element => {
  return (
    <div className={className}>
      <main className={mainClassName}>
        <Outlet />
      </main>
      {children}
    </div>
  )
}

export default BaseLayout