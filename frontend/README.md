# Frontend - React + TypeScript + Vite + Tailwind CSS + shadcn/ui

이 프로젝트는 플러터 앱의 웹뷰 컨테이너에서 실행되는 모바일 최적화 웹 애플리케이션입니다.

## 기술 스택

- **React 18** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성과 개발 생산성
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 라이브러리
- **React Router v7** - 클라이언트 사이드 라우팅

## 모바일 웹뷰 최적화

- **터치 최적화**: 터치 이벤트와 제스처 지원
- **성능 최적화**: 빠른 로딩과 부드러운 애니메이션
- **반응형 디자인**: 모든 모바일 기기에서 완벽한 표시
- **플러터 통신**: InAppWebView와의 양방향 통신 지원
- **412px 기준**: 모바일 기기 최적화

## 시작하기

### 환경변수 설정

1. `env.example` 파일을 `.env`로 복사합니다:
```bash
cp env.example .env
```

2. `.env` 파일에서 실제 값으로 변경합니다:
```env
# 카카오톡 로그인 설정
VITE_KAKAO_APP_KEY=your_actual_kakao_app_key
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/auth/kakao/callback

# 개발 환경 설정
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
```

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
│   │   └── button.tsx
│   ├── common/          # 공통 컴포넌트들
│   │   └── Card.tsx
│   └── Layout.tsx       # 메인 레이아웃
├── views/               # 페이지 컴포넌트들
│   ├── Home.tsx         # 모바일 랜딩 페이지
│   ├── Login.tsx        # 카카오톡 로그인 페이지
│   ├── About.tsx        # 소개 페이지
│   └── NotFound.tsx     # 404 페이지
├── routers/             # 라우팅 설정
│   └── index.tsx        # 메인 라우터
├── lib/                 # 유틸리티 함수들
│   ├── utils.ts
│   └── kakao.ts         # 카카오톡 로그인 유틸리티
├── types/               # TypeScript 타입 정의
│   ├── global.d.ts      # 전역 타입 정의
│   └── env.d.ts         # 환경변수 타입 정의
├── App.tsx              # 메인 앱 컴포넌트
├── main.tsx             # 앱 진입점
└── index.css            # 글로벌 스타일 (Tailwind 설정 포함)
```

## 라우팅 구조

- `/` - 모바일 랜딩 페이지
- `/login` - 카카오톡 로그인 페이지
- `/about` - 소개 페이지
- `/*` - 404 페이지

## 카카오톡 로그인 설정

### 1. 카카오 개발자 콘솔 설정

1. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 앱 생성
2. 플랫폼 설정에서 웹 플랫폼 추가
3. 카카오 로그인 활성화
4. 리다이렉트 URI 설정: `http://localhost:5173/auth/kakao/callback`

### 2. 환경변수 설정

```env
VITE_KAKAO_APP_KEY=your_kakao_app_key
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/auth/kakao/callback
```

### 3. 웹뷰에서 카카오톡 로그인 동작

1. 로그인 버튼 클릭
2. 카카오톡 OAuth URL로 이동
3. 카카오톡 앱에서 인증
4. 콜백으로 인증 코드 수신
5. 서버에 인증 코드 전송하여 토큰 발급

## Tailwind CSS 설정

이 프로젝트는 최신 Tailwind CSS 방식을 사용합니다:

### CSS 기반 설정
- `src/index.css`에서 모든 Tailwind 설정 관리
- `@layer` 디렉티브를 사용한 구조화된 스타일
- 412px 기준 모바일 최적화 컴포넌트 클래스

### 커스텀 컴포넌트 클래스
```css
.mobile-container {
  @apply max-w-sm mx-auto;
  width: 100%;
  max-width: 412px;
}

.mobile-card {
  @apply bg-white rounded-xl p-4 shadow-sm border border-gray-100;
}

.mobile-button {
  @apply w-full h-12 text-base font-semibold rounded-xl shadow-lg;
  min-height: 48px;
}
```

## 컴포넌트 사용법

### 기본 컴포넌트

```tsx
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './components/common/Card'

function MyComponent(): JSX.Element {
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

```tsx
import { Link, useNavigate } from 'react-router-dom'

// 링크 사용
<Link to="/about">소개 페이지</Link>

// 프로그래매틱 네비게이션
const navigate = useNavigate()
navigate('/about')
```

## 모바일 최적화 가이드라인

### 터치 최적화

- 최소 48px 터치 타겟 크기
- 터치 피드백 제공
- 스크롤 성능 최적화

### 성능 최적화

- 이미지 지연 로딩
- 코드 스플리팅
- 번들 크기 최적화

### 접근성

- ARIA 속성 사용
- 키보드 네비게이션 지원
- 색상 대비 준수

## 개발 가이드라인

### TypeScript 사용

1. **타입 정의**: 모든 props와 함수에 타입 정의
2. **인터페이스**: 복잡한 객체는 인터페이스로 정의
3. **제네릭**: 재사용 가능한 컴포넌트에 제네릭 사용

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
- `types/`: TypeScript 타입 정의

## 라이센스

MIT
