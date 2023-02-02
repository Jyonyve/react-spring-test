import {
  Box,
  Paper,
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

  const {onFetchBoardAndPosting, clubName} = props;
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

  //urlParams(routing)
  const params = useParams();

  useEffect( () => {  
    onFetchBoardAndPosting(params.clubId, params.boardKind);
    setBoard(castToSnapshot(boardStore.getBoard));
    // eslint-disable-next-line
  },[params.boardKind])
 


  return (
    <Box width="100%" overflow="auto">
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead>
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
              <TableRow key={index}>
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
