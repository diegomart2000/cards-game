import { useEffect } from 'react';
import { GameBoardPage } from 'pages/GameBoard';
import soundService from 'service/soundService';

function App() {
  useEffect(() => {
    soundService.init();
  }, []);

  return <GameBoardPage />;
}

export default App;
