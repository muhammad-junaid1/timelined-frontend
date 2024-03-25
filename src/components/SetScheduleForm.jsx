import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";

const SetScheduleForm = () => {
  const [values, setValues] = useState({
    department: "",
    name: "",
    section: "",
  });
  const { DATA } = useStateContext();

  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("values", JSON.stringify(values));
    document.location.reload();

  };

  useEffect(() => {
    if(localStorage.getItem("values")) {
        setValues(JSON.parse(localStorage.getItem("values")));
    }
  }, []);

  useEffect(() => {
    if (DATA) {
      setDepartments(DATA?.classes?.map((item) => item?.label));
    }
  }, [DATA]);

  useEffect(() => {
    if (values["department"]) {
      setSections(
        Object.keys(
          DATA?.classes?.find((item) => item?.label === values["department"])
            ?.classes
        )
      );
    }
  }, [values["department"]]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={values["name"]?.trim()}
        required
        id="outlined-basic"
        label="Your Name"
        onInput={(e) => setValues({...values, name: e.target.value})}
        variant="outlined"
      />
      <div className="h-[15px]"></div>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values["department"]}
          required
          label="Batch/Department"
          onChange={(e) => setValues({ ...values, department: e.target.value })}
        >
          {departments?.map((department) => {
            return (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className="h-[15px]"></div>

      <FormControl fullWidth className="mb-2">
        <InputLabel id="demo-simple-select-label2">Section</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          disabled={!values["department"]}
          required
          value={values["section"]}
          label="Section"
          onChange={(e) => setValues({ ...values, section: e.target.value })}
        >
          {sections?.map((section) => {
            return (
              <MenuItem key={section} value={section}>
                {section}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div className="h-[20px]"></div>
      <div className="flex items-center justify-center">
        <Button type="submit" className="">
          Let's goo!
        </Button>
      </div>
    </form>
  );
};

export default SetScheduleForm;
