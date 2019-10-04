import React, { Component } from 'react'
import rice from '../rice.jpg'


export default class Sidebar extends Component {
  render(){
    return(
      <div className='col'>
        <div className="card" style={{width: 200, marginTop: 10}}>
          <img
            src={rice}
            className="card-img-top"
            alt='rice' />
          <div className="card-body">
            <h5 className="card-title">
              Tempe
            </h5>
            <p>
              Rp. 1000
            </p>
          </div>
        </div>
      </div> 
    )
  }
}