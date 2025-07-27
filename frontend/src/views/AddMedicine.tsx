import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { googleVisionService } from '../lib/GoogleVisionService';
import { familyAPI } from '../lib/api';
import { FamilyMember } from '../types';

const AddMedicine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null);
  const { family_id } = useParams();

  const familyId = family_id || new URLSearchParams(location.search).get('family_id');

  useEffect(() => {
    if (familyId) {
      familyAPI.getFamily().then((res: { family_members: FamilyMember[] }) => {
        const member = res.family_members.find(m => m.id === Number(familyId));
        if (member) {
          setFamilyMember(member);
        }
      }).catch(error => {
        console.error('Failed to load family member info:', error);
      });
    }
  }, [familyId]);

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleDirectInput = () => {
    if (familyId) {
      navigate('/add-medicine-search', { state: { family_id: familyId, family_name: familyMember?.nickname } });
    } else {
      navigate('/add-medicine-search');
    }
  };

  const processImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setShowUploadModal(false);

    try {
      console.log('OCR 분석 시작...');
      const result = await googleVisionService.analyzePrescription(file);
      console.log('OCR 결과:', result);

      // OCR 성공 시 약 검색 화면으로 이동하거나 결과를 표시
      if (result && result.success) {
        navigate('/drug-cart?family_id=' + familyId, {
          state: {
            medications: result.data,
            family_id: familyId,
            family_name: familyMember?.nickname
          }
        });
      } else {
        setError(typeof result?.data === 'string' ? result.data : '처방전을 인식할 수 없습니다.');
      }
    } catch (error) {
      console.error('OCR 분석 실패:', error);
      setError('OCR 분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCameraUpload = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // 후면 카메라
      });

      // 비디오 요소 생성
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // 3초 후 스냅샷 찍기
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0);

        // File 객체로 변환
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'prescription.jpg', { type: 'image/jpeg' });
            await processImage(file);
          }
        }, 'image/jpeg');

        // 스트림 정리
        stream.getTracks().forEach(track => track.stop());
      }, 3000);

    } catch (error) {
      console.error('카메라 접근 실패:', error);
      setError('카메라에 접근할 수 없습니다.');
      setShowUploadModal(false);
    }
  };

  const handleGalleryUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        await processImage(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header with family member name if applicable */}
      {familyMember && (
        <div className="p-4 bg-orange-50 border-b border-orange-100">
          <p className="text-sm text-orange-700 font-medium">
            {familyMember.nickname}님의 약 추가
          </p>
        </div>
      )}

      <div className="flex-1 p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2"> 처방전을 업로드해주세요</h2>
          <p className="text-gray-600 mb-6">약을 직접 입력하시나요?</p>

          <button
            onClick={handleDirectInput}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            직접입력
          </button>
        </div>

        {/* 업로드 영역 */}
        <div className="flex-1 flex items-center justify-center">
          <div
            onClick={handleUploadClick}
            className="w-full max-w-sm border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
          >
            <div className="mb-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-900">Upload</p>
          </div>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-900">처방전을 분석하고 있습니다...</p>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">오류</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload</h3>
            <div className="space-y-3">
              <button
                onClick={handleCameraUpload}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                사진찍기
              </button>
              <button
                onClick={handleGalleryUpload}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                사진첩에서 선택
              </button>
            </div>
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full mt-4 p-3 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicine; 