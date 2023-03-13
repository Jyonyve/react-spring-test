import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BoardKind } from "../aggregate/BoardKind";
import { observer } from "mobx-react";
import { useStore } from "../store/RootStore";


const TestBoardListView = (observer((props)=> {
  // 
  const { clubName} = props;
  const testService = useStore().boardStore.testService;
 
  // CSS Funtion
  const [anchorEl, setAnchorEl] = React.useState(null);

  async function addSampleBoard(boardKind){
    await testService.addSampleBoard(boardKind)
  }

  useEffect(() => {
    for (let index = 0; index < 3; index++) {
      addSampleBoard(BoardKind[index]);
    }
  }, []);  

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
        Test Board List
      </Button>

      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {localStorage.setItem('clubName', clubName)}

        <NavLink to={`/test/${BoardKind[0]}`}>
          <MenuItem onClick={handleClose}>Notice Board</MenuItem>
        </NavLink>
        <NavLink to={`/test/${BoardKind[1]}`}>
          <MenuItem onClick={handleClose}>Social Board</MenuItem>
        </NavLink>
        <NavLink to={`/test/${BoardKind[2]}`}>
         <MenuItem onClick={handleClose}>QnA Board</MenuItem>
        </NavLink>
        <NavLink to={`/test/${BoardKind[3]}`}>
         <MenuItem onClick={handleClose}>FaQ Board</MenuItem>
        </NavLink>
        
      </Menu>
    </Box>
    </nav>
  );
}))

export default TestBoardListView;
