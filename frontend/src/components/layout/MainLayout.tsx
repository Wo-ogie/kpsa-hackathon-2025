
import { useMatches } from 'react-router-dom';
import Header from '../Header'
import BaseLayout from './BaseLayout'
import BottomNavigation from './BottomNavigation'

const MainLayout = () => {
  const matches = useMatches();
  const title = (matches[1]?.handle as { title?: string })?.title || ''

  return (
    <BaseLayout
      header={<Header title={title} />}
      mainClassName="min-h-[calc(100dvh-70px)] px-5 "
    >
      <BottomNavigation />
    </BaseLayout>
  )
}

export default MainLayout