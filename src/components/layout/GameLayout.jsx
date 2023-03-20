import { ref } from 'firebase/database';
import { Outlet, useParams } from 'react-router-dom';
import { database, useFirebase } from '../../utils/firebase';

const GameLayout = () => {
  const { team_id } = useParams();
  const game_ref = ref(database, `games`);
  const games = useFirebase(game_ref);
  const team_ref = ref(database, `games/${team_id}`);
  const team = useFirebase(team_ref);

  return <Outlet context={[team, team_ref, game_ref, games]} />;
};

export default GameLayout;
