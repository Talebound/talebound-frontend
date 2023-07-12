import React, { useCallback, useEffect, useRef } from 'react';
import { LexicalEditor, FORMAT_TEXT_COMMAND } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { BsCode, BsLink, BsTypeStrikethrough } from 'react-icons/bs';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemIcon,
  DropdownItemText,
} from './componentsDropdown';

interface OtherOptionsDropdownListProps {
  editor: LexicalEditor;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowOtherOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;

  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
}

const OtherOptionsDropdownList = ({
  editor,
  toolbarRef,
  setShowOtherOptionsDropDown,
  isStrikethrough,
  isCode,
  isLink,
}: OtherOptionsDropdownListProps): JSX.Element => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left + 250}px`;
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

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const strikethroughTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  }, [editor]);

  const codeTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  }, [editor]);

  return (
    <DropdownContainer ref={dropDownRef}>
      <DropdownItem
        active={isStrikethrough}
        onClick={strikethroughTextCallback}
        aria-label="Strikethrough"
        small={true}
      >
        <DropdownItemIcon>
          <BsTypeStrikethrough />
        </DropdownItemIcon>
        <DropdownItemText>Strikethrough</DropdownItemText>
      </DropdownItem>

      <DropdownItem active={isCode} onClick={codeTextCallback} aria-label="Code block" small={true}>
        <DropdownItemIcon>
          <BsCode />
        </DropdownItemIcon>
        <DropdownItemText>Code block</DropdownItemText>
      </DropdownItem>

      <DropdownItem active={isLink} onClick={insertLink} aria-label="Link" small={true}>
        <DropdownItemIcon>
          <BsLink />
        </DropdownItemIcon>
        <DropdownItemText>Link</DropdownItemText>
      </DropdownItem>
    </DropdownContainer>
  );
};

export default OtherOptionsDropdownList;
