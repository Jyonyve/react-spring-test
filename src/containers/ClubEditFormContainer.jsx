import React from 'react';
import ClubEditFormView from '../views/ClubEditFormView';
import { observer} from 'mobx-react';
import { useStore } from '../store/RootStore';


const ClubEditFormContainer =(observer((props) =>{

  const clubStore = useStore().clubStore;
  
  function onSetClubProps(name, value){
    clubStore.setClubProps(name, value);
  }

  function onAddClub(){
    clubStore.addClub();
  } 

  function onUpdateClub(){
    clubStore.updateClub();
  }

  function onDeleteClub(){
    clubStore.deleteClub();
  }


    return(
      <ClubEditFormView 
        club = {clubStore.club} //get 통해서 가져온 것(변수처럼 가져오게 되어있음)
        onSetClubProps = {onSetClubProps}
        onAddClub = {onAddClub}
        onUpdateClub = {onUpdateClub}
        onDeleteClub = {onDeleteClub}
        clubStore = {clubStore}
      />
    )
  
}))

export default ClubEditFormContainer;