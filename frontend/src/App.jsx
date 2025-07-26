import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-md border">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Vite + React + Tailwind CSS + shadcn/ui
        </h1>
        <p className="text-muted-foreground mb-6">
          모든 설정이 완료되었습니다! 🎉
        </p>
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
  )
}

export default App 