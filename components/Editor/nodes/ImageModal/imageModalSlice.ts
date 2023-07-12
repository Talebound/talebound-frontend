import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InlineImagePayload } from '../InlineImageNode';

export interface ImageModalSliceState {
  inlineImagePayload: Omit<InlineImagePayload, 'caption'>;
}

const initialState: ImageModalSliceState = {
  inlineImagePayload: {
    altText: '',
    src: '',
  },
};

export const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    resetInlineImagePayload: (state) => {
      state.inlineImagePayload = initialState.inlineImagePayload;
    },
    updateInlineImagePayload: (state, action: PayloadAction<Partial<InlineImagePayload>>) => {
      state.inlineImagePayload = {
        ...state.inlineImagePayload,
        ...action.payload,
      };
    },
  },
});

export const { resetInlineImagePayload, updateInlineImagePayload } = imageModalSlice.actions;

export const imageModalReducer = imageModalSlice.reducer;
