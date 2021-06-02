import React from 'react';
import API from '../../utils/api';

class UserTable extends React.Component {

    state = {
        users: [],
        filteredUsers: [],
        search: '',
        sortBy: '',
        direction: ''
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        API.getUsers()
            .then((resultData) => {
                this.setState({ users: resultData.data.results, 
                                filteredUsers: resultData.data.results});
            })
    }

    handleOnChange = event => {
        this.setState({search: event.target.value})
        this.searchEmployee(event.target.value.toLowerCase());
    }

    handleSortClick = event => {
        let clickedLocation = event.target.id;

        if (clickedLocation === this.state.sortBy) {
            if (this.state.direction === '' || this.state.direction === 'asc') {
                this.setState({direction: 'desc'});
            } else {
                this.setState({direction: 'asc'});
            }
        } else {
            this.setState({sortBy: clickedLocation, direction: 'asc'})
        }

        switch (clickedLocation) {
            case 'first': 
                if (this.state.direction === 'asc') {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.name.first > b.name.first) return 1;
                            if (a.name.first < b.name.first) return -1;
                            return 0;
                        })
                    })
                } else {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.name.first > b.name.first) return -1;
                            if (a.name.first < b.name.first) return 1;
                            return 0;
                        })
                    })
                }
                break;
            case 'last': 
                if (this.state.direction === 'asc') {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.name.last > b.name.last) return 1;
                            if (a.name.last < b.name.last) return -1;
                            return 0;
                        })
                    })
                } else {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.name.last > b.name.last) return -1;
                            if (a.name.last < b.name.last) return 1;
                            return 0;
                        })
                    })
                }
                break;
            case 'email': 
                if (this.state.direction === 'asc') {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.email > b.email) return 1;
                            if (a.email < b.email) return -1;
                            return 0;
                        })
                    })
                } else {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.email > b.email) return -1;
                            if (a.email < b.email) return 1;
                            return 0;
                        })
                    })
                }
                break;
            case 'phone': 
                if (this.state.direction === 'asc') {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.phone.replace(/[()-/s]/gi, "") > b.phone.replace(/[()-/s]/gi, "")) return 1;
                            if (a.phone.replace(/[()-/s]/gi, "") < b.phone.replace(/[()-/s]/gi, "")) return -1;
                            return 0;
                        })
                    })
                } else {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.phone.replace(/[()-/s]/gi, "") > b.phone.replace(/[()-/s]/gi, "")) return -1;
                            if (a.phone.replace(/[()-/s]/gi, "") < b.phone.replace(/[()-/s]/gi, "")) return 1;
                            return 0;
                        })
                    })
                }
                break;
            case 'username': 
                if (this.state.direction === 'asc') {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.login.username > b.login.username) return 1;
                            if (a.login.username < b.login.username) return -1;
                            return 0;
                        })
                    })
                } else {
                    this.setState({
                        filteredUsers: this.state.filteredUsers.sort((a,b) => {
                            if (a.login.username > b.login.username) return -1;
                            if (a.login.username < b.login.username) return 1;
                            return 0;
                        })
                    })
                }
                break;
            default: 
                return;
        }
    }

    searchEmployee = (search) => {
        if (search) {
            this.setState({
                filteredUsers: this.state.filteredUsers.filter((user) => {
                    return (
                        user.name.first.toLowerCase().includes(search) ||
                        user.name.last.toLowerCase().includes(search) ||
                        user.email.toLowerCase().includes(search) ||
                        user.login.username.toLowerCase().includes(search) ||
                        user.phone.includes(search) ||
                        user.phone.replace(/[()-/s]/gi, "").includes(search)
                    )
                })
            })
        } else {
            this.setState({filteredUsers: this.state.users})
        }
    }

    render() {
        return (
            <>
            <div className="container p-3">
                <input onChange={this.handleOnChange} name='search' type="text" placeholder='Search..' className="text-centered" />
            </div>
            
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col" id='first' onClick={this.handleSortClick}>First Name</th>
                        <th scope="col" id='last' onClick={this.handleSortClick}>Last Name</th>
                        <th scope="col" id='email' onClick={this.handleSortClick}>Email</th>
                        <th scope="col" id='phone' onClick={this.handleSortClick}>Phone</th>
                        <th scope="col" id='username' onClick={this.handleSortClick}>User Name</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.filteredUsers.map(item => (
                        <tr>
                            <td><img src={`${item.picture.medium}`} alt="a person"/></td>
                            <td>{item.name.first}</td>
                            <td>{item.name.last}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.login.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        )
    }
}

export default UserTable;