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

          <Route  path="/board/:clubId/:boardKind" element={
            id_token !== ''
            ? 
              <PostingListContainer {...props}/>
            : `unproven route!`
            }/>

          <Route path="/board/posting/:postingId" element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <PostingContentsView {...props}/>
            : `unproven route! one posting`
            }/>
          <Route path='/board/posting/:postingId/:commentNumber' element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <CommentEdit currentEmail = {currentEmail} />
            : `unproven route! one comment edit`
            }/>
          <Route path='/membership/:clubId' element={
            localStorage.getItem('id_token') !== '' 
            ? 
              <JoinFormView/>
            : `unproven route! one comment edit`
            }/>
        </Routes>
      </div>
  );
}

export default App;
