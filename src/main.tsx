import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/index.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);