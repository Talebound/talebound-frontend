import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { MdClose, MdDragIndicator } from 'react-icons/md';
import { DragHandle } from '../MenuAdministration/menuAdministrationComponents';
import { Col, Row } from '../../../components/Flex/Flex';
import MenuCategoryEntityDropArea from './MenuCategoryEntityDropArea';
import { isOverCheck } from './menuCategoryUtils';
import { EntityGroupContentHierarchyEntity } from '../../../hooks/useGetMenuItemContentHierarchy';
import { Button } from '../../../components/Button/Button';
import { useGetMenuItemContent } from '../../../api/menus/useGetMenuItemContent';
import { queryClient } from '../../../pages/_app';
import { inferData } from 'react-query-kit';
import { PbEntityGroupContent } from '../../../generated/api-types/data-contracts';

interface MenuItemContentElementEntityProps {
  showHandles: boolean;
  content: EntityGroupContentHierarchyEntity;
}

const MenuItemContentElementEntity: React.FC<MenuItemContentElementEntityProps> = ({
  content,
  showHandles,
}) => {
  const editMode = useSelector((state: ReduxState) => state.menuCategory.editMode);
  const menuId = useSelector((state: ReduxState) => state.menuCategory.menuId);
  const menuItemId = useSelector((state: ReduxState) => state.menuCategory.menuItemId);

  const {
    over,
    setNodeRef: setDroppableRef,
    active,
  } = useDroppable({
    id: content.hierarchyId + '-drop_move',
    data: content,
  });
  const canDropHere =
    !content.hierarchyId.startsWith(`${active?.id}-`) && content.hierarchyId !== active?.id;

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: content.hierarchyId,
    disabled: !editMode || !canDropHere,
    data: content,
  });

  const handleRemoveEntity = useCallback(() => {
    const getMenuItemContentQueryKey = useGetMenuItemContent.getKey({
      menuItemId,
    });

    queryClient.setQueryData<inferData<typeof useGetMenuItemContent>>(
      getMenuItemContentQueryKey,
      (oldData) => {
        if (!oldData?.contents) return;

        const foundEntity = oldData.contents.find((e) => e.contentEntityId === content.entityId);
        console.log('FOUND ENTITY: ', foundEntity);
        if (!foundEntity) return;

        const contents: PbEntityGroupContent[] = oldData.contents
          .map((c) => {
            const position = c.position ?? 0;
            return {
              ...c,
              position:
                c.entityGroupId === foundEntity.entityGroupId &&
                position >= (foundEntity?.position ?? 0)
                  ? position - 1
                  : position,
            };
          })
          .filter((c) => c.contentEntityId !== content.entityId);

        return { ...oldData, contents };
      },
    );
  }, [content.entityId, menuId, menuItemId]);

  const isOver = isOverCheck(content.hierarchyId, over?.id);

  return (
    <>
      <Col gap="sm" fullWidth ref={setDroppableRef}>
        <Row justifyContent="between" semiTransparent={isDragging}>
          <Row>
            {editMode && showHandles && (
              <DragHandle ref={setDraggableRef} {...listeners} {...attributes}>
                <MdDragIndicator size={20} />
              </DragHandle>
            )}
            Entity {content.entityId}
          </Row>
          {editMode && (
            <Button icon onClick={handleRemoveEntity} size="sm" color="dangerOutline">
              <MdClose />
            </Button>
          )}
        </Row>
        {canDropHere && isOver && <MenuCategoryEntityDropArea content={content} />}
      </Col>
    </>
  );
};

export default MenuItemContentElementEntity;
