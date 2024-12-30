import { renderSidebar, sidebarNumberCount, displayToDoList, projectNumberCount, countUpcomingLength, countTodayLength } from "./renderHTML";
import { sidebarInboxLoad } from "./DOMinterface";
import { setEditFlag } from "./allArrays";

export function renderInitialUI() {
  // Load dynamic HTML elements
  sidebarInboxLoad();
  displayToDoList();
  renderSidebar();
  sidebarNumberCount();
  projectNumberCount();
  countUpcomingLength()
  countTodayLength()
  setEditFlag(null)
}
