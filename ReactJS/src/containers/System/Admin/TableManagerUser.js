import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../store/actions";
import UserRedux from './UserRedux';

import MarkdownIt from 'markdown-it';
import MdEditor from "react-markdown-editor-lite";

import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Mardown it options */);

function handelEditChange({ html, text }) {
    console.log('handelEditChange', html, text);
}
class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

            usersRedux: []

        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handelEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        // console.log('check all users', this.props.listUsers)
        // console.log('check all state', this.props.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id='TableManagerUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handelEditUser(item)}
                                                className='btn-edit'
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <i className="fas fa-trash">
                                                </i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onchange={handelEditChange} />
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
