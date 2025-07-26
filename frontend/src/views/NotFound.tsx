import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'

const NotFound = (): JSX.Element => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className="space-x-4">
          <Button asChild>
            <Link to="/">
              홈으로 돌아가기
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/about">
              소개 페이지
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound 