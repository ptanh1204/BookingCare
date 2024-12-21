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


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handelEditChange({ html, text }) {
        console.log('handelEditChange', html, text);
    }
    render() {
        // console.log('check all users', this.props.listUsers)
        // console.log('check all state', this.props.usersRedux)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onchange={() => this.handelEditChange} />
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
