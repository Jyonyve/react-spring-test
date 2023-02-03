import {
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
import { observer } from "mobx-react";
import { castToSnapshot } from "mobx-state-tree";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { defaultSnapshotBoard } from "../aggregate/Board";
import { StyledButton } from "../component/importedViewComponent/AppButton";
import { useStore } from "../store/RootStore";
import { PostingEditFormView } from "./PostingEditFormView";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTable = (observer((props) => {

  const {onFetchBoardAndPosting, clubName, onFetchPosting} = props;

  const [board, setBoard] = useState(defaultSnapshotBoard);
  const [renderWriting, setRenderWriting] = useState(false);
  const [postings, setPostings] = useState([]);

  const boardStore = useStore().boardStore;
  const postingStore = useStore().postingStore;

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

  useEffect(  () => {  
      onFetchBoardAndPosting(clubId, boardKind); //fetch board info and posting list to state
      setBoard(castToSnapshot(boardStore.getBoard));
      setPostings({...postingStore.getPostings()});
      // eslint-disable-next-line
  },[postingStore.posting])
 

  return (
    
    // <Box width="100%" overflow="auto">
    <nav>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead >
            <TableRow component={Card}>
              <TableCell align="center">{board.boardKind}</TableCell>
              <TableCell align="center">Club Name : {clubName}</TableCell>
              <TableCell align="center">{board.createDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">title</TableCell>
              <TableCell align="center">writtenDate</TableCell>
              <TableCell align="center">readCount</TableCell>
              {/* <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            { postings && Array.isArray(postings) ? postings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((posting) => (
                <TableRow key={posting.id} hover onClick={()=> onFetchPosting(`/${board.id}`, posting.id)}>
                  <TableCell align="center">{posting.title}</TableCell>
                  <TableCell align="center">{posting.writtenDate}</TableCell>
                  <TableCell align="center">${posting.readCount}</TableCell>
    
                </TableRow>
              ))
                :
              <TableRow>
                <TableCell align="center">empty</TableCell>
                <TableCell align="center">empty</TableCell>
                <TableCell align="center">empty</TableCell>
    
              </TableRow>  
            }
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={postingStore.getPostings.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />

        
        <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
            Write
        </StyledButton> 
            {
              renderWriting===true  ?
              <PostingEditFormView 
              clubId={clubId}
              boardKind={boardKind}
              {...props}
            />
              :
              null
            }
      </TableContainer>
    </nav>
    // </Box>
  );
}));

export default PaginationTable;
