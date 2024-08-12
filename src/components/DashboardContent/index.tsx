import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Switch,
  Stack,
} from "@mui/material";
import axios from "axios";
import { BANNER_DETAILS, UPDATE_BANNER } from "dashboard/constants/url";

const DashboardContent = () => {
  const [bannerInfo, setBannerInfo] = useState({
    visible: 0,
    timer: "",
    description: "",
    link: "",
  });

  const DefaultuserId = "f24e328d-e096-4248-8a12-c78217227839";  

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState({ title: "", index: 0 });
  const [description, setDescription] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [numberValue, setNumberValue] = useState(0);

  const handleClickOpen = (title: string, index: number) => {
    setModalTitle({ title, index });
    setOpen(true);
  };

  const decideVisibility = (value: number) => {
    if (value == 0) {
      return false;
    } else {
      return true;
    }
  };

  const bannerInfoFetch = async () => {
    try {
      const getBannerInfo = await axios.get(BANNER_DETAILS);
      if (getBannerInfo) {
        const data = getBannerInfo.data;
        console.log(data[0].description);
        setBannerInfo({
          description: data[0].description,
          link: data[0].redirect_link,
          timer: data[0].timer,
          visible: data[0].visibility,
        });
      }
    } catch (er) {
      console.error(er);
    }
  };

  useEffect(() => {
    bannerInfoFetch();
  }, []);

  const gettingDetailsFromIndex = (index: number) => {
    switch (index) {
      case 0:
        return decideVisibility(bannerInfo.visible) ? "Visible" : "Hidden";
      case 1:
        return bannerInfo.timer;
      case 2:
        return bannerInfo.description;
      case 3:
        return bannerInfo.link;
      default:
        return bannerInfo.visible;
    }
  };

  const handleEditModal = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const updatingBannerDetails = async () => {
    try {
      const bannerUpdation = await axios.post(
        UPDATE_BANNER,

        {
          userId: DefaultuserId,
          description: description,
          timer: numberValue,
          visible: switchChecked,
          link: redirectLink,
        }
      );
      if (bannerUpdation) {
        console.log(bannerUpdation.data);
        bannerInfoFetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    updatingBannerDetails();
    handleEditClose();
  };

  return (
    <Box
      sx={{ marginX: "auto" }}
      width={"80%"}
      paddingX={"0.75rem"}
      paddingY={"0.5rem"}
      border={"1px solid #27272A"}
      borderRadius={"8px"}
      textAlign={"center"}
    >
      <Typography
        fontSize={"16px"}
        sx={{ fontFamily: "Inter, Sans-serif" }}
        paddingBottom={"10px"}
      >
        This section is allowed to edit the contents of the banner in the home
        page
      </Typography>
      <Divider sx={{ borderColor: "#27272A" }} />
      <div className="content-wrapper">
        {[
          "Banner Visibility Control",
          "Banner Timer Control",
          "Description",
          "Redirect Link",
        ].map((title, index) => (
          <div className="card" key={title}>
            <Typography fontFamily={"Inter, Sans-serif"} fontSize={"25px"}>
              {title}
            </Typography>
            <div>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "0.5rem",
                  color: "white",
                  backgroundColor: "#EF5638",
                  textTransform: "none",
                  border: "white",
                }}
                onClick={() => handleClickOpen(title, index)}
              >
                <Typography fontFamily={"Inter, Sans-serif"} fontSize={"14px"}>
                  Show
                </Typography>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalTitle.title}</DialogTitle>
        <DialogContent>
          {/* Add your modal content here */}
          <Typography>{gettingDetailsFromIndex(modalTitle.index)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        sx={{
          marginTop: "2rem",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          color: "white",
          backgroundColor: "#EF5638",
          textTransform: "none",
        }}
        onClick={() => handleEditModal()}
      >
        <Typography fontFamily={"Inter, Sans-serif"} fontSize={"14px"}>
          Edit Banner Info
        </Typography>
      </Button>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <form>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Redirect-link"
            variant="filled"
            value={redirectLink}
            onChange={(e) => setRedirectLink(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Timer (in Minutes)"
            variant="filled"
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <Stack direction={"row"} alignItems={"center"} marginTop={"1rem"}>
            <Typography>Visibility</Typography>
            <Switch
              defaultChecked
              checked={switchChecked}
              onChange={(e) => setSwitchChecked(e.target.checked)}
              color="warning"
            />
          </Stack>
        </form>
        <Stack direction={"row"} alignItems={"center"} paddingLeft={"1rem"}>
          <DialogActions>
            <Button onClick={handleEditClose}>Close</Button>
          </DialogActions>
          <DialogActions>
            <Button
              onClick={handleSubmit}
              disabled={
                description.length < 10 ||
                redirectLink.length < 5 ||
                numberValue < 1
              }
            >
              Submit
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default DashboardContent;
