import Facility from "../pages/facility";
import ManageProfile from "../pages/managaProfile";
import Chart from "../pages/chart";
export const routeLink = {
  manageProfile: "/manageProfile",
  profile: `/manageProfile/profile`,
  manageFacility: "/facility",
  dashboard: "/",
};
export const routes = [
  {
    path: routeLink.manageProfile,
    exact: true,
    Component: ManageProfile,
  },
  {
    path: routeLink.dashboard,
    exact: true,
    Component: Chart,
  },
  {
    path: routeLink.facility,
    exact: true,
    Component: Facility,
  },
];
