const About = (): JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          프로젝트 소개
        </h1>
        <p className="text-xl text-muted-foreground">
          KPSA Hackathon 2025를 위한 프론트엔드 프로젝트
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            프로젝트 목표
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            이 프로젝트는 현대적인 웹 개발 기술을 활용하여 사용자 친화적이고
            확장 가능한 프론트엔드 애플리케이션을 구축하는 것을 목표로 합니다.
            React, Vite, Tailwind CSS, shadcn/ui를 조합하여 빠르고 효율적인
            개발 환경을 제공합니다.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            주요 기능
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>반응형 디자인과 모던한 UI/UX</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>라우팅 기반 페이지 구조</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>재사용 가능한 컴포넌트 시스템</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>빠른 개발 및 빌드 환경</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>접근성과 성능 최적화</span>
            </li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            개발 팀
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            KPSA Hackathon 2025 참가팀이 이 프로젝트를 개발하고 있습니다.
            다양한 배경과 전문성을 가진 팀원들이 협력하여 혁신적인 솔루션을
            만들어가고 있습니다.
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            기술적 특징
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                프론트엔드
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React 18 (Hooks, Context)</li>
                <li>• React Router v7</li>
                <li>• Tailwind CSS</li>
                <li>• shadcn/ui 컴포넌트</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                개발 도구
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Vite (빠른 빌드)</li>
                <li>• ESLint (코드 품질)</li>
                <li>• PostCSS (CSS 처리)</li>
                <li>• Hot Module Replacement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 