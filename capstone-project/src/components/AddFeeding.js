import React, { useState } from 'react'
import Axios from 'axios';

class AddFeeding extends React.Component {
    state = {
        dog: '',
        user: '',
        date: '',
        dogList: [],
        userList: []
    };

    addData = (e) => {
        e.preventDefault();
        if (this.state.dog ==='' || this.state.user ==='') {
            alert('All fields mandatory');
            return;
        }
        const body = { data: this.state}
        console.log(body)
        let date = new Date(); 
        let displayDate = date.toLocaleString()

        this.setState({date: displayDate.toString()}, () => {
            console.log(this.state)
            
            Axios.post('http://localhost:3001/feeding', {
                dog: this.state.dog,
                user: this.state.user,
                date: this.state.date
            },
            console.log('hi')
            )
            .then((res) => {
                console.log("Server response: ", res);
            })
            .catch((err) => {
                console.log("Server respondend with error: ", err);
            })
            this.props.addFeedingHandler(this.state)
            console.log(this.state.dog)
            
            this.setState({ dog: '', user: ''});
        })
    }
   
   
    render() {
        return (
            <div className='feeding'>
                    <h1>Feeding</h1>
                <form className='feeding-form' >
                    <h3>Add Walk</h3>
                    <div className='field'>
                    <label>Dog:</label>
                        <input 
                        type='text'
                        name='dog'
                        value={this.state.dog}
                        onChange={(e) => this.setState({dog: e.target.value})}         
                        /><br />
                    <label>User:</label>
                    <input 
                        type='text'
                        name='user'
                        value={this.state.user}
                        onChange={(e) => this.setState({user: e.target.value})}          
                        /><br />
                    <button onClick={this.addData}>Add Feeding</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFeeding;
