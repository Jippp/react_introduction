import { useRoutes } from 'react-router-dom'

import { pathConfigs } from './routers'
import Home from './modules/home'

function App() {
  return (
    <div className="App">
      <Home>
        {useRoutes(pathConfigs)}
      </Home>
    </div>
  );
}

export default App;
