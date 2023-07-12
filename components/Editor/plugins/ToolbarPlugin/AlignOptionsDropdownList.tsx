import React, { useCallback, useEffect, useRef } from 'react';
import { LexicalEditor, FORMAT_ELEMENT_COMMAND } from 'lexical';
import { BsJustify, BsTextCenter, BsTextLeft, BsTextRight } from 'react-icons/bs';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemIcon,
  DropdownItemText,
} from './componentsDropdown';

interface AlignOptionsDropdownListProps {
  editor: LexicalEditor;
  alignType: string;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowAlignOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlignOptionsDropdownList = ({
  editor,
  alignType,
  toolbarRef,
  setShowAlignOptionsDropDown,
}: AlignOptionsDropdownListProps): JSX.Element => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left + 370}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const target = event.target as Node;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowAlignOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowAlignOptionsDropDown, toolbarRef]);

  const leftElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
    setShowAlignOptionsDropDown(false);
  }, [editor, setShowAlignOptionsDropDown]);

  const centerElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
    setShowAlignOptionsDropDown(false);
  }, [editor, setShowAlignOptionsDropDown]);

  const rightElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
    setShowAlignOptionsDropDown(false);
  }, [editor, setShowAlignOptionsDropDown]);

  const justifyElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
    setShowAlignOptionsDropDown(false);
  }, [editor, setShowAlignOptionsDropDown]);

  return (
    <DropdownContainer ref={dropDownRef}>
      <DropdownItem
        active={alignType === 'left'}
        onClick={leftElementCallback}
        aria-label="Left Align"
        small={true}
      >
        <DropdownItemIcon>
          <BsTextLeft />
        </DropdownItemIcon>
        <DropdownItemText>Left</DropdownItemText>
      </DropdownItem>

      <DropdownItem
        active={alignType === 'right'}
        onClick={rightElementCallback}
        aria-label="Right Align"
        small={true}
      >
        <DropdownItemIcon>
          <BsTextRight />
        </DropdownItemIcon>
        <DropdownItemText>Right</DropdownItemText>
      </DropdownItem>

      <DropdownItem
        active={alignType === 'center'}
        onClick={centerElementCallback}
        aria-label="Center Align"
        small={true}
      >
        <DropdownItemIcon>
          <BsTextCenter />
        </DropdownItemIcon>
        <DropdownItemText>Center</DropdownItemText>
      </DropdownItem>

      <DropdownItem
        active={alignType === 'justify'}
        onClick={justifyElementCallback}
        aria-label="Justify Align"
        small={true}
      >
        <DropdownItemIcon>
          <BsJustify />
        </DropdownItemIcon>
        <DropdownItemText>Justify</DropdownItemText>
      </DropdownItem>
    </DropdownContainer>
  );
};

export default AlignOptionsDropdownList;
