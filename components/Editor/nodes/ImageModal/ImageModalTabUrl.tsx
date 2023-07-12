import React, { useCallback, useEffect, useMemo } from 'react';
import { LexicalEditor } from 'lexical';
import { useInput } from '../../../../hooks/useInput';
import Input from '../../../Input/Input';
import { INSERT_INLINE_IMAGE_COMMAND } from '../../plugins/InlineImagePlugin';
import { Col, Row } from '../../../Flex/Flex';
import { Button } from '../../../Button/Button';
import { InlineImagePayload } from '../InlineImageNode';
import { useDispatch, useSelector } from 'react-redux';
import { updateInlineImagePayload } from './imageModalSlice';
import { ReduxState } from '../../../../store';

interface ImageModalTabUrlProps {
  editor: LexicalEditor;
}

const ImageModalTabUrl: React.FC<ImageModalTabUrlProps> = ({ editor }) => {
  const dispatch = useDispatch();
  const { value: urlValue, onChange: onChangeUrl } = useInput<string>('');

  useEffect(() => {
    dispatch(
      updateInlineImagePayload({
        src: urlValue,
      }),
    );
  }, [dispatch, urlValue]);

  return (
    <Row gap="sm" css={{ width: '300px' }}>
      <Input id="imageUrl" label="Image URL" onChange={onChangeUrl} required fullWidth />
    </Row>
  );
};

export default ImageModalTabUrl;
