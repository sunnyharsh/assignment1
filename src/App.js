import React from 'react'
import "./App.css"
import axios from 'axios';
import DisplayData from "./Components/DispalyData";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      country:[]
    }
  }
  async componentDidMount(){ 
    let countryArr=[]
    let countries=[]
    await axios.get('https://api.first.org/data/v1/countries')
      .then(function (response) {
        countryArr=Object.values(response.data.data)
        countryArr.map(obj=>{
          countries.push(obj.country)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      this.setState({
        country:countries
      })
    }
    render(){
    return (
      <div className="App">
        {
          this.state.country.length > 0 &&
            <DisplayData country={this.state.country} editable={true}/>
        }
        {
          this.state.country.length > 0 &&
            <DisplayData country={this.state.country} editable={false}/>
        }
      </div>
    );
  }
}

export default App;
