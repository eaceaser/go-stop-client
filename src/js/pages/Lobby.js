// The default screen a logged in player sees

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Loading from '../components/loading';
import CreateGameModal from '../components/createGameModal';
import { Link } from 'react-router-dom';

import Input from '../components/input';

export default class LobbyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createGameModalIsOpen: false,
    };

    this.toggleCreateGameModal = this.toggleCreateGameModal.bind(this);
  }

  toggleCreateGameModal() {
    this.setState({ createGameModalIsOpen: !this.state.createGameModalIsOpen });
  }

  createLobbyRow(game) {
    return (
      <tr key={game.id}>
        <td>
          <Link className="button is-outlined" to={`/game/${game.id}`}>
            Join
          </Link>
        </td>
        <td>{game.id}</td>
        <td>{game.players[0].user.username}</td>
        <td>{game.players[1].user.username}</td>
      </tr>
    );
  }

  createLobbyTable(data) {
    return (
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th> </th>
            <th>Game</th>
            <th>⚫️ Player</th>
            <th>⚪️ Player</th>
          </tr>
        </thead>
        <tbody>{data.games.map(this.createLobbyRow)}</tbody>
      </table>
    );
  }

  render() {
    return (
      <section className="page page--home">
        <div className="hero hero--home">
          <div className="hero-body">
            <h1 className="title is-1">Play</h1>
          </div>
        </div>

        <CreateGameModal
          createGameModalIsOpen={this.state.createGameModalIsOpen}
          toggleCreateGameModal={this.toggleCreateGameModal}
        >
          <p>Enter your opponent’s user ID</p>
          <Input name="opponentId" inputType="text" placeholder="1738" />
        </CreateGameModal>

        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <h4 className="title is-4">New game</h4>
            <p className="subtitle has-text-grey">Choose an opponent</p>
            <button
              onClick={this.toggleCreateGameModal}
              className="button is-black is-outlined"
            >
              Create game
            </button>
          </div>
          <div className="column is-three-quarters">
            <h4 className="title is-4">Current games</h4>
            <p className="subtitle has-text-grey">Join an existing game</p>
            <Query query={GET_GAMES}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />;
                if (error) return <p>Error!!!</p>;
                return this.createLobbyTable(data);
              }}
            </Query>
          </div>
        </div>
      </section>
    );
  }
}

const GET_GAMES = gql`
  {
    games {
      id
      status
      players {
        id
        user {
          id
          username
        }
      }
    }
  }
`;
