import React from 'react';

/**
 * Displays an Input type=text HTML element with label and wrapping in a Bootstrap form-group.
 */
export default class TextField extends React.Component {
    /**
     * Initializes this. The below fields are required. Any other provided properties will be passed directly
     * to the HTML control.
     *
     * @param {*}      props        Settings.
     * @param {string} props.id     HTML ID of this element.
     * @param {string} props.label  User-friendly message to be used as the label of the text field.
     */
    constructor(props) {
        super(props);

        if (props.id === null) {
            throw new Error("id is required.");
        }

        if (props.label == null) {
            throw new Error("label is required.");
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}:</label>
                <input type="text" className="form-control"
                          {...this.props}
                />
            </div>
        )
    }
}
