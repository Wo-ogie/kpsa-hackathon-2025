import KakaoLoginButton from '../components/auth/KakaoLogin'

const Home = () => {
  return (
    <div className="bg-peach-lighter min-h-screen flex flex-col mobile-container safe-area-top safe-area-bottom px-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-[132px] h-[132px] mb-3">
            <img src="/images/logo.svg" alt="logo" className="w-full h-full" />
          </div>
          <h1><img src="/images/text_logo.png" alt="logo" /></h1>
        </div>
      </div>

      <div className="w-full max-w-sm mb-8 flex gap-3 flex-col items-center">
        <KakaoLoginButton text="카카오로 로그인" />
        <KakaoLoginButton text="카카오로 회원가입" />
      </div>
    </div>
  )
}

export default Home 