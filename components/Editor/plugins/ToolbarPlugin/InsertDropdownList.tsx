import React, { useCallback, useEffect, useRef } from 'react';
import { LexicalEditor } from 'lexical';
import { BsImage, BsTable } from 'react-icons/bs';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemIcon,
  DropdownItemText,
} from './componentsDropdown';

import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { TbSpacingVertical } from 'react-icons/tb';

interface InsertDropdownListProps {
  editor: LexicalEditor;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowOtherOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTableModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const InsertDropdownList = ({
  editor,
  toolbarRef,
  setShowOtherOptionsDropDown,
  setShowImageModal,
  setShowTableModal,
}: InsertDropdownListProps): JSX.Element => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${window.scrollY + top + 40}px`;
      dropDown.style.left = `${window.scrollX + left + 470}px`;
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
          setShowOtherOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowOtherOptionsDropDown, toolbarRef]);

  const insertHorizontalRule = useCallback(() => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  }, [editor]);

  return (
    <DropdownContainer ref={dropDownRef}>
      <DropdownItem
        active={false}
        onClick={() => setShowTableModal(true)}
        aria-label="Table"
        small={true}
      >
        <DropdownItemIcon>
          <BsTable />
        </DropdownItemIcon>
        <DropdownItemText>Table</DropdownItemText>
      </DropdownItem>

      <DropdownItem
        active={false}
        onClick={() => setShowImageModal(true)}
        aria-label="Image"
        small={true}
      >
        <DropdownItemIcon>
          <BsImage />
        </DropdownItemIcon>
        <DropdownItemText>Image</DropdownItemText>
      </DropdownItem>

      <DropdownItem
        active={false}
        onClick={insertHorizontalRule}
        aria-label="Horizontal line"
        small={true}
      >
        <DropdownItemIcon>
          <TbSpacingVertical />
        </DropdownItemIcon>
        <DropdownItemText>Horizontal line</DropdownItemText>
      </DropdownItem>
    </DropdownContainer>
  );
};

export default InsertDropdownList;
