# Frontend - React + Vite + Tailwind CSS + shadcn/ui

이 프로젝트는 React, Vite, Tailwind CSS, shadcn/ui를 사용하여 구성된 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 18** - 사용자 인터페이스 라이브러리
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 라이브러리

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
│   └── ui/           # shadcn/ui 컴포넌트들
│       └── button.jsx
├── lib/
│   └── utils.js      # 유틸리티 함수들
├── App.jsx           # 메인 앱 컴포넌트
├── main.jsx          # 앱 진입점
└── index.css         # 글로벌 스타일
```

## shadcn/ui 컴포넌트 추가하기

새로운 shadcn/ui 컴포넌트를 추가하려면:

1. [shadcn/ui 공식 사이트](https://ui.shadcn.com/)에서 원하는 컴포넌트를 찾습니다.
2. 컴포넌트 코드를 `src/components/ui/` 디렉토리에 추가합니다.
3. 필요한 의존성을 설치합니다.

## Tailwind CSS 사용하기

Tailwind CSS 클래스를 사용하여 스타일링할 수 있습니다. shadcn/ui의 디자인 시스템과 함께 사용하면 일관된 UI를 만들 수 있습니다.

## 라이센스

MIT
