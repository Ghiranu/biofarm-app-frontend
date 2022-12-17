import { createBrowserRouter } from "react-router-dom";
import App from "App";
// import { DashboardPage } from 'Dashboard'
import { PATHS } from "shared/constants/utils";
// import { AgentsPage } from 'Agents/components/AgentsPage'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: PATHS.DASHBOARD,
        element: <h1>Test</h1>,
      },
      {
        path: PATHS.AGENTS,
        element: <h1>Test</h1>,
      },
      {
        path: PATHS.CLOSED_CONTACTS,
        element: <div>TBD - Closed contacts page</div>,
      },
      {
        path: PATHS.REPORT,
        element: <div>TBD - Report page</div>,
      },
      {
        path: PATHS.NOTIFICATIONS,
        element: <div>TBD - Notifications page</div>,
      },
      {
        path: PATHS.PARTNER,
        element: <div>TBD - Partner page</div>,
      },
    ],
  },
]);
