import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import convertRupiah from "rupiah-format";
import moment from "moment";

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  CardTitle,
  CardText,
  Table
} from "reactstrap";

import Axios from "axios";

export default class RevenueChart extends Component {
  constructor(props) {
    super();

    this.state = {
      history: [],
      dailyIncome: [],
      weeklyIncome: [],
      monthlyIncome: [],
      yearlyIncome: [],
      data: {}
    };

    this.handleChart = this.handleChart.bind(this);
  }

  componentDidMount() {
    this.getHistory();
    this.getDailyIncome();
    this.getWeeklyIncome();
    this.getMonthlyIncome();
    this.getYearlyIncome();
    this.drawChart();
  }

  getHistory() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/history`)
      .then(result => {
        this.setState({ history: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDailyIncome() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/history/daily`)
      .then(result => {
        this.setState({ dailyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getWeeklyIncome() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/history/weekly`)
      .then(result => {
        this.setState({ weeklyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMonthlyIncome() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/history/monthly`)
      .then(result => {
        this.setState({ monthlyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getYearlyIncome() {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/history/yearly`)
      .then(result => {
        this.setState({ yearlyIncome: result.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChart(event) {
    event.preventDefault();
    let val = event.target.value;
    this.drawChart(val);
  }

  drawChart(val) {
    if (val == "weekly") {
      let weekly = [0];
      let lastDate = [0];

      this.state.weeklyIncome.map(item => {
        weekly.push(item.INCOME);
        lastDate.push(item.date_created);
      });

      const dataChart = {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        datasets: [
          {
            label: "This Week Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weekly.slice(Math.max(weekly.length - 7, 0))
          },
          {
            label: "Last Week Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weekly.slice(Math.max(weekly.length - 14, 0)).slice(0, 7)
          }
        ]
      };
      this.setState({ data: dataChart });
    } else if (val == "monthly") {
      let monthly = [0];

      this.state.monthlyIncome.map(item => {
        monthly.push(item.INCOME);
      });

      console.log(monthly.length);

      const dataChart = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "This Month Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: monthly.slice(Math.max(monthly.length - 4, 0))
          },
          {
            label: "Last Month Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: monthly.slice(Math.max(monthly.length - 8, 0)).slice(0, 4)
          }
        ]
      };
      this.setState({ data: dataChart });
    } else if (val == "yearly") {
      let yearly = [0];

      this.state.yearlyIncome.map(item => {
        yearly.push(item.INCOME);
      });

      const dataChart = {
        labels: [
          "September",
          "November",
          "December",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August"
        ],
        datasets: [
          {
            label: "This Year Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yearly.slice(Math.max(yearly.length - 12, 0))
          },
          {
            label: "Last Year Income",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "white",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: yearly.slice(Math.max(yearly.length - 24, 0)).slice(0, 12)
          }
        ]
      };
      this.setState({ data: dataChart });
    }
  }

  render() {
    let daily = [0];
    let dailyAmount = [];
    let order = [];
    this.state.dailyIncome.map(item => {
      daily.push(item.INCOME);
      dailyAmount.push(item.PRICE);
      order.push(item.QUANTITY);
    });

    let year = [0];
    this.state.yearlyIncome.map(item => {
      year.push(item.INCOME);
    });

    console.log(daily);

    return (
      <div>
        <Container className="mt-3">
          <Row>
            <Link to="/home">
              <h5>Back to Home</h5>
            </Link>
          </Row>
          <Row>
            <Col>
              <Card
                body
                inverse
                style={{
                  background: "linear-gradient(to right, #457fca, #5691c8)"
                }}
              >
                <CardTitle>
                  <b>Today's Income</b>
                </CardTitle>
                <CardText className="ml-3">
                  <Row>
                    <h3>{convertRupiah.convert(daily[daily.length - 1])}</h3>
                  </Row>
                  <Row>
                    {Math.round(
                      ((daily[daily.length - 1] - daily[daily.length - 2]) /
                        daily[daily.length - 2]) *
                        100
                    )}
                    % yesterday
                  </Row>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card
                body
                inverse
                style={{
                  background: "linear-gradient(to right, #834d9b, #d04ed6)"
                }}
              >
                <CardTitle>
                  <b>Today's Orders</b>
                </CardTitle>
                <CardText className="ml-3">
                  <Row>
                    <h3>{order[order.length - 1]}</h3>
                  </Row>
                  <Row>
                    {Math.round(
                      ((order[order.length - 1] - order[order.length - 2]) /
                        order[order.length - 2]) *
                        100
                    )}
                    % yesterday
                  </Row>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card
                body
                inverse
                style={{
                  background: "linear-gradient(to right, #FFC371, #FF5F6D)"
                }}
              >
                <CardTitle>
                  <b>This Year's Income</b>
                </CardTitle>
                <CardText className="ml-3">
                  <Row>
                    <h3>{convertRupiah.convert(year[year.length - 1])}</h3>
                  </Row>
                  <Row>
                    {Math.round(
                      ((year[year.length - 1] - year[year.length - 2]) /
                        year[year.length - 2]) *
                        100
                    )}
                    % last year
                  </Row>
                </CardText>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col>
              <Card>
                <CardTitle>
                  <h2 className="mt-2 ml-3">Revenue</h2>
                </CardTitle>
                <Col sm="2">
                  <Input type="select" onChange={this.handleChart}>
                    <option>- SELECT -</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Input>
                </Col>
                <CardText>
                  <Line ref="chart" data={this.state.data} />
                </CardText>
              </Card>
            </Col>
          </Row>
          <Container>
            <Row>
              <Col>
                <Card className="mb-5">
                  <CardTitle>
                    <Col className="mt-2">
                      <h2>Recent Order</h2>
                    </Col>
                  </CardTitle>
                  <Table>
                    <thead>
                      <tr>
                        <th>Invoices</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Orders</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.history.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">{item.invoice}</th>
                            <td>Adila</td>
                            <td>{moment(item.date_created).format("LL")}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{convertRupiah.convert(item.price)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}
