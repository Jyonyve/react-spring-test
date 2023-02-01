import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { styled } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import { BoardKind } from "../aggregate/BoardKind";

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   "&:focus": {
//     backgroundColor: theme.palette.primary.main,
//     "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//       color: theme.palette.common.white,
//     },
//   },
// }));

function BoardListViewAndNavlink(props) {
  // eslint-disable-next-line
  const {clubId, boards} = props;
  // eslint-disable-next-line
  const {NOTICEBOARD, SOCIALBOARD, QNABOARD, FAQBOARD} = BoardKind;
  
  
  
  // CSS Funtion
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <nav className="navBoard">
      <Button
        color="inherit"
        variant="contained"
        aria-haspopup="true"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
      >
        Board List
      </Button>

      <Menu
        elevation={0}
        id="simple-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        // getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ border: "1px solid #d3d4d5" }}
      >
        <NavLink to={`/board/${clubId}/${NOTICEBOARD}`}>
          <ListItemText secondary="Notice Board"/>
        </NavLink>
        <NavLink to={`/board/${clubId}/${SOCIALBOARD}`}>
          <ListItemText secondary="Social Board" />
        </NavLink>
        <NavLink to={`/board/${clubId}/${QNABOARD}`}>
          <ListItemText secondary="QnA Board"/>
        </NavLink>
      </Menu>
    </nav>
  </div>
  );
}

export default BoardListViewAndNavlink;
