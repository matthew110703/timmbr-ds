'use client';

import * as React from 'react';
import type { RteContextValue } from './RichTextEditor.types';

const RteContext = React.createContext<RteContextValue>({
  editor: null,
  shouldAnimate: true,
  disabled: false,
  readOnly: false,
});

export { RteContext };

export function useRteContext(): RteContextValue {
  return React.useContext(RteContext);
}
