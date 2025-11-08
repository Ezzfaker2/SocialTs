import React from "react";

export class ProfileStatus extends React.Component {

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value })
    }
    state = {
        editMode: false,
        status: this.props.status
    }
    toggleEditModeTrue = () => {
        this.setState({editMode: true});

    }
    toggleEditModeFalse = () => {
        this.setState({editMode: false});
        this.props.userUpdateStatusThunk(this.state.status);
    }


componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !==this.props.status) {this.setState({status: this.props.status})}

}


    render() {

        return <div> {!this.state.editMode &&
            <div><span onDoubleClick={this.toggleEditModeTrue}
            >{this.props.status}</span></div>
        }
            {this.state.editMode &&
                <div><input autoFocus={true} onBlur={this.toggleEditModeFalse} onChange={this.onStatusChange}
                            value={this.state.status}/></div>

            }</div>


    }
}


