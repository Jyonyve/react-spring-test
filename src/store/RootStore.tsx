import ClubStore from "./ClubStore"
import { MemberStore } from "./MemberStore";

class RootStore {
    clubStore: typeof ClubStore;
    memberStore: typeof MemberStore;
  
    constructor() {
      this.clubStore = ClubStore;
      this.memberStore = MemberStore;
    }
}
export default new RootStore();