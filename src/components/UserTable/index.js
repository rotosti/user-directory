import React from 'react';
import API from '../../utils/api';

class UserTable extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        console.log(this.getUserData());
    }

    getUserData = () => {
        API.getUsers()
            .then((resultData) => {
                this.setState({ users: resultData.data.results});
            })
    }

    render() {
        return (
            <table class="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">User Name</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.users.map(item => (
                        <tr>
                            <td><img src={`${item.picture.medium}`} alt=""/></td>
                            <td>{item.name.first}</td>
                            <td>{item.name.last}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.login.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default UserTable;