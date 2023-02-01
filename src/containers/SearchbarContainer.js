import React, { Component } from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
import  SearchIcon  from '@material-ui/icons/Search';
import { observer} from 'mobx-react'
import autobind from 'autobind-decorator'
import { rootStore } from '../store/RootStore';

@observer
@autobind
class SearchbarContainer extends Component {

  locationNow = window.location.pathname;

  onChangeSearchText(searchText){
    switch(this.locationNow){
      case `/club` :
        rootStore.clubStore.setSearchText(searchText);
        break;
      case `/member` :
        rootStore.memberStore.setSearchText(searchText);
        break;
      default :
        throw new Error(`no store!`);
    }
  }

  render(){
    return (
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange = {(event) => this.onChangeSearchText(event.target.value)}
      />
    )}
}

export default SearchbarContainer;