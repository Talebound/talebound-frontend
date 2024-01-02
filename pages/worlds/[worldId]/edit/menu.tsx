import React, { Suspense } from 'react';
import Head from 'next/head';
import ModuleOpened from '../../../../screens/worlds/ModuleOpened';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';
import EditModuleMenu from '../../../../screens/worlds/EditModuleMenu/EditModuleMenu';

const Worlds: React.FC = () => {
  const moduleId = useUrlModuleId();

  return (
    <>
      <Head>
        <title>Worlds - menu administration</title>
      </Head>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
          <EditModuleMenu moduleId={moduleId} />
        </Suspense>
      )}
    </>
  );
};

export default Worlds;
