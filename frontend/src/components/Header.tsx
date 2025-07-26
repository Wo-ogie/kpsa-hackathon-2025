import BackButton from "./common/BackButton"

const Header = ({ title }: { title?: string }): JSX.Element => {

  return (
    <header className="flex items-center justify-between max-h-[40px] px-5 pt-5">
      <BackButton />
      <span className="text-2xl font-semibold text-gray-900">{title}</span>
    </header>
  )
}

export default Header 