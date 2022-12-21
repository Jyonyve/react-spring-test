import React, { Component} from 'react';
import ClubEditFormView from '../views/ClubEditFormView';
import { inject, observer} from 'mobx-react';
import autobind from 'autobind-decorator';
import { rootStore } from '../store/RootStore';
//import generateId from '../IDGenerator';
@inject('rootStore')
@autobind 
//inject보다 autobind를 위에 놓으면(먼저 설정하면) 에러가 난다.
@observer
class ClubEditFormContainer extends Component {
  
  onSetClubProps(name, value){
    rootStore.clubStore.setClubProps(name, value);
  }

  onAddClub(){
    let club ;
    //club = {...club, reactId:generateId(8)}
    rootStore.clubStore.addClub(club);
  } 

  onUpdateClub(){
    rootStore.clubStore.updateClub();
  }

  onDeleteClub(){
    rootStore.clubStore.deleteClub();
  }

  render(){

    return(
      <ClubEditFormView 
        club = {rootStore.clubStore.club} //get 통해서 가져온 것(변수처럼 가져오게 되어있음)
        onSetClubProps = {this.onSetClubProps}
        onAddClub = {this.onAddClub}
        onUpdateClub = {this.onUpdateClub}
        onDeleteClub = {this.onDeleteClub}
      />
    )
  }
}

export default ClubEditFormContainer;