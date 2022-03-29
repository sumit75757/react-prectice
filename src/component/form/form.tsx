import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import apis from '../../service/api.service';


export class Forms extends Component<any, any, any>  {
    constructor(props: any) {
        super(props);
        this.state = {
            userId: '',
            id: '',
            title: '',
            body: ''
        }
        this.getform = this.getform.bind(this);
        this.submitval = this.submitval.bind(this);
    }

    getform(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);

        this.setState({ [name]: value })
        console.log(this.state);
    }

    submitval() {
        console.log(this.state);
        apis.post('posts/', this.state).then(res => {
            this.setState({restoLists: res.data})
        })
    }
    
    render() {
        return (
            <>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label"></label>
                    <input type="text" name="id" id="" onChange={this.getform} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Help text</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label"></label>
                    <input type="text" name="userId" id="" onChange={this.getform} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Help text</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label"></label>
                    <input type="text" name="title" id="" onChange={this.getform} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Help text</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label"></label>
                    <input type="text" name="body" id="" onChange={this.getform} className="form-control" placeholder="" aria-describedby="helpId" />
                    <small id="helpId" className="text-muted">Help text</small>
                </div>
                <button className='btn btn-primary m-5' type="submit" onClick={this.submitval}>
                    Submit
                </button>
            </>
        )
    }
}

export default Forms