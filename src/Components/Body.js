import React, { Component }  from 'react'
import '../Assets/css/bootstrap.min.css'
import rice from '../rice.jpg'


export default class Body extends Component {
  render(){
    return(
      <div className="card" style={{width: '18rem'}}>
        <img
          src={rice}
          className="card-img-top"
          alt='nama' />
        <div className="card-body">
          <h5 className="card-title">
            Card title
          </h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    )
  }
}
