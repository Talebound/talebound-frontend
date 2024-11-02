import React from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_QUEST_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useQuest } from '../../hooks/useQuest';

interface QuestCardProps {
  questId: number;
}

const QuestCard: React.FC<QuestCardProps> = ({ questId }) => {
  const { quest, module } = useQuest(questId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_QUEST,
  });

  if (!quest) return null;

  return (
    <ImageCard
      key={quest.id}
      title={quest.name ?? '- Unknown -'}
      basedOn={''}
      questCount={0}
      activityCount={0}
      playModeCount={0}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_QUEST_THUMBNAIL}
      href={`/quests/${quest.id}/detail`}
      availableTags={availableTags}
      tags={[]} //module.tags ??
    />
  );
};

export default QuestCard;
