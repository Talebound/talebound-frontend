import React, { useMemo } from 'react';
import Modal from '../../../components/Modal/Modal';
import { PbModuleType } from '../../../generated/api-types/data-contracts';
import WorldSelectList from './WorldSelect/WorldSelectList';
import { moduleTypeTitles } from '../../../utils/modulesAndEntities';

interface ModuleSelectModalProps {
  trigger?: React.ReactNode;
  moduleType: PbModuleType;
  moduleTypeId?: number; //worldId, systemId,...
  setModuleTypeId?: (id: number) => void;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModuleSelectModal: React.FC<ModuleSelectModalProps> = ({
  trigger,
  moduleType,
  moduleTypeId,
  setModuleTypeId,
  open,
  setOpen,
}) => {
  const content = useMemo(() => {
    switch (moduleType) {
      case PbModuleType.MODULE_TYPE_WORLD: {
        return (
          <WorldSelectList selectedWorldId={moduleTypeId} setSelectedWorldId={setModuleTypeId} />
        );
      }
      default: {
        return `Module type ${moduleType} not implemented `;
      }
    }
  }, [moduleType, moduleTypeId, setModuleTypeId]);

  return (
    <Modal
      trigger={trigger}
      open={open}
      title={`${moduleTypeTitles[moduleType]} select`}
      content={content}
      onOpenChange={setOpen}
      size="full"
    />
  );
};

export default ModuleSelectModal;
