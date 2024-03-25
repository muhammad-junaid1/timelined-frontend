// import { MdAccountCircle } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import SchedulePopup from "../SchedulePopup";
import { useState } from "react";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  return (
    <>
      <div className="shadow pr-4 sticky top-0 z-[1000] bg-white flex justify-between border-b-gray-200 border-b-2 p-2.5">
        <a href="/">
          <img width={90} src={Logo} alt="Timelined - Logo" />
        </a>
        <div
          onClick={() => setIsPopupOpened(true)}
          className="flex cursor-pointer items-center"
        >
          <p className="mr-1">
            {JSON.parse(localStorage.getItem("values"))?.name}
          </p>
          <RiSettings4Fill style={{ color: "grey" }} size={20} />
        </div>
      </div>

      {isPopupOpened && (
        <SchedulePopup
          modal={isPopupOpened}
          handleClose={() => setIsPopupOpened(false)}
        />
      )}
    </>
  );
};

export default Navbar;
