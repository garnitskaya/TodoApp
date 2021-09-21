import { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {

    render() {
        return (
            <div className="item-add-form">
                <button
                    onClick={() => this.props.onItemAdded('Hello')}
                    className="btn btn-outline-secondary">
                    Add Item
                </button>
            </div>
        );
    };
};