import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ClubListView from '../views/ClubListView';


@inject('clubStore')
@observer
@autobind
class ClubListContainer extends Component {

  constructor(props){
    super(props);
    this.onSetClubs();
  }

  onSelectedClub(club){
    this.props.clubStore.selectedClub(club);
  }

  onSetClubs(){
    this.props.clubStore.setClubs();
  }

  render(){
    
    let {clubs, searchText} = this.props.clubStore;
    let fclubs = clubs.flat(Infinity);

    clubs = fclubs.filter( club => club.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);

    return (
      <ClubListView 
        clubs = {clubs}
        onSelectedClub = {this.onSelectedClub}
        onSetClubs = {this.onSetClubs}
      />
      
    )
  }
}

export default ClubListContainer;