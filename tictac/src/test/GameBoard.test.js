import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameBoard from '../components/GameBoard.js';

describe('GameBoard', () => {
    it('should render 9 cells', () => {
      const board = Array(9).fill(null);
      render(<GameBoard board={board} onMakeMove={() => {}} />);
  
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(9);
    });
  
    it('should call onMakeMove when a cell is clicked', () => {
      const mockOnMakeMove = jest.fn();
      const board = Array(9).fill(null);
      render(<GameBoard board={board} onMakeMove={mockOnMakeMove} />);
  
      fireEvent.click(screen.getAllByRole('button')[0]);
      expect(mockOnMakeMove).toHaveBeenCalledWith(0);
    });
  });