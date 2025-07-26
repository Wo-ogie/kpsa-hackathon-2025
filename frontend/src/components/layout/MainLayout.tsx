
import BaseLayout from './BaseLayout'
import BottomNavigation from './BottomNavigation'

const MainLayout = () => {
  return (
    <BaseLayout mainClassName="min-h-[100dvh] px-5 pt-10">
      <BottomNavigation />
    </BaseLayout>
  )
}

export default MainLayout