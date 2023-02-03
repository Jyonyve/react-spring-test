import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { BoardKind } from "../aggregate/BoardKind";
import { observer } from "mobx-react";


const BoardListViewAndNavlink = (observer((props)=> {
  const {clubId, clubName} = props;
 
  
  // CSS Funtion
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
      <nav className="navBoard">
        <Box>
      <Button
        variant="text"
        aria-haspopup="true"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
      >
        Board List
      </Button>

      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {localStorage.setItem('clubName', clubName)}

        <NavLink to={`/board/${clubId}/${BoardKind[0]}`}>
          <MenuItem onClick={handleClose}>Notice Board</MenuItem>
        </NavLink>
        <NavLink to={`/board/${clubId}/${BoardKind[1]}`}>
          <MenuItem onClick={handleClose}>Social Board</MenuItem>
        </NavLink>
        <NavLink to={`/board/${clubId}/${BoardKind[2]}`}>
         <MenuItem onClick={handleClose}>QnA Board</MenuItem>
        </NavLink>
        
      </Menu>
    </Box>
    </nav>
  );
}))

export default BoardListViewAndNavlink;
