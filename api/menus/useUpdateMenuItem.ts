import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItems } from './useGetMenuItems';
import { sortByPosition } from '../../utils/functions/sortByPosition';

type UpdateMenuItemParams = {
  menuId: number;
  menuItemId: number;
  body: Parameters<typeof MenusCollection.taleboundUpdateMenuItem>[2];
};

export const useUpdateMenuItem = createMutation({
  mutationFn: async (variables: UpdateMenuItemParams) =>
    MenusCollection.taleboundUpdateMenuItem(variables.menuId, variables.menuItemId, variables.body),
  onSuccess: (data, variables) => {
    const { menuId, menuItemId } = variables;
    const updatedMenuItem = data.data;
    if (menuId && menuItemId && updatedMenuItem) {
      const newPosition = variables.body.position;
      const getMenuItemsQueryKey = useGetMenuItems.getKey(menuId);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(
        getMenuItemsQueryKey,
        (oldData) => {
          const index = oldData?.findIndex((menuItem) => menuItem.id === menuItemId);
          if (oldData && index !== undefined && index !== -1) {
            const oldItem = oldData[index];

            if (newPosition !== undefined && newPosition !== oldItem.position) {
              // If the position has changed, we need to update the positions of all menu items
              // between the old position and the new position.
              const oldPosition = oldItem.position;

              if (oldPosition) {
                const minPosition = Math.min(oldPosition, newPosition);
                const maxPosition = Math.max(oldPosition, newPosition);

                return oldData
                  .map((menuItem) => {
                    if (menuItem.position === oldPosition) {
                      menuItem.position = newPosition;
                    } else if (
                      menuItem.position &&
                      menuItem.position >= minPosition &&
                      menuItem.position <= maxPosition
                    ) {
                      const increment = oldPosition < newPosition ? -1 : 1;
                      menuItem.position += increment;
                    }
                    return menuItem;
                  })
                  .sort(sortByPosition);
              }
            }

            oldData[index] = updatedMenuItem;
          }
          return oldData;
        },
      );
    }
  },
});
