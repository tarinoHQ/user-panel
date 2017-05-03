import { createSelector } from 'reselect';

export const getRoutingQuery = state => state.routing.locationBeforeTransitions.query;
