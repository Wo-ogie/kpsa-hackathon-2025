import { useState } from 'react'
import { Button } from '../components/ui/button'

const Home = (): JSX.Element => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          KPSA Hackathon 2025에 오신 것을 환영합니다! 🚀
        </h1>
        <p className="text-xl text-muted-foreground">
          React + Vite + Tailwind CSS + shadcn/ui로 구축된 현대적인 웹 애플리케이션
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            기술 스택
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• React 18 - 사용자 인터페이스</li>
            <li>• Vite - 빠른 빌드 도구</li>
            <li>• Tailwind CSS - 스타일링</li>
            <li>• shadcn/ui - UI 컴포넌트</li>
            <li>• React Router - 라우팅</li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            프로젝트 구조
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• /src/components - 재사용 컴포넌트</li>
            <li>• /src/views - 페이지 컴포넌트</li>
            <li>• /src/routers - 라우팅 설정</li>
            <li>• /src/lib - 유틸리티 함수</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <div className="bg-card p-8 rounded-lg border inline-block">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            인터랙티브 데모
          </h3>
          <div className="space-x-4">
            <Button onClick={() => setCount((count) => count + 1)}>
              카운트: {count}
            </Button>
            <Button variant="outline" onClick={() => setCount(0)}>
              리셋
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 