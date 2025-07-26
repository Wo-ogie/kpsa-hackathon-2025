// 플러터 InAppWebView 타입 정의
interface FlutterInAppWebView {
  callHandler: (handlerName: string, ...args: unknown[]) => Promise<unknown>
}

// Window 객체에 flutter_inappwebview 속성 추가
declare global {
  interface Window {
    flutter_inappwebview?: FlutterInAppWebView
  }
}

export { } 