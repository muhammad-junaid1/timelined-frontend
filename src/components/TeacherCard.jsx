import User from "../assets/user.png"; 

const TeacherCard = ({ teacher, selectedTeacher, setSelectedTeacher }) => {
  const isActive = teacher?.Emp_ID === selectedTeacher?.Emp_ID;
  const handleClick = () => {
    setSelectedTeacher(isActive ? {} : teacher);
  };
  return (
    <div
      onClick={handleClick}
      className={`card md:w-auto w-screen rounded p-2 ${
        isActive ? "bg-primary text-white" : "hover:bg-gray-200"
      } cursor-pointer shadow`}
    >
      <div className="flex items-center">
        <div className="w-[60px] mr-1.5 h-[60px] image-wrapper">
          <img src={User} />
        </div>
        <div>
          <p className="mb-0">{teacher.Name}</p>
          <small>{teacher.Email}</small>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
