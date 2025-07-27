import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { familyAPI } from '../lib/api';
import { FamilyMember } from '../types/index';
import FamilyNameModal from '../components/common/modals/FamilyNameModal';

const Family = () => {
  const navigate = useNavigate();
  const [showNameModal, setShowNameModal] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([

  ]);

  useEffect(() => {
    familyAPI.getFamily().then((res: { family_members: FamilyMember[] }) => {
      setFamilyMembers(res.family_members);
    });
  }, []);

  const handleAddFamily = () => {
    navigate('/family-phone-input');
  };

  const handleEditName = (member: FamilyMember) => {
    setEditingMember(member);
    setShowNameModal(true);
  };

  const handleSaveName = (newName: string) => {
    if (editingMember) {
      setFamilyMembers(prev =>
        prev.map(member =>
          member.id === editingMember.id
            ? { ...member, nickname: newName }
            : member
        )
      );
      setEditingMember(null);
    }
  };

  const handleCloseModal = () => {
    setShowNameModal(false);
    setEditingMember(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {localStorage.getItem('is_guardian') !== 'true' && (
        <div className="p-4">
          <button className="bg-orange-primary text-white p-5 rounded-full shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-3" onClick={() => navigate('/main')}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-lg font-medium">홈</span>
          </button>
        </div>
      )}

      <div className="p-4 space-y-4">
        {familyMembers.length === 0 && (
          <div className="flex items-center justify-center p-4 text-xl min-h-[400px]">
            <div className="text-center">
              <span className="text-gray-500 text-lg">등록된 가족이 없습니다.<br /> 가족을 추가해주세요.</span>
            </div>
          </div>
        )}
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4" >
            {/* 상단 - 가족 이름 태그 */}
            <div className="flex items-center justify-between mb-4" >
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-lg font-bold" onClick={() => handleEditName(member)}>
                {member.nickname}
              </span>
            </div>

            {member.isLocked ? (
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {/* 약 추가 카드 */}
                <div
                  className="bg-gray-100 rounded-lg p-3 text-center flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => navigate(`/add-medicine?family_id=${member.id}`)}
                >
                  <div className="text-gray-600 text-sm">약 추가</div>
                </div>

                {/* 앨범 카드 */}
                <div
                  className="bg-gray-100 rounded-lg p-3 text-center flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => navigate('/album', { state: { family_id: member.id, family_name: member.nickname } })}
                >
                  <div className="text-gray-600 text-sm">앨범</div>
                </div>

                {/* 복용 기록 카드 */}
                <div
                  className="bg-gray-100 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => navigate('/medication-history', { state: { family_id: member.id, family_name: member.nickname } })}
                >
                  <div className="text-gray-600 text-sm leading-tight">
                    <div>복용</div>
                    <div>기록</div>
                  </div>
                </div>

                {/* 복약 정보 카드 */}
                <div
                  className="bg-gray-100 rounded-lg p-3 text-center cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => navigate(`/medication-list/${member.id}`)}
                >
                  <div className="text-gray-600 text-sm leading-tight">
                    <div>복약</div>
                    <div>정보</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4">
        <button
          onClick={handleAddFamily}
          className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-medium hover:bg-orange-600 transition-colors"
        >
          가족 추가하기
        </button>
      </div>

      {/* 이름 수정 모달 */}
      <FamilyNameModal
        isOpen={showNameModal}
        onClose={handleCloseModal}
        onSave={handleSaveName}
        currentName={editingMember?.nickname || ''}
      />
    </div >
  );
};

export default Family; 