import { renderSidebar, sidebarNumberCount, displayToDoList, projectNumberCount } from "./renderHTML";
import { sidebarInboxLoad } from "./DOMinterface";

export function renderInitialUI() {
  // Load dynamic HTML elements
  sidebarInboxLoad();
  displayToDoList();
  renderSidebar();
  sidebarNumberCount();
  projectNumberCount();
}
