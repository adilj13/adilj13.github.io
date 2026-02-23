import { ThemeProvider } from './context/ThemeContext';
import Webpages from './webpages';

function App() {
  return (
    <ThemeProvider>
      <Webpages />
    </ThemeProvider>
  );
}

export default App;
