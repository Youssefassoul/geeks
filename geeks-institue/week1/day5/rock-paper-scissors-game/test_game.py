from game import Game


def test_game_logic():
    """Test the game logic without user input."""
    game = Game()
    
    # Test winning combinations
    assert game.get_game_result('rock', 'scissors') == 'win'
    assert game.get_game_result('paper', 'rock') == 'win'
    assert game.get_game_result('scissors', 'paper') == 'win'
    
    # Test losing combinations
    assert game.get_game_result('rock', 'paper') == 'loss'
    assert game.get_game_result('paper', 'scissors') == 'loss'
    assert game.get_game_result('scissors', 'rock') == 'loss'
    
    # Test draws
    assert game.get_game_result('rock', 'rock') == 'draw'
    assert game.get_game_result('paper', 'paper') == 'draw'
    assert game.get_game_result('scissors', 'scissors') == 'draw'
    
    print("All game logic tests passed!")


if __name__ == "__main__":
    test_game_logic()
