import React, { Component } from 'react'
import Button from "./Button";

class AddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:"",
            name:"",
            email:"",
            gender:"",
            dob:"",
            country:"",
            city:""
         };
    }
    handleChange=({target})=>{
        this.setState({
            [target.name]:target.value
        })
    }
    handleSubmit=()=>{
        this.props.addData(this.state)
    }
    render() {
        const fields=[
            {label:"Id", name:"id" , placeholder:" id"},
            {label:"Name", name:"name" , placeholder:"Name"},
            {label:"Email", name:"email" , placeholder:"Email"},
            {label:"Gender", name:"gender" , placeholder:"Gender"},
            {label:"Dob", name:"dob" , placeholder:"Dob (dd-mm-yyyy)"},
            {label:"Country", name:"country" , placeholder:"Country"},
            {label:"City", name:"city" , placeholder:"City"}
        ]
        return (
            <div className="modal fade show" id="exampleModal" style={{display:"block"}} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Form</h5>
                    <button  className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.showForm}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                    {
                        fields && fields.map((obj,index)=>(
                            <div className="form-group" key={index}>
                                <label >{obj.label}</label>
                                <input 
                                    onChange={this.handleChange}
                                    type="text" 
                                    name={obj.name} 
                                    className="form-control" 
                                    placeholder={`Enter your ${obj.placeholder}`}
                                />
                            </div>
                        ))
                }
                </form>
                </div>
                <div className="modal-footer">
                    <Button className="secondary" onClick={this.props.showForm} BtnValue="Close" />
                    <Button className="primary" onClick={this.handleSubmit} BtnValue="Submit"/>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default AddComponent;