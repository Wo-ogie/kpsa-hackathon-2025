import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { handleKakaoLogin, checkKakaoAppInstalled } from '../lib/kakao'

const Login = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleKakaoLoginClick = (): void => {
    setIsLoading(true)

    try {
      // 카카오톡 앱 설치 여부 확인
      if (!checkKakaoAppInstalled()) {
        alert('카카오톡 앱이 설치되어 있지 않습니다.')
        setIsLoading(false)
        return
      }

      // 카카오톡 로그인 처리
      handleKakaoLogin()

      // 로그인 성공 시뮬레이션 (실제로는 콜백으로 처리)
      setTimeout(() => {
        setIsLoading(false)
        navigate('/') // 로그인 성공 후 홈으로 이동
      }, 3000)

    } catch (error) {
      console.error('카카오톡 로그인 실패:', error)
      setIsLoading(false)
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col mobile-container safe-area-top safe-area-bottom">
      {/* 헤더 영역 */}
      <div className="text-center pt-16 pb-8 px-4">
        <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-2xl text-white font-bold">K</span>
        </div>
        <h1 className="mobile-heading text-gray-900 mb-3">
          KPSA Hackathon 2025
        </h1>
        <p className="mobile-text text-gray-600">
          카카오톡으로 간편하게 로그인하세요
        </p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-4 pb-8">
        {/* 로그인 카드 */}
        <div className="mobile-card mb-6">
          <div className="text-center mb-6">
            <h2 className="mobile-subheading text-gray-900 mb-2">
              로그인
            </h2>
            <p className="mobile-caption text-gray-600">
              카카오톡 계정으로 간편하게 로그인할 수 있습니다
            </p>
          </div>

          {/* 카카오톡 로그인 버튼 */}
          <Button
            onClick={handleKakaoLoginClick}
            disabled={isLoading}
            className="w-full h-14 text-base font-semibold rounded-xl shadow-lg bg-yellow-400 hover:bg-yellow-500 text-black border-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                로그인 중...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-lg mr-2">💬</span>
                카카오톡으로 로그인
              </div>
            )}
          </Button>
        </div>

        {/* 안내 정보 */}
        <div className="mobile-card">
          <h3 className="mobile-subheading text-gray-900 mb-3">
            로그인 안내
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span className="mobile-caption text-gray-600">카카오톡 앱이 설치되어 있어야 합니다</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span className="mobile-caption text-gray-600">카카오톡 계정 정보를 사용합니다</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span className="mobile-caption text-gray-600">개인정보는 안전하게 보호됩니다</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-4 pb-6 safe-area-bottom">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="w-full h-12 text-base font-semibold rounded-xl"
        >
          뒤로 가기
        </Button>

        <div className="text-center mt-3">
          <p className="mobile-caption">
            로그인 문제가 있으신가요? <span className="text-yellow-600 underline">고객센터</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 