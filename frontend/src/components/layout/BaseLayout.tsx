import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface BaseLayoutProps {
  children?: ReactNode
  header?: ReactNode
  className?: string
  mainClassName?: string
}

const BaseLayout = ({
  header,
  className = "min-h-[100dvh] max-w-[412px] mx-auto ",
  mainClassName,
  children
}: BaseLayoutProps): JSX.Element => {
  return (
    <div className={className}>
      {header}
      <main className={mainClassName}>
        <Outlet />
      </main>
      {children}
    </div>
  )
}

export default BaseLayout