import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stat, StatLabel, StatValue, StatHelpText, StatIndicator } from './Stat';

describe('Stat Component', () => {
  it('renders metric label, value and indicator', () => {
    render(
      <Stat>
        <StatLabel>Active Jobs</StatLabel>
        <StatValue>42</StatValue>
        <StatHelpText>
          <StatIndicator type="increase">+5%</StatIndicator>
        </StatHelpText>
      </Stat>
    );

    expect(screen.getByText('Active Jobs')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('+5%')).toBeInTheDocument();
  });
});
