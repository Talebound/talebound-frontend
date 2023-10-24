import { createMutation, inferData } from 'react-query-kit';
import { LocationsCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { PbLocationPlacement } from '../../generated/api-types/data-contracts';
import { useGetLocations } from './useGetLocations';

interface DeleteBulkLocationParams {
  locationIds: number[];
  placement?: PbLocationPlacement;
}

export const useDeleteBulkLocation = createMutation({
  mutationFn: async (variables: DeleteBulkLocationParams) =>
    LocationsCollection.locationsDeleteBulkLocation({ locationIds: variables.locationIds }),
  onSuccess: (_, variables) => {
    const deletedLocationIds = variables.locationIds;
    const keyParams = variables.placement;

    if (deletedLocationIds && keyParams) {
      const getLocationsQueryKey = useGetLocations.getKey(keyParams);
      queryClient.setQueryData<inferData<typeof useGetLocations>>(
        getLocationsQueryKey,
        (oldData) => oldData?.filter(({ id }) => (id ? !deletedLocationIds.includes(id) : true)),
      );
    }
  },
});
