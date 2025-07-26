// 카카오톡 로그인 설정 (환경변수에서 가져오기)
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY || 'YOUR_KAKAO_APP_KEY'
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI || 'YOUR_REDIRECT_URI'

// 카카오톡 사용자 정보 타입
interface KakaoUser {
  id: string
  nickname: string
  email: string
}

// 카카오톡 로그인 응답 타입
interface KakaoLoginResponse {
  success: boolean
  user: KakaoUser
}

// 카카오톡 로그인 URL 생성
export const getKakaoLoginUrl = (): string => {
  const params = new URLSearchParams({
    client_id: KAKAO_APP_KEY,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    state: 'kakao_login' // CSRF 방지용 상태값
  })

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`
}

// 카카오톡 로그인 처리
export const handleKakaoLogin = (): void => {
  const loginUrl = getKakaoLoginUrl()

  // 웹뷰에서 카카오톡 앱으로 이동
  if (window.location.href.includes('kakao')) {
    // 이미 카카오톡 앱에서 실행 중인 경우
    window.location.href = loginUrl
  } else {
    // 일반 웹뷰에서 카카오톡 앱으로 이동
    window.open(loginUrl, '_blank')
  }
}

// 카카오톡 로그인 콜백 처리
export const handleKakaoCallback = (code: string, state: string): Promise<KakaoLoginResponse> => {
  return new Promise((resolve) => {
    // 실제 구현시에는 서버에 인증 코드를 전송하여 액세스 토큰을 받아옴
    console.log('카카오톡 로그인 콜백:', { code, state })

    // 임시로 성공 처리
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          id: 'kakao_user_id',
          nickname: '카카오 사용자',
          email: 'user@kakao.com'
        }
      })
    }, 1000)
  })
}

// 카카오톡 앱 설치 여부 확인
export const checkKakaoAppInstalled = (): boolean => {
  // 실제 구현시에는 카카오 SDK의 isKakaoTalkWeb() 메서드 사용
  return true // 임시로 true 반환
}

// 카카오톡 앱으로 이동
export const openKakaoApp = (): void => {
  const kakaoAppUrl = 'kakaotalk://'
  window.location.href = kakaoAppUrl
}

// 환경변수 확인 (개발용)
export const checkEnvironmentVariables = (): void => {
  console.log('카카오톡 환경변수 확인:')
  console.log('KAKAO_APP_KEY:', KAKAO_APP_KEY)
  console.log('REDIRECT_URI:', REDIRECT_URI)
  console.log('NODE_ENV:', import.meta.env.MODE)
} 