import { Component } from "react";
import "./search-panel.css";


export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value; // текущее значение input 
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render() {
        return (
            <input className="form-control search-input "
                placeholder="type to search"
                value={this.state.term}
                onChange={this.onSearchChange} />
        )
    };
};