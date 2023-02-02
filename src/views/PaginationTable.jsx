import {
  Box,
  Paper,
  Card,
  // Icon, IconButton,
  TableContainer,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { castToSnapshot } from "mobx-state-tree";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultSnapshotBoard } from "../aggregate/Board";
import { StyledButton } from "../component/importedViewComponent/AppButton";
import SimpleCard from "../component/importedViewComponent/SimpleCard";
import { useStore } from "../store/RootStore";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTable = (props) => {

  const {onFetchBoardAndPosting, clubName, onSetPosting} = props;
  const [board, setBoard] = useState(defaultSnapshotBoard);
  const boardStore = useStore().boardStore;

  //Pagenation
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  //url Routing
  const urlparams = useParams();
  const clubId  = urlparams.clubId;
  const boardKind  = urlparams.boardKind;


  useEffect( () => {  
    onFetchBoardAndPosting(clubId, boardKind);
    setBoard(castToSnapshot(boardStore.getBoard));
    // eslint-disable-next-line
  },[boardKind])
 


  return (
    <Box width="100%" overflow="auto">

    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead component={Card} >
          <TableRow>
            <TableCell align="left">{board.boardKind}</TableCell>
            <TableCell align="center">{clubName}</TableCell>
            <TableCell align="right">{moment(Number(board.createDate)).format("DD MMM YYYY")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">title</TableCell>
            <TableCell align="center">writtenDate</TableCell>
            <TableCell align="right">readCount</TableCell>
            {/* <TableCell align="right">Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {boardStore.getPostings.length !==0 ? boardStore.getPostings()
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((posting, index) => (
              <TableRow key={posting.id} hover onClick={()=> onSetPosting(`/${board.id}`, posting.id)}>
                <TableCell align="left">{posting.title}</TableCell>
                <TableCell align="center">{posting.writtenDate}</TableCell>
                <TableCell align="right">${posting.readCount}</TableCell>
                {/* <TableCell align="right">
                  <IconButton>
                    <Icon fontSize="small" color="error">close</Icon>
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))
              :
            <TableRow>
              <TableCell align="left">empty</TableCell>
              <TableCell align="center">empty</TableCell>
              <TableCell align="right">empty</TableCell>
              {/* <TableCell align="right">
                <IconButton>
                  <Icon fontSize="small" color="error">close</Icon>
                </IconButton>
              </TableCell> */}
            </TableRow>  
          }
        </TableBody>
      </StyledTable>

      <SimpleCard title="outlined buttons">
        <StyledButton variant="outlined">
          Write
        </StyledButton>
        {/* <StyledButton variant="outlined" color="primary">
          Primary
        </StyledButton>
        <StyledButton variant="outlined" color="secondary">
          Secondary
        </StyledButton> */}
      </SimpleCard>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={boardStore.getPostings.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </TableContainer>
    </Box>
  );
};

export default PaginationTable;
