import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameControl from '../components/GameControl.js';

describe('GameControl', () => {
  it('should display the current player', () => {
    render(<GameControl currentPlayer="X" />);
    expect(screen.getByText('Current Player: X')).toBeInTheDocument();
  });

  it('should call onStartNewGame when the button is clicked', () => {
    const mockStartNewGame = jest.fn();
    render(<GameControl onStartNewGame={mockStartNewGame} currentPlayer="X" />);

    fireEvent.click(screen.getByText('Start New Game'));
    expect(mockStartNewGame).toHaveBeenCalled();
  });
});
