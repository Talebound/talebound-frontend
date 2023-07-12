import { createQuery } from 'react-query-kit';
import { PbDataPostType } from '../generated/api-types/data-contracts';
import { PostTypesCollection } from './collections';
import { TaleboundError } from '../utils/types/error';

export const useGetPostTypes = createQuery<PbDataPostType[], void, TaleboundError>({
  primaryKey: 'useGetPostTypes',
  queryFn: async () => {
    const { data } = await PostTypesCollection.taleboundGetPostTypes();
    return data.postTypes ?? [];
  },
});
