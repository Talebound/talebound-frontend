import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMenuItem } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';
import { sortByPosition } from '../../utils/functions/sortByPosition';

export const useGetMenuItems = createQuery<PbMenuItem[], number, TaleboundError>({
  primaryKey: 'useGetMenuItems',
  queryFn: async ({ queryKey: [a, variables] }) => {
    const { data } = await MenusCollection.taleboundGetMenuItems(variables);
    return data?.menuItems?.sort(sortByPosition) ?? [];
  },
});
