import React, { useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import Modal from '../../../Modal/Modal';
import ImageModalContent from './ImageModalContent';

interface ImageModalProps {
  editor: LexicalEditor;
  trigger: React.ReactNode;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ editor, trigger, open, setOpen }) => {
  const content = useMemo(() => <ImageModalContent editor={editor} />, [editor]);

  return <Modal open={open} onOpenChange={setOpen} size="md" trigger={trigger} content={content} />;
};

export default ImageModal;
