import { loadInbox } from "./loadhomepage";
import { setupSidebar, setupEventListeners } from "./pageLoadEventHandlers";
import { renderInitialUI } from "./renderUI";

export function initializeApp() {
  // 1. Load the initial UI
  loadInbox('Inbox');
  renderInitialUI();

  // 2. Setup dynamic event listeners
  setupEventListeners();
  setupSidebar();
}
