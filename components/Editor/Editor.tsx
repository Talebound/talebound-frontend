import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { RxCross1 } from 'react-icons/rx';
import { AiOutlineSend } from 'react-icons/ai';
import { RiDraftLine } from 'react-icons/ri';
import debounce from 'lodash.debounce';

import { LexicalEditor, EditorState } from 'lexical';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { MarkNode } from '@lexical/mark';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

import { EditorContainer, EditorInner, Placeholder } from './editorStyledComponents';
import ExampleTheme from './themes/EditorTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin/CodeHighlightPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin/AutoLinkPlugin';
import MarkdownPlugin from './plugins/MarkdownPlugin/MarkdownPlugin';
import { TableNode as NewTableNode } from './nodes/TableNode';
import { EMPTY_EDITOR_STATE } from './utils/emptyEditorState';

import { Button } from '../Button/Button';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';

const editorConfig: InitialConfigType = {
  // The editor theme
  theme: ExampleTheme,
  namespace: 'editor',

  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    NewTableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    MarkNode,
    HorizontalRuleNode,
  ],
};

export type EditorOnSaveAction = (
  _editorState: EditorState,
  _editor: LexicalEditor,
  _draft: boolean,
  _successAction?: () => void,
  _errorAction?: () => void,
  _settleAction?: () => void,
) => void;

enum EditorAction {
  IDLE = 0,
  SAVE = 1,
  SAVE_AND_PUBLISH = 2,
  SAVE_AND_KEEP_EDITING = 3,
  SAVE_AS_DRAFT = 4,
}

export enum PostViewType {
  POST = 0,
  EDIT = 1,
}

