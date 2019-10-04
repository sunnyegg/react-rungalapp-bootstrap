import React, { Component } from 'react'
import axios from 'axios'
import rice from '../rice.jpg'
import cartempty from '../Assets/Img/cartempty.svg'

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            data: [],
            cart: [],
            search: '',
            sort: 'id',
            order: 'asc',
            page: '0',
        }
        this.addCart = this.addCart.bind(this)
    }

    async componentDidMount() {
        await this.getAll(this.state.search, this.state.sort, this.state.order, this.state.page)
    }

    getAll = async (search, sort, order, page) => {
      let querySearch, querySort, queryOrder, queryPage

      if (search) querySearch = `&search=${search}`
      else querySearch = ''

      if (sort && order) querySort = `?sort=${sort}&order=${order}`
      else querySort = ''

      if (page) queryPage = `&page=${page}`
      else queryPage = ''

      axios.get(`http://localhost:3333/api/v1/products${querySort}${querySearch}${queryPage}`)
      .then(result => {
          this.setState({data: result.data.data})
          // let page = []

          // const currentPage = Math.ceil(result.data.data / 5)

          // for (let i=0; i < currentPage; i++){
          //   page.push(i+1)
          // }
      })
      .catch(err => {
          console.log(err)
      })
    }


    getSearch = (e) => {
      e.preventDefault()
      let search = e.target.value

      this.setState({search})
      this.getAll(search, this.state.sort, this.state.order, this.state.page)
    }

    getSort = (e) => {
      e.preventDefault()
      let sort = e.target.value

      this.setState({sort})
      this.getAll(this.state.search, sort, this.state.order, this.state.page)
    }

    getOrder = (e) => {
      e.preventDefault()
      let order = e.target.value

      this.setState({order})
      this.getAll(this.state.search, this.state.sort, order, this.state.page)
    }
    getPage = (e) => {
      e.preventDefault()
      let page = e.target.value

      this.setState({page})
      this.getAll(this.state.search, this.state.sort, this.state.order, page)
    }
    // pagination = () => {
    //   const allPages = this.state.allPages
    //   const pageGo

    //   return(

    //   )
    // }

    addCart(data) {
      console.log(data)
      const exists = this.state.cart.find(({ id }) => id === data.id)
      if (exists) {
        window.alert('Product is already in the cart!')
      } else {
        data.count=1
        const cart = [...this.state.cart, data]
        this.setState({cart})
      }
    }

    addQty(data) {
      let cart = this.state.cart[data]
      cart.count += 1
      this.setState({cart: [cart]})
    }

    reduceQty(data) {
      let cart = this.state.cart[data]
      let allcart = this.state.cart
      if (cart.count > 1) {
        cart.count -= 1
        this.setState({
          cart: [cart]
        })
      } else {
        allcart.splice(data, 1)
        this.setState({cart: allcart})
      }
    }

    render() {
        return <>
          <nav className="navbar navbar-light bg-light fixed-top" >
            <a className="navbar-brand ml-5">Food Items</a>
            <form className="form-inline" style={{marginRight: 405}}>
              <input
                value={this.state.search}
                onChange={this.getSearch}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search" />
            </form>
          </nav>

          <div className="container-fluid mt-5" style={{backgroundColor: '#ecf0f1'}}>
            <div className='row'>
              <div className='col-sm-1'>

              </div>
              <div className='col-sm-7 border mt-3 mb-2 ml-1 mr-1' style={{backgroundColor: 'white'}}>
                <div className='row border-bottom'>
                  <div className="form-group col-sm-2" style={{marginTop: 10}}>
                    <label htmlFor="exampleFormControlSelect1">Sort By:</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={this.getSort}>
                      <option value='name'>Name</option>
                      <option value='price'>Price</option>
                      <option value='category'>Category</option>
                    </select>
                  </div>
                  <div className="form-group col-sm-2" style={{marginTop: 10}}>
                    <label htmlFor="exampleFormControlSelect1">Order:</label>
                    <select className="form-control" id="exampleFormControlSelect1" onChange={this.getOrder}>
                      <option value='asc'>Asc</option>
                      <option value='desc'>Desc</option>
                    </select>
                  </div>
                  <div className="form-group col-sm" style={{marginTop: 40}}>
                    <nav aria-label="Page navigation example">
                      {/* {this.getPage.map((item) => {
                        return ( */}
                          <ul className="pagination justify-content-end" onClick={this.getPage}>
                            <li className="page-item"><button className='page-link' value='1'>1</button></li>
                            <li className="page-item"><button className='page-link' value='2'>2</button></li>
                            <li className="page-item"><button className='page-link' value='3'>3</button></li>
                            <li className="page-item"><button className='page-link' value='4'>4</button></li>
                          </ul>
                        {/* )
                      })} */}
                    </nav>
                  </div>
                </div>
                <div className='row'>
                  {this.state.data.map((item, index) => {
                      return (
                        <div className='col-sm-4 mb-3'>
                          <div className="card" style={{width: 'auto', marginTop: 20}} key={index}>
                            <img
                              src={`http://localhost:3333/${item.image}`}
                              className="card-img-top"
                              alt={item.name} />
                            <div className="card-body">
                              <h5 className="card-title">
                                {item.name}
                              </h5>
                              <div className='row'>
                                <div className='col-sm-6'>
                                  <p>
                                    Rp. {item.price}
                                  </p>
                                </div>
                                <div className='col-sm-6'>
                                  <button className='btn btn-primary' onClick={(data) => this.addCart(item)}>Add to Cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
              </div>
              <div className='col-sm-3 border mt-3 mb-5 ml-5' style={{backgroundColor: 'white'}}>
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      {/* <img src={cartempty} /> */}
                      <h5 className='mt-2 text-center'>Cart {this.state.cart.length}</h5>
                        {this.state.cart.map((item, key) => {
                          return (
                            <div className="card ml-2 mx-auto" style={{width: 200, marginTop: 10}}>
                              <img
                                src={`http://localhost:3333/${item.image}`}
                                className="card-img-top"
                                alt={item.name} />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {item.name}
                                </h5>
                                <p>
                                  Rp. {item.price}
                                </p>

                                <div className='col-sm-12 text-center'>
                                  <div className="btn-group btn-group-sm" role="group">
                                    <button type="button" className="btn btn-secondary" onClick={() => {this.reduceQty(key)}}>-</button>
                                    <button type="button" className="btn btn-secondary">{item.count}</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => {this.addQty(key)}}>+</button>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          )
                        })}
                    </div>
                    
                  </div>
                  <div className='row mt-5 mx-auto border-top border-bottom'>
                    <div className='col-sm-12 mt-3'>
                      <h4 className='text-center'>Total: Rp. 50.000*</h4>
                      <p className='text-center'>*Belum termasuk ppn</p>
                    </div>                 
                  </div>
                  <div className='row mx-auto mt-3'>
                    <div className='col-sm-12'>
                      <button type="button" className="btn btn-primary w-100" style={{borderRadius: 0}}>Checkout</button>
                    </div>
                    <div className='col-sm-12'>
                      <button type="button" className="btn btn-danger w-100" style={{borderRadius: 0}}>Cancel</button>
                    </div>              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    }
}
