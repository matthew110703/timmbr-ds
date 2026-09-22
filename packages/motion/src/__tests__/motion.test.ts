import { describe, it, expect } from 'vitest';
import {
  transitions,
  getTransition,
  fadeVariants,
  slideVariants,
  scaleVariants,
  collapseVariants,
  hoverGestures,
  tapGestures,
} from '../index';

describe('@timmbr/motion Primitives', () => {
  it('exports valid timing and physics transitions', () => {
    expect(transitions.instant.duration).toBe(0);
    expect(transitions.fast.duration).toBe(0.15);
    expect(transitions.normal.duration).toBe(0.25);
    expect(transitions.slow.duration).toBe(0.4);
    expect(transitions.spring.type).toBe('spring');
  });

  it('resolves named transitions via getTransition helper', () => {
    expect(getTransition('fast')).toBe(transitions.fast);
    expect(getTransition('spring')).toBe(transitions.spring);
    // @ts-expect-error testing fallback for invalid transition key
    expect(getTransition('unknown')).toBe(transitions.normal);
  });

  it('exports well-formed entrance and exit variants', () => {
    expect(fadeVariants.hidden.opacity).toBe(0);
    expect(fadeVariants.visible.opacity).toBe(1);

    expect(slideVariants.up.hidden.y).toBe(16);
    expect(slideVariants.down.hidden.y).toBe(-16);

    expect(scaleVariants.hidden.scale).toBe(0.95);
    expect(scaleVariants.visible.scale).toBe(1);

    expect(collapseVariants.hidden.height).toBe(0);
  });

  it('exports interactive gesture configs', () => {
    expect(hoverGestures.lift.y).toBe(-3);
    expect(tapGestures.compress.scale).toBe(0.97);
  });
});
