import { Route,  Routes } from 'react-router-dom';
import ClubRouter from './router/ClubRouter';
import MemberRouter from './router/MemberRouter';
import { LinkSelector } from './router/LinkSelector';
import GoogleLoginTokenAndView from './views/GoogleLoginTokenAndView';
import { useState } from 'react';
import PostingListContainer from './containers/PostingListContainer';


const App = (props) => {
    
    const [id_token, setId_token] = useState('');
    

    return (
      <div className='App'>       
      <LinkSelector id_token = {id_token} setId_token = {setId_token}/> 
        <Routes>
          <Route path='/login/oauth2/code/google' element = {<GoogleLoginTokenAndView id_token = {id_token} setId_token = {setId_token}/>} />
          
          <Route exact path='/club' element={
            id_token !== ''
            ? <ClubRouter/>
            : `this service is only for members. please login`
          }/>
          <Route exact path='/member' element={
            id_token !== ''
            ? <MemberRouter/>
            : `this service is only for members. please login`
            }/>

          <Route exact path="/board/:clubId/:boardKind" element={
            id_token !== '' //나중에 클럽별 권한 검사 추가...
            ? <PostingListContainer {...props}/>
            : `unproven route!`
            }/>
        </Routes>
      </div>
  );
}

export default App;
