import { PbModuleType, PbViewModule } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';
import { useGetModuleById } from '../api/modules/useGetModuleById';
import { TaleboundError } from '../utils/types/error';

interface UseModuleResponse {
  module: PbViewModule | undefined;
  moduleTypeId: number;
  linkPrefix: string;
  isFetching: boolean;
  error: TaleboundError | null;
}

export const useModule = (moduleId: number): UseModuleResponse => {
  const { data: module, isFetching, error } = useGetModuleById({ variables: moduleId });

  const moduleTypeId = useMemo(() => {
    switch (module?.moduleType) {
      case PbModuleType.MODULE_TYPE_WORLD:
        return module?.worldId ?? 0;
      default:
        throw new Error(`Module type ${module?.moduleType} not implemented yet`);
    }
  }, [module?.moduleType, module?.worldId]);

  const linkPrefix = useMemo(() => {
    switch (module?.moduleType) {
      case PbModuleType.MODULE_TYPE_WORLD:
        return 'worlds';
      default:
        throw new Error(`Module type ${module?.moduleType} not implemented yet`);
    }
  }, [module?.moduleType]);

  return useMemo(
    () => ({
      module,
      moduleTypeId,
      linkPrefix,
      isFetching: isFetching ?? false,
      error: error ?? null,
    }),
    [error, isFetching, linkPrefix, module, moduleTypeId],
  );
};
