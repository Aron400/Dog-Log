import React, { useState } from 'react'

class AddFeeding extends React.Component {
    state = {
        dog: '',
        user: '',
        date: ''
    };
   
    add = (e) => {
        e.preventDefault();
        if (this.state.dog ==='' || this.state.user ==='') {
            alert('All fields mandatory');
            return;
        }
        let date = new Date(); 
        let displayDate = date.toLocaleString()
        console.log(date)               
        this.setState({date: displayDate.toString()}, () => {
            this.props.addFeedingHandler(this.state);
            this.setState({ dog: '', user: ''});
        }) 
    }
    
    render() {
        return (
            <div className='feeding'>
                    <h1>Feeding</h1>
                <form className='feeding-form' onSubmit={this.add}>
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
                    <button>Add Feeding</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddFeeding;
