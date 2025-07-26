const Footer = (): JSX.Element => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2025 KPSA Hackathon. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              이용약관
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 