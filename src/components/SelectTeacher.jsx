import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import TeacherCard from "./TeacherCard";
import { useStateContext } from "../context/ContextProvider";

const SelectTeacher = ({ modal, handleClose }) => {
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const { teachers, fetchEpg } = useStateContext();
  const [searchValue, setSearchValue] = useState("");
  const [teachersList, setTeachersList] = useState(teachers); 

  const handleSaveTeacher = () => {
    localStorage.setItem(modal?.label, JSON.stringify(selectedTeacher));
    fetchEpg();
    handleClose();
  };

  useEffect(() => {
    const searchedTeachers = teachers?.filter(teacher=> teacher?.Name?.toLowerCase()?.includes(searchValue?.toLowerCase())); 
    setTeachersList(searchedTeachers); 
  }, [searchValue]); 

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "70vw",
          width: "70vw",
          position: "relative",
        },
      }}
      className="select-teacher-dialog"
      onClose={handleClose}
      open={modal?.isOpened}
    >
      <div className="md:px-16 px-4 pt-16 pb-16">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MdClose />
        </IconButton>
        <DialogTitle className="text-center select-teacher-label">
          Select teacher for <strong>{modal?.label}</strong>!
        </DialogTitle>

        <div className="flex justify-center md:mt-0 mt-3">
          <TextField
            onInput={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="md:w-[60%] w-full"
            type="text"
            size="small"
            placeholder="Search.."
          />
        </div>

          {teachersList?.length ?
        <div className="grid md:grid-cols-3 place-content-start mt-7 gap-3 h-[400px] overflow-y-scroll">
          {teachersList.map((teacher) => (
            <TeacherCard
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
              key={teacher.EMP_ID}
              teacher={teacher}
            />
          ))}
        </div>
            : <div className="h-[400px]">
              <p className="mt-5 text-center text-red-500">No teacher found!</p>
            </div>
          }
      </div>

      {selectedTeacher?.Emp_ID && (
        <div className="absolute bottom-0 left-0 right-0">
          <Button
            onClick={handleSaveTeacher}
            style={{
              fontFamily: "inherit",
              borderRadius: 0,
            }}
            className="bg-primary"
            fullWidth
            type="button"
            variant="contained"
          >
            Save
          </Button>
        </div>
      )}
    </Dialog>
  );
};

export default SelectTeacher;
