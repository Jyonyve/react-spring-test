import {  IconButton } from "@material-ui/core";
import { Cached } from "@material-ui/icons";
import {
  Box,
  Paper,
  Card,
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
import moment from "moment";
import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const {onFetchBoardAndPosting, clubName} = props;
  const boardStore = useStore().boardStore;
  const postingStore = useStore().postingStore;
  const postings = postingStore.postings
  const posting = postingStore.posting;
  const setPostingProps = postingStore.setPostingProps;

  const [board, setBoard] = useState(defaultSnapshotBoard);
  const [renderWriting, setRenderWriting] = useState(false);

  const navigate = useNavigate();

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

  async function af () {
    await onFetchBoardAndPosting(clubId, boardKind); //fetch board info and posting list to state
    setBoard(castToSnapshot(boardStore.getBoard));
  } 

  useEffect(() =>{
    af()
    // eslint-disable-next-line
  },[renderWriting])

  useEffect(() => {
    af()
    if(posting.id){
      navigate(`/board/posting/${posting.id}`, {state:{postingId : `${posting.id}`, boardId:`${clubId}/${boardKind}`}})
    }
    // eslint-disable-next-line
  },[postingStore.posting.id])

  function handleOnClick(posting, clubId, boardKind){
    setPostingProps('title', posting.title)
    setPostingProps('contents', posting.contents)
    setPostingProps('writerEmail', posting.writerEmail)
    setPostingProps('id', posting.id)
    setPostingProps("readCount", posting.readCount+1 )
    setPostingProps("boardId", `${clubId}/${boardKind}`)
    postingStore.editPosting();

    navigate(`/board/posting/${posting.id}`,{state:{
      postingId : `${posting.id}`, 
      title : `${posting.title}`, 
      contents : `${posting.contents}`, 
      writerEmail : `${posting.writerEmail}`, 
      readCount : `${posting.readCount}`, 
      boardId:`${clubId}/${boardKind}`, 
      location:window.location.pathname}} )
  }

  function writeButton(boardKind){
    if(localStorage.getItem('userRoles').includes("ADMIN")){
      return(
      <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
          Write
      </StyledButton>
      )
    } else {
      switch(boardKind){
        case 'NOTICEBOARD' :
          return;
        case 'SOCIALBOARD' :
          return(
            <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
                Write
            </StyledButton>
            )
        case 'QNABOARD' : 
          return(
            <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
                Write
            </StyledButton>
            )
        case 'FAQBOARD':
          return;
        default :
          break;
      }
    }

    
  }


  return (
     <nav>
    <Box width="100%" overflow="auto">
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead >
            <TableRow component={Card}>
              <TableCell align="center">{board.boardKind}</TableCell>
              <TableCell align="center">Club Name : {clubName}</TableCell>
              <TableCell align="center">{board.createDate}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell variant="head" align="center">title</TableCell>
              <TableCell variant="head" align="center">writtenDate</TableCell>
              <TableCell variant="head" align="center">readCount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { postings && Array.isArray(postings) ? postings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => b.writtenDate - a.writtenDate)
              .map((posting, index) => (
                <TableRow key={index} hover onClick={()=> {
                  handleOnClick(posting, clubId, boardKind)
                }}>
                  <TableCell align="center">{posting.title}</TableCell>
                  <TableCell align="center">{moment(`${posting.writtenDate}`, "x").format("DD MMM YYYY hh:mm a")}</TableCell>
                  <TableCell align="center">{posting.readCount}</TableCell>
    
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
          count={postings.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
        <Box container 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // p: 1,
            // m: 1,
            bgcolor: 'background.paper',
            // borderRadius: 1,
        }}>
          {writeButton(boardKind)}
          <IconButton children={<Cached/>} size="small" onClick={ async () => await af()}/>
        </Box> 
      </TableContainer>
   </Box>

            {      
              renderWriting===true  ?
              (postingStore.clearPosting(),
              <PostingEditFormView 
                clubId={clubId}
                boardKind={boardKind}
                setRenderWriting={setRenderWriting}
                {...props}
              />)
              :
              null
            }
   </nav>
  );
}));

export default PaginationTable;
