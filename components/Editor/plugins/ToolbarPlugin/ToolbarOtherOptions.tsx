import React, { useCallback, useState } from 'react';
import { BsChevronDown, BsType } from 'react-icons/bs';
import { LexicalEditor } from 'lexical';
import { Divider, ToolbarItemButton } from './componentsToolbar';
import { createPortal } from 'react-dom';
import { IconWrapper } from './ToolbarBlockType';
import { styled } from '../../../../styles/stitches.config';
import OtherOptionsDropdownList from './OtherOptionsDropdownList';

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

interface ToolbarOtherOptionsProps {
  disabled?: boolean;
  toolbarRef: React.RefObject<HTMLDivElement>;
  editor: LexicalEditor;

  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
}

const ToolbarOtherOptions: React.FC<ToolbarOtherOptionsProps> = ({
  disabled,
  toolbarRef,
  editor,
  isStrikethrough,
  isCode,
  isLink,
}) => {
  const [showOtherOptionsDropDown, setShowOtherOptionsDropDown] = useState(false);

  const showOtherOptionsDropdownListCallback = useCallback(
    () => setShowOtherOptionsDropDown((p) => !p),
    [],
  );

  return (
    <>
      <ToolbarItemButton
        disabled={disabled}
        onClick={showOtherOptionsDropdownListCallback}
        aria-label="Formatting Options"
      >
        <IconWrapper>
          <BsType />
        </IconWrapper>
        <ChevronWrapper>
          <BsChevronDown />
        </ChevronWrapper>
      </ToolbarItemButton>
      {showOtherOptionsDropDown &&
        createPortal(
          <OtherOptionsDropdownList
            editor={editor}
            toolbarRef={toolbarRef}
            setShowOtherOptionsDropDown={setShowOtherOptionsDropDown}
            isStrikethrough={isStrikethrough}
            isCode={isCode}
            isLink={isLink}
          />,
          document.body,
        )}
    </>
  );
};

export default ToolbarOtherOptions;