interface EditorProps {
  onChange?: (_editorState: EditorState, _editor: LexicalEditor) => void;
  hasRightToEdit?: boolean;
  defaultPostViewType?: PostViewType;
  editorState?: string;
  onSaveAction?: EditorOnSaveAction;
  actionLabel?: 'Save' | 'Post';
  draftable?: boolean;
  editable?: boolean;
  isDraft?: boolean;
  alreadyExists?: boolean;
  disabled?: boolean;
  // postView?: boolean;
  closeEditor?: () => void;
  loading?: boolean;
  error?: string;
  resetError?: () => void;
  debounceTime?: number;
  saveOnDebounce?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  hasRightToEdit = false,
  defaultPostViewType = PostViewType.POST,
  editorState,
  onSaveAction,
  actionLabel = 'Post',
  draftable,
  editable = true,
  isDraft = false,
  alreadyExists,
  disabled = false,
  closeEditor,
  loading,
  error,
  resetError,
  debounceTime = 0,
  saveOnDebounce,
}) => {
  const finalActionLabel = useMemo(
    () => (alreadyExists ? 'Save' : actionLabel),
    [actionLabel, alreadyExists],
  );
  const contentEditable = useMemo(() => <ContentEditable className="editor-input" />, []);
  const [lastSavedEditorState, setLastSavedEditorState] = useState<string | EditorState>(
    editorState ?? EMPTY_EDITOR_STATE,
  );

  const editorStateRef = useRef<EditorState>();
  const editorRef = useRef<LexicalEditor>();
  const placeholder = useMemo(() => <Placeholder>No content yet</Placeholder>, []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [contentSaved, setContentSaved] = useState(true);
  const [postViewType, setPostViewType] = useState(defaultPostViewType);
  const [actionInProgress, setActionInProgress] = useState<EditorAction>(EditorAction.IDLE);

  const initialConfig = useMemo(() => {
    return {
      ...editorConfig,
      editorState: lastSavedEditorState,
      editable: postViewType === PostViewType.EDIT,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //, editorState

  useEffect(() => {
    const postViewTypeToSet = !hasRightToEdit || !editable ? PostViewType.POST : postViewType;
    setPostViewType(postViewTypeToSet);

    editorRef.current?.setEditable(
      !disabled && hasRightToEdit && editable && postViewTypeToSet === PostViewType.EDIT,
    );
  }, [disabled, editable, hasRightToEdit, postViewType]);

  useEffect(() => {
    if (contentSaved) {
      const editorState = editorRef.current?.getEditorState();
      if (editorState) setLastSavedEditorState(editorState);
    }
  }, [contentSaved]);

  useEffect(() => {
    window.onbeforeunload = contentSaved
      ? null
      : (e: BeforeUnloadEvent) => {
          e.preventDefault();
          e.returnValue = '';

          if (editorStateRef.current && editorRef.current && onChange) {
            onChange(editorStateRef.current, editorRef.current);
          }
        };

    return () => {
      window.onbeforeunload = null;
    };
  }, [contentSaved, onChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((editorState: EditorState, editor: LexicalEditor) => {
      editorStateRef.current = editorState;
      editorRef.current = editor;
      if (onChange) onChange(editorState, editor);
      if (debounceTime > 0 && saveOnDebounce) {
        setContentSaved(true);
      }
    }, debounceTime),
    [onChange, debounceTime, saveOnDebounce],
  );

  const onChangeHandler = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (isInitialLoad) {
        editorStateRef.current = editorState;
        editorRef.current = editor;
        setIsInitialLoad(false);
        return;
      }

      // if (debounceTime > 0) setContentSaved(false);
      setContentSaved(false);
      onChangeHandlerDebounced(editorState, editor);
    },
    [isInitialLoad, onChangeHandlerDebounced],
  );

  const closeEditorHandler = useCallback(() => {
    if (closeEditor) closeEditor();
    setPostViewType(PostViewType.POST);
  }, [closeEditor]);

  const openEditorHandler = useCallback(() => {
    setPostViewType(PostViewType.EDIT);
  }, []);

  const discardChangesHandler = useCallback(() => {
    if (editorRef.current && !contentSaved) {
      editorRef.current?.setEditorState(
        typeof lastSavedEditorState === 'string'
          ? editorRef.current?.parseEditorState(lastSavedEditorState)
          : lastSavedEditorState,
      );
      setContentSaved(true);
    }
    closeEditorHandler();
    if (resetError) resetError();
  }, [closeEditorHandler, contentSaved, lastSavedEditorState, resetError]);

  const saveActionHandler = useCallback(() => {
    if (onSaveAction && editorStateRef.current && editorRef.current) {
      setActionInProgress(EditorAction.SAVE);
      onSaveAction(
        editorStateRef.current,
        editorRef.current,
        isDraft,
        () => {
          setContentSaved(true);
        },
        () => {
          /* no error action */
        },
        () => {
          closeEditorHandler();
          setActionInProgress(EditorAction.IDLE);
        },
      );
    }
  }, [closeEditorHandler, isDraft, onSaveAction]);

  const saveAndPublishActionHandler = useCallback(() => {
    if (onSaveAction && editorStateRef.current && editorRef.current) {
      setActionInProgress(EditorAction.SAVE_AND_PUBLISH);
      onSaveAction(
        editorStateRef.current,
        editorRef.current,
        false,
        () => {
          setContentSaved(true);
        },
        () => {
          /* no error action */
        },
        () => {
          closeEditorHandler();
          setActionInProgress(0);
        },
      );
    }
  }, [closeEditorHandler, onSaveAction]);

  const saveAndKeepEditingActionHandler = useCallback(() => {
    if (onSaveAction && editorStateRef.current && editorRef.current) {
      setActionInProgress(EditorAction.SAVE_AND_KEEP_EDITING);
      onSaveAction(
        editorStateRef.current,
        editorRef.current,
        isDraft,
        () => {
          setContentSaved(true);
        },
        () => {
          /* no error action */
        },
        () => {
          setActionInProgress(EditorAction.IDLE);
        },
      );
    }
  }, [isDraft, onSaveAction]);

  const saveDraftActionHandler = useCallback(() => {
    if (!draftable) return;
    if (onSaveAction && editorStateRef.current && editorRef.current) {
      setActionInProgress(EditorAction.SAVE_AS_DRAFT);
      onSaveAction(
        editorStateRef.current,
        editorRef.current,
        true,
        () => {
          setContentSaved(true);
        },
        () => {
          /* no error action */
        },
        () => {
          setActionInProgress(EditorAction.IDLE);
        },
      );
    }
  }, [onSaveAction, draftable]);

  return (
    <Col fullWidth gap="sm">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorContainer postView={postViewType === PostViewType.POST} loading={loading}>
          {postViewType === PostViewType.EDIT && <ToolbarPlugin />}
          <EditorInner postView={postViewType === PostViewType.POST}>
            <RichTextPlugin
              contentEditable={contentEditable}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeHandler} ignoreSelectionChange={true} />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <MarkdownPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
          </EditorInner>
        </EditorContainer>
      </LexicalComposer>
      <Col gap="sm">
        {postViewType === PostViewType.EDIT && (
          <Row gap="sm">
            {!contentSaved && (
              <>
                {draftable && isDraft && (
                  <Button
                    disabled={actionInProgress !== EditorAction.IDLE}
                    loading={actionInProgress === EditorAction.SAVE_AND_PUBLISH}
                    color="secondaryFill"
                    onClick={saveAndPublishActionHandler}
                  >
                    <Text>Save and publish</Text>
                    <AiOutlineSend size="0.8em" />
                  </Button>
                )}
                <Button
                  disabled={actionInProgress !== EditorAction.IDLE}
                  loading={actionInProgress === EditorAction.SAVE}
                  onClick={saveActionHandler}
                >
                  {finalActionLabel}
                </Button>
                <Button
                  disabled={actionInProgress !== EditorAction.IDLE}
                  loading={actionInProgress === EditorAction.SAVE_AND_KEEP_EDITING}
                  color="primaryOutline"
                  onClick={saveAndKeepEditingActionHandler}
                >
                  {finalActionLabel} and keep editing
                </Button>
                {draftable && !alreadyExists && (
                  <Button
                    disabled={actionInProgress !== EditorAction.IDLE}
                    loading={actionInProgress === EditorAction.SAVE_AS_DRAFT}
                    color="secondaryOutline"
                    onClick={saveDraftActionHandler}
                  >
                    <Text>Save as draft</Text>
                    <RiDraftLine />
                  </Button>
                )}
                <Button
                  disabled={actionInProgress !== EditorAction.IDLE}
                  color="dangerOutline"
                  onClick={discardChangesHandler}
                >
                  <Text>Discard</Text>
                  <RxCross1 size="0.8em" />
                </Button>
              </>
            )}
            {contentSaved && (
              <>
                {draftable && isDraft && (
                  <Button
                    disabled={actionInProgress !== EditorAction.IDLE}
                    loading={actionInProgress === EditorAction.SAVE_AND_PUBLISH}
                    color="secondaryFill"
                    onClick={saveAndPublishActionHandler}
                  >
                    <Text>Publish</Text>
                    <AiOutlineSend size="0.8em" />
                  </Button>
                )}
                <Button
                  disabled={actionInProgress !== EditorAction.IDLE}
                  color="dangerOutline"
                  onClick={closeEditorHandler}
                >
                  <Text>Close</Text>
                  <RxCross1 size="0.8em" />
                </Button>
              </>
            )}
          </Row>
        )}
        {postViewType === PostViewType.POST && hasRightToEdit && (
          <Row gap="sm">
            <Button
              disabled={actionInProgress !== EditorAction.IDLE}
              color="secondaryFill"
              onClick={openEditorHandler}
            >
              <Text>Edit</Text>
            </Button>
            {draftable && isDraft && (
              <Button
                disabled={actionInProgress !== EditorAction.IDLE}
                loading={actionInProgress === EditorAction.SAVE_AND_PUBLISH}
                color="secondaryFill"
                onClick={saveAndPublishActionHandler}
              >
                <Text>Publish</Text>
                <AiOutlineSend size="0.8em" />
              </Button>
            )}
          </Row>
        )}
        {error && (
          <Text color="danger">
            {error}{' '}
            {resetError && (
              <Button size="sm" color="ghost" onClick={resetError}>
                <RxCross1 size="0.8em" />
              </Button>
            )}
          </Text>
        )}
      </Col>
    </Col>
  );
};

export default Editor;
