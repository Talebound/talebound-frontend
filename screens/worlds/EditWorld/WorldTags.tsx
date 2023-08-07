import React, { useCallback, useMemo } from 'react';
import { useGetAvailableWorldTags } from '../../../api/tags/useGetAvailableWorldTags';
import { useAddWorldTag } from '../../../api/worlds/useAddWorldTag';
import { useRemoveWorldTag } from '../../../api/worlds/useRemoveWorldTag';
import { TitleH2 } from '../../../components/Typography/Title';
import { useGetWorldById } from '../../../api/worlds/useGetWorldById';
import { Row } from '../../../components/Flex/Flex';
import TagButton from '../../../components/TagButton/TagButton';
import { PbTag } from '../../../generated/api-types/data-contracts';
import ErrorText from '../../../components/ErrorText/ErrorText';

interface WorldTagsProps {
  worldId: number;
}

const WorldTags: React.FC<WorldTagsProps> = ({ worldId }) => {
  const { data: availableTags = [], isLoading: isLoadingGet } = useGetAvailableWorldTags();
  const { data: worldData } = useGetWorldById({ variables: worldId });

  const tags = useMemo(() => worldData?.tags ?? [], [worldData?.tags]);

  const { mutate: addTag, isLoading: isLoadingAdd, error: errorAdd } = useAddWorldTag();

  const { mutate: removeTag, isLoading: isLoadingRemove, error: errorRemove } = useRemoveWorldTag();

  const onTagSelect = useCallback(
    (tag: PbTag) => {
      if (!tag.tag || !tag.id) return;
      if (tag.id && tags.includes(tag.tag)) {
        removeTag({ worldId, tagId: tag.id });
      } else {
        addTag({ worldId, tagId: tag.id });
      }
    },
    [addTag, removeTag, tags, worldId],
  );

  const isLoading = isLoadingAdd || isLoadingGet || isLoadingRemove;

  return (
    <>
      <TitleH2 css={{ marginTop: '$lg' }} marginBottom="md">
        Tags
      </TitleH2>
      <Row wrap css={{ width: '100%' }} gap="sm">
        {availableTags.map((t) => (
          <TagButton
            disabled={isLoading}
            tag={t}
            key={t.id}
            onSelect={onTagSelect}
            active={tags.includes(t.tag ?? '')}
          />
        ))}
        {availableTags.length === 0 && <p>No tags available</p>}
        <ErrorText error={errorAdd ?? errorRemove} />
      </Row>
    </>
  );
};

export default WorldTags;