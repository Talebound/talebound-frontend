import { createQuery } from 'react-query-kit';
import { TagsCollection } from '../collections';
import { PbTag } from '../../generated/api-types/data-contracts';

export const useGetAvailableWorldTags = createQuery<PbTag[], void>({
  primaryKey: 'useGetAvailableWorldTags',
  queryFn: async () => {
    const { data } = await TagsCollection.taleboundGetAvailableWorldTags();
    return (data.tags ?? []).sort((a, b) => (a.tag ?? '').localeCompare(b.tag ?? ''));
  },
});