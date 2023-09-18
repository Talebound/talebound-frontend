import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbMenuItemPost } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';
import { sortByPosition } from '../../utils/functions/sortByPosition';

type GetMenuItemPostsParams = {
  menuId: number;
  menuItemId: number;
};

export const useGetMenuItemPosts = createQuery<
  PbMenuItemPost[],
  GetMenuItemPostsParams,
  TaleboundError
>({
  primaryKey: 'useGetMenuItemPosts',
  queryFn: async ({ queryKey: [_, variables] }) => {
    const { data } = await MenusCollection.taleboundGetMenuItemPosts(
      variables.menuId,
      variables.menuItemId,
    );
    return data?.menuItemPosts?.sort(sortByPosition) ?? [];
  },
});