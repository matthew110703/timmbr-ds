'use client';

import * as React from 'react';
import type { panelSectionPadding } from './Panel.styles';

export type PanelPadding = keyof typeof panelSectionPadding;
export type PanelPlacement = 'inline' | 'left' | 'right';

export interface PanelContextValue {
  sectioned: boolean;
  padding: PanelPadding;
  collapsed: boolean;
  collapsible: boolean;
  shouldAnimate: boolean;
  panelId: string;
  placement: PanelPlacement;
  onToggleCollapse: () => void;
}

export const PanelContext = React.createContext<PanelContextValue>({
  sectioned: false,
  padding: 'default',
  collapsed: false,
  collapsible: false,
  shouldAnimate: true,
  panelId: '',
  placement: 'inline',
  onToggleCollapse: () => {},
});

export const usePanelContext = () => React.useContext(PanelContext);
