# Frontend - React + Vite + Tailwind CSS + shadcn/ui

이 프로젝트는 React, Vite, Tailwind CSS, shadcn/ui를 사용하여 구성된 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 18** - 사용자 인터페이스 라이브러리
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 라이브러리
- **React Router v7** - 클라이언트 사이드 라우팅

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 실행되면 `http://localhost:5173`에서 애플리케이션을 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트들
│   │   └── button.jsx
│   ├── common/          # 공통 컴포넌트들
│   │   └── Card.jsx
│   ├── Layout.jsx       # 메인 레이아웃
│   ├── Header.jsx       # 헤더 컴포넌트
│   └── Footer.jsx       # 푸터 컴포넌트
├── views/               # 페이지 컴포넌트들
│   ├── Home.jsx         # 홈 페이지
│   ├── About.jsx        # 소개 페이지
│   └── NotFound.jsx     # 404 페이지
├── routers/             # 라우팅 설정
│   └── index.jsx        # 메인 라우터
├── lib/                 # 유틸리티 함수들
│   └── utils.js
├── App.jsx              # 메인 앱 컴포넌트
├── main.jsx             # 앱 진입점
└── index.css            # 글로벌 스타일
```

## 라우팅 구조

- `/` - 홈 페이지
- `/about` - 소개 페이지
- `/*` - 404 페이지

## 컴포넌트 사용법

### 기본 컴포넌트

```jsx
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './components/common/Card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>클릭</Button>
      </CardContent>
    </Card>
  )
}
```

### 라우팅

```jsx
import { Link, useNavigate } from 'react-router-dom'

// 링크 사용
<Link to="/about">소개 페이지</Link>

// 프로그래매틱 네비게이션
const navigate = useNavigate()
navigate('/about')
```

## shadcn/ui 컴포넌트 추가하기

새로운 shadcn/ui 컴포넌트를 추가하려면:

1. [shadcn/ui 공식 사이트](https://ui.shadcn.com/)에서 원하는 컴포넌트를 찾습니다.
2. 컴포넌트 코드를 `src/components/ui/` 디렉토리에 추가합니다.
3. 필요한 의존성을 설치합니다.

## Tailwind CSS 사용하기

Tailwind CSS 클래스를 사용하여 스타일링할 수 있습니다. shadcn/ui의 디자인 시스템과 함께 사용하면 일관된 UI를 만들 수 있습니다.

## 개발 가이드라인

### 컴포넌트 작성 규칙

1. **재사용성**: 가능한 한 재사용 가능한 컴포넌트로 작성
2. **Props**: 명확한 props 인터페이스 정의
3. **스타일링**: Tailwind CSS 클래스 사용
4. **접근성**: 적절한 ARIA 속성과 시맨틱 HTML 사용

### 폴더 구조 규칙

- `components/`: 재사용 가능한 컴포넌트
- `views/`: 페이지 레벨 컴포넌트
- `routers/`: 라우팅 관련 설정
- `lib/`: 유틸리티 함수와 헬퍼

## 라이센스

MIT
