import React from 'react';
import { Mutation } from 'react-apollo';
import { PASS } from '../graphql/mutations';
import { AuthContextConsumer } from '../contexts/authContext';

const PlayerInformation = ({ player, playerTurnId }) => {
  const isTurn = player.id === playerTurnId;

  return (
    <div className="display__player-information">
      <div className="media">
        <div className="media-left">
          <figure className="image">
            <p className="title is-3">
              {player.color === 'black' ? '⚫️' : '⚪️'}
            </p>
          </figure>
        </div>
        <div className="media-content">
          <p className="title is-5">{player.user.username}</p>
          {isTurn && (
            <p className="subtitle is-6 has-text-grey-light">
              Your move
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Display = ({
  game,
  gameId,
  playerTurnId,
  gameIsOver,
  newGame,
  showCoordinates,
}) => {
  const playerIsColor = color => player => player.color === color;

  const playerBlack = game.players.find(playerIsColor('black'));
  const playerWhite = game.players.find(playerIsColor('white'));

  return (
    <section className="display">
      <div className="card">
        <div className="card-content display__content">
          <PlayerInformation
            player={playerBlack}
            playerTurnId={playerTurnId}
          />
          <br />
          <PlayerInformation
            player={playerWhite}
            playerTurnId={playerTurnId}
          />
        </div>
        <footer className="card-footer">
          <AuthContextConsumer>
            {({ token }) => {
              return (
                <Mutation mutation={PASS} context={{ token }}>
                  {(pass, { loading, error, data }) => {
                    return (
                      <section className="card-footer-item">
                        {error && <code>{error.message}</code>}
                        <button
                          type="button"
                          className={`button is-black is-outlined is-fullwidth ${loading &&
                            ' is-loading'}`}
                          onClick={() =>
                            pass({
                              variables: { gameId },
                            }).then(g => console.log('game', g))
                          }
                        >
                          Pass
                        </button>
                      </section>
                    );
                  }}
                </Mutation>
              );
            }}
          </AuthContextConsumer>
        </footer>
      </div>
    </section>
  );
};

export default Display;
