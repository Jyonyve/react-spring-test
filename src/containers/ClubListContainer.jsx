import { observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React from 'react';
import { useStore } from '../store/RootStore';
import ClubListView from '../views/ClubListView';


const  ClubListContainer =(observer((props) =>{

  const clubStore = useStore().clubStore;
  const id_token= props.id_token;
  
  function onSetClub(club){
    clubStore.setClub(club);
  }

  function onSetClubs(){
    clubStore.setClubs();
  }

  function flatClubs(){
    return clubStore.getClubs().flat(Infinity);
  }

    
    let searchText = clubStore.searchText;
    let clubs = getSnapshot(clubStore.clubs)
    clubs = clubs.filter( club => club.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return (
      <ClubListView 
        clubs = {clubs}
        onSetClub = {onSetClub}
        onSetClubs = {onSetClubs}
      />
      
    )
  
}))

export default ClubListContainer;