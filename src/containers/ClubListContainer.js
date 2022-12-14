import autobind from 'autobind-decorator';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ClubListView from '../views/ClubListView';


@inject('clubStore')
@observer
@autobind
class ClubListContainer extends Component {

  // constructor(props){
  //   super(props);
  //   this.onSetClubs();
  // }

  onSelectedClub(club){
    this.props.clubStore.selectedClub(club);
  }

  onSetClubs(){
    this.props.clubStore.setClubs();
  }


  render(){
    
    return (
      <ClubListView 
        clubs = {this.props.clubStore.clubs}
        onSelectedClub = {this.onSelectedClub}
        onSetClubs = {this.onSetClubs}
      />
      
    )
  }
}

export default ClubListContainer;