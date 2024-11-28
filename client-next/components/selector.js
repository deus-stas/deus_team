import { createSelector } from 'reselect';

const selectAppState = (state) => state.app;

export const selectHeaderDataAndServices = createSelector(
  [selectAppState],
  (app) => ({
    headerData: app.headerData,
    services: app.services,
  })
);