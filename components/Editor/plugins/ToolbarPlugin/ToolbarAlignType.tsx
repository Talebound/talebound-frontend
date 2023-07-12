import React, { useCallback, useState } from 'react';
import { BsChevronDown, BsJustify, BsTextCenter, BsTextLeft, BsTextRight } from 'react-icons/bs';
import { ElementFormatType, LexicalEditor } from 'lexical';
import { Divider, ToolbarItemButton } from './componentsToolbar';
import { createPortal } from 'react-dom';
import { IconWrapper, TextWrapper } from './ToolbarBlockType';
import { styled } from '../../../../styles/stitches.config';
import AlignOptionsDropdownList from './AlignOptionsDropdownList';

const ChevronWrapper = styled(IconWrapper, {
  width: '14px',
  height: '14px',
  marginRight: 0,
  marginLeft: '4px',
});

export type AlignType = 'left' | 'right' | 'center' | 'justify';

interface AlignTypeInfo {
  name: string;
  iconName: React.ReactNode;
}

const alignTypeToAlignName: Record<ElementFormatType, AlignTypeInfo> = {
  left: {
    name: 'Left',
    iconName: <BsTextLeft />,
  },
  start: {
    name: 'Start',
    iconName: <BsTextLeft />,
  },
  right: {
    name: 'Right',
    iconName: <BsTextRight />,
  },
  end: {
    name: 'End',
    iconName: <BsTextRight />,
  },
  center: {
    name: 'Center',
    iconName: <BsTextCenter />,
  },
  justify: {
    name: 'Justify',
    iconName: <BsJustify />,
  },
  ['']: {
    name: 'Left',
    iconName: <BsTextLeft />,
  },
};

interface ToolbarAlignControlsProps {
  disabled?: boolean;
  alignType: ElementFormatType;
  toolbarRef: React.RefObject<HTMLDivElement>;
  editor: LexicalEditor;
}

const ToolbarAlignType: React.FC<ToolbarAlignControlsProps> = ({
  disabled,
  alignType,
  toolbarRef,
  editor,
}) => {
  const [showAlignOptionsDropDown, setShowAlignOptionsDropDown] = useState(false);

  const showAlignOptionsDropdownListCallback = useCallback(
    () => setShowAlignOptionsDropDown((p) => !p),
    [],
  );

  return (
    <>
      <ToolbarItemButton
        disabled={disabled}
        onClick={showAlignOptionsDropdownListCallback}
        aria-label="Formatting Options"
      >
        <IconWrapper>{alignTypeToAlignName[alignType].iconName}</IconWrapper>
        <ChevronWrapper>
          <BsChevronDown />
        </ChevronWrapper>
      </ToolbarItemButton>
      {showAlignOptionsDropDown &&
        createPortal(
          <AlignOptionsDropdownList
            editor={editor}
            alignType={alignType}
            toolbarRef={toolbarRef}
            setShowAlignOptionsDropDown={setShowAlignOptionsDropDown}
          />,
          document.body,
        )}
      <Divider />
    </>
  );
};

export default ToolbarAlignType;
