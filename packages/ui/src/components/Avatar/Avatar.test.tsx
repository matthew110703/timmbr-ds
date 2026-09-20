import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  it('renders avatar with initials fallback', () => {
    render(<Avatar initials="TB" />);
    expect(screen.getByText('TB')).toBeInTheDocument();
    expect(screen.getByTestId('timmbr-avatar')).toHaveAttribute('data-slot', 'avatar');
  });

  it('renders with status indicator', () => {
    render(<Avatar initials="ON" status="online" />);
    expect(screen.getByLabelText('Status: online')).toBeInTheDocument();
  });

  it('accepts custom style and className', () => {
    render(
      <Avatar
        initials="CS"
        className="custom-avatar-class"
        style={{ border: '2px solid red' }}
      />
    );
    const avatar = screen.getByTestId('timmbr-avatar');
    expect(avatar).toHaveClass('custom-avatar-class');
  });
});
