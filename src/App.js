import { ClubComponents } from './componentSelect/ClubComponents';
import { useStores } from './store/RootStore';


export default function App() {

  const {clubStore, memberStore} = useStores();

  return (
      <ClubComponents useStores = {useStores().clubStore} />
  )
}

