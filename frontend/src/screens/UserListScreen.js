import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()
    

    return (
        <div>
            
        </div>
    )
}

export default UserListScreen
