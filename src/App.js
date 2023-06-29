import AnimatedRoutes from './Routes/AllRoutes';
import './App.css';
import theme from './Utilities/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
