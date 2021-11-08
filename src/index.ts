import { AppComponent } from './components/appComponent/app';
import { Database } from './components/indexedDB';

import './style.css';

window.onload = async () => {
  const appElement = document.body;
  const indexedDB = new Database();
  await indexedDB.init('matchDB');
  new AppComponent(appElement).render();
};
