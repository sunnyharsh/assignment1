import React, {  useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GenderCellRenderer from "./GenderCellRenderer";
import AddComponent from "./AddComponent";
import Button from "./Button";


class DisplayData extends React.Component {
    constructor(props){
        super(props);
        this.state={
            frameworkComponents: { genderCellRenderer: GenderCellRenderer },
            columnDefs:[
                {headerName:'Id', field:'id', checkboxSelection:true,
                cellStyle: params => !params.data.id ? { backgroundColor: 'red' } : null},

                {headerName:'Name', field:'name',
                cellStyle: params => !params.data.name ? { backgroundColor: 'red' } : 
                params.data.name.length < 2 ? { backgroundColor: 'yellow' } : null},

                {headerName:'Email', field:'email',
                cellStyle: params => !params.data.email ? { backgroundColor: 'red' } : 
                params.data.email.length < 2 || 
                !this.validateEmail(params.data.email) ? { backgroundColor: 'yellow' } :null},

                {headerName:'Gender', field:'gender',
                cellRenderer: 'genderCellRenderer',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    values: ['Male', 'Female'],
                    cellRenderer: 'genderCellRenderer',
                  },
                cellStyle: params => !params.data.gender ? { backgroundColor: 'red' } : 
                params.data.gender.length < 2 ? { backgroundColor: 'yellow' } : null},

                {headerName:'DOB', field:'dob',
                cellStyle: params => !params.data.dob ? { backgroundColor: 'red' } : 
                params.data.dob.length < 2 ? { backgroundColor: 'yellow' } : null},

                {headerName:'Country', field:'country',
                cellRenderer: 'genderCellRenderer',
                cellEditor: 'agRichSelectCellEditor',
                cellEditorParams: {
                    values: this.props.country,
                    cellRenderer: 'genderCellRenderer',
                },
                cellStyle: params => !params.data.country ? { backgroundColor: 'red' } : 
                params.data.country.length < 2 ? { backgroundColor: 'yellow' } : null},

                {headerName:'City', field:'city',
                cellStyle: params => !params.data.city ? { backgroundColor: 'red' } :
                params.data.city.length < 2 ? { backgroundColor: 'yellow' } : null},

                {headerName:'', field:'',
                    cellRendererFramework:(params)=>this.props.editable  && <div>
                        <i className="fa fa-trash" aria-hidden="true" onClick={()=>this.deleteRow(params)}></i>
                    </div>
                }
            ],
            rowData:[
                { id: 1, name: "suny", email: 'Sunnyharsh@gmail.com', gender:'male', dob:'19-01-1194',country:'africa', city:'vaishali'  },
            ],
            updatedData:[],
            isModel:false,
            nonEditableTableData:[]
        }
    }
    componentDidMount(){
        if(this.fetchData().length > 0 ){
            this.setState({
                rowData: this.fetchData(),
                nonEditableTableData: this.fetchData()
            })
        }else{
            this.saveData()
        }
    }
    saveData=()=>{
        if(window.localStorage){
            localStorage.setItem('data', JSON.stringify(this.state.rowData));
            this.setState(prevState=>{
                return{
                    rowData:prevState.rowData
                }
            })
        }
    }
    fetchData=()=>{
        if(window.localStorage){
            let data=localStorage.getItem('data')
            return JSON.parse(data);
        }
    }
    validateEmail=(email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    deleteNononSelected=()=>{
        const selctedNodes=this.gridApi.getSelectedNodes();
        const selectedDate=selctedNodes.map(nodes=>nodes.data);
        let newrowData=this.state.rowData.filter(obj=>{
            return selectedDate.find(data=>{
                return obj.id == data.id;
            })
        })
        this.setState({
            rowData:newrowData
        },()=>{
            this.saveData()
        })
    }
    deleteSelected=()=>{
        const selctedNodes=this.gridApi.getSelectedNodes();
        const selectedDate=selctedNodes.map(nodes=>nodes.data);
        let newrowData=this.state.rowData.filter(obj=>{
            return !selectedDate.find(data=>{
                return obj.id == data.id;
            })
        })
        this.setState({
            rowData:newrowData
        },()=>{
            this.saveData()
        })
    }
    deleteRow=(params)=>{
        let newrowData=this.state.rowData.filter(obj=> obj.id != params.data.id);
        this.setState({
            rowData:newrowData
        },()=>{
            this.saveData()
        })
       
    }
    onCellValueChanged = (params) => {
        let data=this.fetchData();
        let indexNum=null;
        let newRowData=data.filter((obj,index)=> {
            indexNum=index;
            return obj.id != params.data.id
        })
        newRowData[indexNum]=params.data
        this.setState({
            rowData:newRowData
        })
        this.saveData()
    }
    showForm=()=>{
        this.setState(prevState=>{
            return {
                isModel:!prevState.isModel
            }
        })
    }
    addData=(data)=>{
        let localData=[]
        localData.push(data)
        this.setState(prevState=>{
            return{
                rowData:[...prevState.rowData , ...localData]
            }
        },()=>{
            this.showForm()
            this.saveData()
        })
    }
   render(){
    return (
        <div className="ag-theme-alpine" style={{ height: 270, width: "100%" }}>
            <Button className="primary" onClick={this.showForm} BtnValue="showForm"/>
            <Button className="danger" onClick={this.deleteSelected} BtnValue="Delete Selected Rows"/>
            <Button className="danger" onClick={this.deleteNononSelected} BtnValue="Delete Non Selected Rows"/>
            <AgGridReact
                defaultColDef={{
                    width: 180,
                    editable: this.props.editable,
                    resizable: true,
                }}
                rowSelection="multiple"
                columnDefs={this.state.columnDefs}
                rowData={this.props.editable ? this.state.rowData : this.state.nonEditableTableData}
                onGridReady={params=>this.gridApi=params.api}
                enableCellChangeFlash={true}
                onCellValueChanged={this.onCellValueChanged.bind(this)}
                frameworkComponents={this.state.frameworkComponents}
                >
            </AgGridReact>
            {this.state.isModel && <AddComponent showForm={this.showForm} addData={this.addData}/>}
        </div>
    )
   }
}
export default DisplayData;