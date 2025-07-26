import BackButton from "./common/BackButton"

const Header = ({ title }: { title?: string }): JSX.Element => {

  return (
    <header className="flex items-center justify-between">
      <BackButton />
      <span className="text-2xl font-semibold text-gray-900">{title}</span>
    </header>
  )
}

export default Header 