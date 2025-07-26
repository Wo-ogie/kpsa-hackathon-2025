import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <button onClick={() => navigate(-1)}>
        <img src="/icons/arrow_left.png" alt="back" className="w-6 h-6" />
      </button>
    </div>
  )
}

export default BackButton