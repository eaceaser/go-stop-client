// The default page an unregistered user sees

import React, {Component} from 'react';

export default class HomePage extends React.Component {
    render() {
        return (
            <section className="page page--home">
                <div className="hero hero--home">
                    <div className="hero-body">
                        <p className="title">GoStop</p>
                        <p className="subtitle">I'm the home page</p>
                    </div>
                </div>
            </section>
        );
    }
}