import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import MemberRouter from './router/MemberRouter';
import { LinkSelector } from './router/LinkSelector';
import GoogleLoginTokenAndView from './views/GoogleLoginTokenAndView';
import { useState } from 'react';
import PostingListContainer from './containers/PostingListContainer';
import PostingContentsView from './views/PostingContentsView';
import { CommentEdit } from './views/CommentEdit';
import JoinFormView from './views/JoinFormView';
import NotFound from './component/importedViewComponent/NotFound';
import Welcome from './views/Welcome';
import TestBoardListView from './views/TestBoardListView';

const App = (props) => {
    
    const [id_token, setId_token] = useState('');
    const [adminChecker, setAdminChecker] = useState(false)
    const [login, setLogin] = useState(false)
    const [currentEmail, setCurrentEmail] = useState('')

    return (
      <div className='App'>       
      
        <LinkSelector id_token = {id_token} setId_token = {setId_token} adminChecker={adminChecker} 
                    setAdminChecker={setAdminChecker} setLogin={setLogin} login={login} setCurrentEmail={setCurrentEmail} currentEmail={currentEmail}/>
        <Routes>
          <Route path="/" element={<Welcome/>} />
          
          <Route path='/login/oauth2/code/google' element = {<GoogleLoginTokenAndView 
          id_token = {id_token} setId_token = {setId_token}
          adminChecker={adminChecker}
          setAdminChecker={setAdminChecker}
          setLogin={setLogin}
          />} />
          
          <Route exact path='/club' element={
            id_token !== ''
            ? <ClubRouter adminChecker={adminChecker}/>
            : `this service is only for members. please login`
          } />
          <Route exact path='/member' element={
            id_token !== ''
            ? <MemberRouter/>
            : `this service is only for members. please login`
          }/>
          <Route exact path='/test' element={<TestBoardListView/>}/>
          <Route exact path='/test/:boardKind' element={<PostingListContainer {...props}/>}/>
          <Route exact path='test/:boardKind/:postingNumber' element={<PostingContentsView {...props}/>}/>

          <Route  path="/board/:clubId/:boardKind" element={
            id_token !== ''
            ? 
              <PostingListContainer {...props}/>
            : `로그아웃 상태입니다. 로그인해주세요.`
            }/>

          <Route path="/board/posting/:postingId" element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <PostingContentsView {...props}/>
            : `로그아웃 상태입니다. 로그인해주세요.`
            }/>
          <Route path='/board/posting/:postingId/:commentNumber' element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <CommentEdit currentEmail = {currentEmail} />
            : `로그아웃 상태입니다. 로그인해주세요.`
            }/>
          <Route path='/membership/:clubId' element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <JoinFormView/>
            : `로그아웃 상태입니다. 로그인해주세요.`
            }/>
          <Route path="/error" element={NotFound}/>
          <Route element={NotFound}/>
        </Routes>
      </div>
  );
}

export default App;
