import { PbDataPostType } from '../generated/api-types/data-contracts';
import { useGetPostTypes } from '../api/useGetPostTypes';

export enum PostTypeEnum {
  Universal = 100,
  QuestPost = 200,
  WorldDescription = 300,
  RuleSetDescription = 400,
  QuestDescription = 500,
  CharacterDescription = 600,
  News = 700,
  UserIntroduction = 800,
}

export function usePostType(postTypeId: number): PbDataPostType | undefined {
  const { data } = useGetPostTypes({
    suspense: true,
  });

  return data?.find((postType) => postType.id === postTypeId);
}
