import {observable, action, computed, makeObservable, toJS} from 'mobx';
import ClubService from '../service/ClubService';

class ClubStore{
    
    constructor(){
        makeObservable(this);
        this.setClubList();
    }

    clubService = ClubService;
    
    @observable
    _club = {
        
    } //reactId, title, date

    @observable
    _clubs = [];

    @observable
    _searchText = '';


    get club(){
        return this._club;
    }

    @computed
    //observable 데이터에서 어떤 연산이 일어나게 되면 사용해야 하는 메소드
    //(호출할 때마다 연산하지 않도록 최종 캐싱값을 반환해줌)
    //지금은 적용되어있지 않음.... 만약 toJS 합수를 이용해 리턴을 JS객체 배열로 받겠다, 하면 붙여줘야함
    get clubs(){
        return toJS(this._clubs);
    }

    get searchText(){
        return this._searchText;
    }

    @action
    setSearchText(searchText){
        this._searchText = searchText;
    }

    @action
    setClubProps(name, value){
        this._club = {
            ...this._club, 
            //전개 연산자 : 펼친 배열을 중괄호로 감싸서 객체로 만든다면, 
            //각 요소는 프로퍼티 값이 되고, 배열의 인덱스가 프로퍼티 이름이 된다.
            //전개 구문을 활용하면 다른 객체의 프로퍼티를 복사해오면서 추가로 프로퍼티를 작성할 수도 있다.
            //_club 객체를 복사해오면서, name에 따라서 바뀐 value를 넣어주도록 작성한 것.
            [name] : value
        }
    }

    @action
    setClubList(){
        let dbClubs = this.clubService.fetchClubs();

        Promise.resolve(dbClubs).then(dbClub => 
            {this._clubs.push(dbClub);}
        )
        return this._clubs;      
    }

    @action
    addClub(club){        
        this._clubs = [];
        this.clubService.addClub(club);
        this.setClubList();
        return this._clubs;
    }


    @action
    selectedClub(club){
        this._club = club;
    }

    @action
    updateClub(){
        let foundClub = this._clubs.find(club => club.reactId === this._club.reactId);
        foundClub.name = this._club.name;
        foundClub.intro = this._club.intro;

        let value = this.clubService.fetchClubId(foundClub.reactId);

        value.then( clubId => {
            console.log('clubId : ' + clubId.data + ' !!');
            this.setClubProps('id', clubId.data );      
            this.clubService.editClub(clubId.data, this._club);      
        } , clubId => {
            console.log(clubId.data + 'is undefined. ');
        })

    }

    @action
    deleteClub(){
        let index = this._clubs.findIndex(club => club.reactId === this.club.reactId);

        let value = this.clubService.fetchClubId(this._club.reactId);
        value.then( clubId => {
            this.clubService.deleteClub(clubId.data);      
        } , clubId => {
            console.log(clubId + 'is undefined. ');
        })

        if(index > -1){
            this._clubs.splice(index, 1);
        }



        this._club = {};
    }


    
}
export default new ClubStore();