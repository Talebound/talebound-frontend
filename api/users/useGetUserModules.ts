import { createQuery } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { PbGetUserModulesResponse } from '../../generated/api-types/data-contracts';
import { worldAdapterSlice } from '../../adapters/WorldAdapter';
import { store } from '../../store';

export const useGetUserModules = createQuery<PbGetUserModulesResponse, number>({
  primaryKey: 'useGetUserModules',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await UsersCollection.usersGetUserModules(variables);

    store.dispatch(worldAdapterSlice.actions.upsertWorlds(data?.worlds ?? []));

    return data;
  },
});
