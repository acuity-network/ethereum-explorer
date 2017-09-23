import React from 'react';

export default class Settings extends React.Component {

    constructor() {

        super();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setURI = this.setURI.bind(this);

    }

    handleInputChange(event) {

        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        this.setState({
            [name]: value
        });

    }

    setURI(ev) {

        ev.preventDefault();


    }

    render() {

        return <div className="settings-page">

            <h3>Connection settings</h3>

            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

                <div className="form-group">


                </div>

            </div>

        </div>

    }

}