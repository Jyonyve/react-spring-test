import {  Container, IconButton } from "@material-ui/core";
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
import {  adminChecker, getCurrentEmail, TestBoardChecker } from "../component/Rolechecker";
import { useStore } from "../store/RootStore";
import { PostingInsertFormView } from "./PostingInsertFormView";
import WriteButton from "./WriteButton";

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
      if(posting.id){
        navigate(`/board/posting/${posting.id}`, {state:{
          postingId : `${posting.id}`,
          writerEmail :`${posting.writerEmail}`,
          title: `${posting.title}`,
          contents:`${posting.contents}`,
          readCount :`${posting.readCount}`,
          writtenDate :`${posting.writtenDate}`,
          boardId:`${clubId}/${boardKind}`,
          pathlocation:window.location.pathname
        }})
      }
  } 

  async function sampleBoard(){
    await postingStore.fetchTestPostings(boardKind);
  }

  useEffect(() =>{
    TestBoardChecker() ? sampleBoard() : af()
    // eslint-disable-next-line
  },[renderWriting])

  function handleOnClick(posting, clubId, boardKind){
    setPostingProps('title', posting.title)
    setPostingProps('contents', posting.contents)
    setPostingProps('id', posting.id)
    setPostingProps("readCount", posting.readCount+1)
    setPostingProps("boardId", `${boardKind}`)

    if(TestBoardChecker() === false){
      setPostingProps('writerEmail', posting.writerEmail)
      setPostingProps("boardId", `${clubId}/${boardKind}`)
      postingStore.editPosting(postingStore.getPosting()) //조회수 업데이트 

      navigate(`/board/posting/${posting.id}`,{state:{
        postingId : `${posting.id}`, 
        title : `${posting.title}`, 
        contents : `${posting.contents}`, 
        writerEmail : `${posting.writerEmail}`, 
        boardId:`${clubId}/${boardKind}`, 
        pathlocation:window.location.pathname}} )
        
    } else {
        postingStore.editSamplePosting(postingStore.getPosting())
    }
  }



  return (
     <nav>
    <Container maxWidth="auto">
    {/* <Box width="100%" overflow="auto"> */}
      <TableContainer component={Paper} >
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
            { postings && Array.isArray(postings) ? 
              (boardKind !== "QNABOARD" || adminChecker() ? 
              postings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => b.writtenDate - a.writtenDate)
              .map((posting, index) => (
                <TableRow key={index} hover onClick={()=> {
                  const copyPosting = {...posting}
                  handleOnClick(copyPosting, clubId, boardKind)
                  navigate(TestBoardChecker() ?  `/test/posting/${copyPosting.id}` : `/board/posting/${copyPosting.id}`,{state:{
                    postingId : `${copyPosting.id}`, 
                    title : `${copyPosting.title}`, 
                    contents : `${copyPosting.contents}`, 
                    writerEmail : `${copyPosting.writerEmail}`, 
                    boardId:`${clubId}/${boardKind}`, 
                    pathlocation:window.location.pathname}} )
                }}>
                  <TableCell align="center">{posting.title}</TableCell>
                  <TableCell align="center">{moment(`${posting.writtenDate}`, "x").format("YYYY MMM DD hh:mm a")}</TableCell>
                  <TableCell align="center">{posting.readCount}</TableCell>
    
                </TableRow>))
              :
              postings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => b.writtenDate - a.writtenDate)
              .filter(posting => posting.writerEmail === getCurrentEmail()).map((posting, index) => (
                <TableRow key={index} hover onClick={()=> {
                  const copyPosting = {...posting}
                  handleOnClick(copyPosting, clubId, boardKind)
                }}>
                  <TableCell align="center">{posting.title}</TableCell>
                  <TableCell align="center">{moment(`${posting.writtenDate}`, "x").format("YYYY MMM DD hh:mm a")}</TableCell>
                  <TableCell align="center">{posting.readCount}</TableCell>
    
                </TableRow>))
              )
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
        <Box  
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
        }}>
          {WriteButton(boardKind, renderWriting, setRenderWriting)}
          <IconButton children={<Cached/>} size="small" onClick={ async () => TestBoardChecker() ? await sampleBoard() : await af()}/>
        </Box> 
      </TableContainer>
   {/* </Box> */}

            {      
              renderWriting===true  ?
              (postingStore.clearPosting(),
              <PostingInsertFormView 
                clubId={clubId}
                boardKind={boardKind}
                setRenderWriting={setRenderWriting}
                {...props}
              />)
              :
              null
            }
   </Container>
   </nav>
  );
}));

export default PaginationTable;
