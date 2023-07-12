import React, { useCallback, useState } from 'react';
import { BsChevronDown, BsPlus } from 'react-icons/bs';
import { LexicalEditor } from 'lexical';
import { ToolbarItemButton } from './componentsToolbar';
import { createPortal } from 'react-dom';
import { IconWrapper } from './ToolbarBlockType';
import { styled } from '../../../../styles/stitches.config';
import InsertDropdownList from './InsertDropdownList';
import ImageModal from '../../nodes/ImageModal/ImageModal';

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

export const TextWrapper = styled('span', {
  display: 'flex',
  lineHeight: '20px',
  verticalAlign: 'middle',
  fontSize: '14px',
  color: '#777',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  height: '20px',
  textAlign: 'left',
});

interface ToolbarInsertProps {
  disabled?: boolean;
  toolbarRef: React.RefObject<HTMLDivElement>;
  editor: LexicalEditor;
}

const ToolbarInsert: React.FC<ToolbarInsertProps> = ({ disabled, toolbarRef, editor }) => {
  const [showInsertDropDown, setShowInsertDropDown] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const showInsertDropdownListCallback = useCallback(() => setShowInsertDropDown((p) => !p), []);

  return (
    <>
      <ToolbarItemButton
        disabled={disabled}
        onClick={showInsertDropdownListCallback}
        aria-label="Formatting Options"
      >
        <IconWrapper>
          <BsPlus />
        </IconWrapper>
        <TextWrapper>Insert</TextWrapper>
        <ChevronWrapper>
          <BsChevronDown />
        </ChevronWrapper>
      </ToolbarItemButton>
      {showInsertDropDown &&
        createPortal(
          <InsertDropdownList
            editor={editor}
            toolbarRef={toolbarRef}
            setShowOtherOptionsDropDown={setShowInsertDropDown}
            setShowImageModal={setShowImageModal}
          />,
          document.body,
        )}
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        editor={editor}
        trigger={null}
      />
    </>
  );
};

export default ToolbarInsert;
