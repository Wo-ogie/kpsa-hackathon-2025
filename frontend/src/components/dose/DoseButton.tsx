const DoseButton = () => {
  return (
    <button
      onClick={handleMedicationAuth}
      className="w-full bg-orange-primary text-white py-4  rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
    >
      <span className="text-xl">💧</span>
      <span className="text-">복약 인증하고 나무 물 주기</span>
    </button>
  )
}
export default DoseButton;