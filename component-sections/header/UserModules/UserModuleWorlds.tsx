import React, { Suspense } from 'react';
import { AspectBoxIcon } from '../ControlPanel/AspectBoxIcon';
import { LuGlobe2 } from 'react-icons/lu';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { AspectBox } from '../ControlPanel/AspectBox';
import { useSelector } from 'react-redux';
import { useGetUserModules } from '../../../api/users/useGetUserModules';

const ModuleAspectDiamond = React.lazy(() => import('./ModuleAspectDiamond'));

interface UserModuleWorldsProps {}

const UserModuleWorlds: React.FC<UserModuleWorldsProps> = () => {
  const userId = useSelector((state) => state.auth.user?.id);

  const { data: moduleData } = useGetUserModules({
    variables: userId ?? 0,
  });

  const moduleIds = (moduleData?.userModules ?? []).map((m) => m.moduleId!);

  // const worlds = worldSelectors.selectById(store.getState(), user?.imgId ?? 0);

  return (
    <AspectBox x="right" y="top">
      <AspectBoxIcon x="right" y="top">
        <LuGlobe2 size={20} />
      </AspectBoxIcon>
      {moduleIds.length === 0 && (
        <AspectDiamond imgIdx={0} totalCount={0} index={0} x="right" y="top" text={'No worlds'} />
      )}
      <Suspense
        fallback={
          <AspectDiamond imgIdx={0} totalCount={0} index={0} x="right" y="top" text={'...'} />
        }
      >
        {moduleIds.map(
          (wid, idx) =>
            wid && (
              <ModuleAspectDiamond
                key={wid}
                moduleId={wid}
                totalCount={moduleIds.length}
                index={idx + 1}
              />
            ),
        )}
      </Suspense>
    </AspectBox>
  );
};

export default UserModuleWorlds;
