import React from 'react';

/**
 * Displays a button styled as a submit button.
 */
export default class SubmitButton extends React.Component {
    /**
     * Initializes this.
     *
     * @param {*}      props        Settings.
     * @param {string} props.label  User-friendly label that will be shown on the button.
     */
    constructor(props) {
        super(props);

        if (props.label == null) {
            throw new Error("label is required.");
        }

        this.state = {
            theme: props.theme === "primary" ? "btn-primary"
                   : props.theme === "warning" ? "btn-warning"
                   : "btn-primary"
        };
    }

    render() {
        return (
            <button type="submit" className={`btn btn-submit ${this.state.theme}`}>{this.props.label}</button>
        )
    }
}

