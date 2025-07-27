type FamilyRequestCallback = (phoneNumber: string) => void;

class FamilyRequestManager {
  private static instance: FamilyRequestManager;
  private callback: FamilyRequestCallback | null = null;

  private constructor() { }

  static getInstance(): FamilyRequestManager {
    if (!FamilyRequestManager.instance) {
      FamilyRequestManager.instance = new FamilyRequestManager();
    }
    return FamilyRequestManager.instance;
  }

  // 가족 등록 요청 모달을 표시할 콜백 함수를 등록
  setCallback(callback: FamilyRequestCallback) {
    this.callback = callback;
  }

  // 가족 등록 요청 모달 표시
  showFamilyRequestModal(phoneNumber: string) {
    if (this.callback) {
      this.callback(phoneNumber);
    } else {
      console.warn('FamilyRequestManager: 콜백이 등록되지 않았습니다.');
    }
  }

  // 콜백 제거
  clearCallback() {
    this.callback = null;
  }
}

export default FamilyRequestManager; 