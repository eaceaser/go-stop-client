import React, { Component } from 'react';
import { render } from 'react-dom';
import * as R from 'ramda';
import { BOARD } from '../utils/constants';
import Loading from '../components/loading';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Board from './board';
import Display from './display';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stones: []
    }
  }

  handleAddStone(addStoneFn) {
    const playStone = (x, y) => {
      addStoneFn({ variables: { gameId: this.props.id, x, y } });
    };
    return playStone;
  }

  renderBoard(game) {
    return (
      <Mutation
        mutation={ADD_STONE}
      >
        {(addStone, { loading, error, data }) => {
          return <Board game={game} addStone={this.handleAddStone(addStone)} error={error} />
        }}
      </Mutation>
    );
  }

  renderDisplay(game) {
    return (
      <Display
        turn={game.playerTurnId}
        gameId={game.id}
        gameIsOver={game.status == "complete"}
        pass={this.handlePass}
        newGame={this.handleNewGame}
        game={game}
      />
    );
  }

  renderGame(game) {
    return (
      <section className="game columns">
        <div className="column is-two-thirds">
          {this.renderBoard(game)}
        </div>
        <div className="column is-one-third">
          {this.renderDisplay(game)}
        </div>
      </section>
    );
  }

  render() {
    const id = this.props.id;
    return (
      <Query query={GET_GAME} variables={{ id }} pollInterval={500} partialRefetch={true}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>No game loaded</p>;

          return this.renderGame(data.game);
        }}
      </Query>
    );
  }
}

const ADD_STONE = gql`
  mutation AddStone($gameId: ID!, $x: Int!, $y: Int!) {
    addStone(gameId: $gameId, x: $x, y: $y) {
      id
      x
      y
      color
      game {
        id
        status
        playerTurnId
        players {
          id
          color
          user {
            id
            username
          }
        }
        boardSize
        stones {
          id
          x
          y
          color
        }
      }
    }
  }
`;

const GET_GAME = gql`
  query Game($id: ID!) {
    game(id: $id) {
      id
      status
      playerTurnId
      players {
        id
        color
        user {
          id
          username
        }
      }
      boardSize
      stones {
        id
        x
        y
        color
      }
    }
  }
`;
