import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '../components/Notification.js';

describe('Notification', () => {
  it('should display a message', () => {
    render(<Notification message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should not render anything if no message is provided', () => {
    const { container } = render(<Notification message="" />);
    expect(container.firstChild).toBeNull();
  });
});
