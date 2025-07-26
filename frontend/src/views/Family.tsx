import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

interface FamilyMember {
  id: string;
  name: string;
  treeImage: string;
  medicineCount: number;
  albumCount: number;
  isLocked: boolean;
}

const Family = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [editName, setEditName] = useState('');

  // 임시 데이터
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: '엄마',
      treeImage: '/images/games/tree.png',
      medicineCount: 12,
      albumCount: 2,
      isLocked: false
    },
    {
      id: '2',
      name: '아빠',
      treeImage: '/images/games/tree.png',
      medicineCount: 6,
      albumCount: 2,
      isLocked: false
    },
    {
      id: '3',
      name: '언니',
      treeImage: '/images/games/tree.png',
      medicineCount: 0,
      albumCount: 0,
      isLocked: true
    }
  ]);

  const handleAddFamily = () => {
    navigate('/family-phone-input');
  };

  const handleEditName = (member: FamilyMember) => {
    setEditingMember(member);
    setEditName(member.name);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingMember && editName.trim()) {
      setFamilyMembers(prev =>
        prev.map(member =>
          member.id === editingMember.id
            ? { ...member, name: editName.trim() }
            : member
        )
      );
      setShowEditModal(false);
      setEditingMember(null);
      setEditName('');
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingMember(null);
    setEditName('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">가족</h1>
        <div className="w-6"></div>
      </div>

      {/* 가족 목록 */}
      <div className="p-4 space-y-4">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {/* 나무 이미지 */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={member.treeImage}
                  alt="tree"
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* 가족 정보 */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                    {member.name}
                  </span>
                  <button
                    onClick={() => handleEditName(member)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
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
                  <>
                    <div className="text-sm text-gray-600 mb-2">
                      {member.medicineCount} 약 추가 • {member.albumCount} 앨범
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        복용 기록
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        복약 정보
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 가족 추가 버튼 */}
      <div className="fixed bottom-20 left-0 right-0 p-4">
        <button
          onClick={handleAddFamily}
          className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          가족 추가하기
        </button>
      </div>

      {/* 이름 수정 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                회원의 이름(별명)을 변경해주세요.
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="이름을 입력하세요"
            />

            <button
              onClick={handleSaveEdit}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              변경 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family; 