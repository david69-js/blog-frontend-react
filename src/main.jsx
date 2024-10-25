import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importar Provider
import App from './App.jsx';
import store from './redux/store/store.js'; // Importar tu store
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Envolver App con Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
