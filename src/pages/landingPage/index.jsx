import { Stack, Switch, Typography } from "@mui/material";
import ScreenShot from "../../assets/screenshot.png";
import Screenshot2 from "../../assets/screenshot2.png"; 
import { FaCopyright, FaGithub } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import {  useState } from "react";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const LandingPage = () => {
  const [toggleVal, setToggleVal] = useState(true);
  const handleInput = (e) => {
    setToggleVal(!e.target.checked);
  };
  return (
    <>
      <div className="flex justify-center pt-16">
        <div className="w-[80vw] flex flex-col items-center fade-down">
          <h1 className="text-6xl text-center" style={{ fontWeight: 600 }}>
            Never miss a class again!
          </h1>
          <p className="mt-3 text-center">
            Track your FAST NUCES classes in real-time with a weekly timeline.
          </p>

          <div className="flex items-center mt-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/muhammad-junaid1/timelined"
            >
              <button className="bg-black mr-1 flex items-center py-2 px-4 text-white rounded">
                <FaGithub className="mr-2" size={20} />
                View on Github
              </button>
            </a>
            <a href="/app">
              <button className="bg-primary flex items-center py-2 px-4 text-white rounded">
                Open app
              </button>
            </a>
          </div>

          <div className="flex landing-toggle items-center justify-center mt-16 mb-4">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>without Timelined</Typography>
              <AntSwitch
                onInput={handleInput}
                checked={toggleVal}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography>with Timelined</Typography>
            </Stack>
          </div>

          <div className="mb-12 fade-down-later">
            <img
              className="rounded shadow-xl"
              src={toggleVal ? ScreenShot : Screenshot2}
              alt="Screenshot"
            />
          </div>

          <p className="text-white flex items-center mb-3">
            <FaCopyright className="mr-1" /> 2024 Timelined
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
