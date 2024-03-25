import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import SetScheduleForm from "./SetScheduleForm";

const SchedulePopup = ({ modal, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={modal}>
      <div className="px-6 only:md:px-16 pt-16 pb-16">
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
        <DialogTitle className="text-center">Set your schedule for the classes!</DialogTitle>

        <div className="mt-3">
            <SetScheduleForm/>
        </div>
      </div>
    </Dialog>
  );
};

export default SchedulePopup;
