import KakaoLoginButton from '../components/auth/KakaoLogin'

const Home = () => {
  return (
    <div className="h-[100dvh] bg-peach-lighter flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-[132px] h-[132px] mb-6 ">
          <img src="/images/logo.svg" alt="logo" className="w-full h-full" />
        </div>
        <h1>
          <img src="/images/text_logo.png" alt="logo" />
        </h1>
      </div>
      <div className="flex flex-col items-center px-4 pb-4 ">
        <KakaoLoginButton text="카카오로 회원가입" />
      </div>
    </div>
  )
}
export default Home