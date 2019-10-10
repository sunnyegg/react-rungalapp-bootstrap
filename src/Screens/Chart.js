import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import {
  Container,
  Row,
  Col,
  Input,
  Card,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

const data = {
  labels: [
    "Monday",
    "Thursday",
    "Wednesday",
    "Tuesday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  datasets: [
    {
      label: "Weekly Income",
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
      data: [0, 4000, 10000, 2000, 222, 5000, 12000]
    }
    // {
    //   label: "Weekly Income",
    //   fill: false,
    //   lineTension: 0.1,
    //   backgroundColor: "rgba(75,192,192,0.4)",
    //   borderColor: "rgba(75,192,192,1)",
    //   borderCapStyle: "butt",
    //   borderDash: [],
    //   borderDashOffset: 0.0,
    //   borderJoinStyle: "miter",
    //   pointBorderColor: "rgba(75,192,192,1)",
    //   pointBackgroundColor: "#fff",
    //   pointBorderWidth: 1,
    //   pointHoverRadius: 5,
    //   pointHoverBackgroundColor: "rgba(75,192,192,1)",
    //   pointHoverBorderColor: "rgba(220,220,220,1)",
    //   pointHoverBorderWidth: 2,
    //   pointRadius: 1,
    //   pointHitRadius: 10,
    //   data: [10000, 59, 80, 81, 222, 5000, 12000]
    // }
  ]
};

export default class RevenueChart extends Component {
  render() {
    return (
      <div>
        <Container className="mt-5">
          <Row>
            <Col>
              <Card
                body
                inverse
                style={{ backgroundColor: "#333", borderColor: "#333" }}
              >
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card
                body
                inverse
                style={{ backgroundColor: "#333", borderColor: "#333" }}
              >
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card
                body
                inverse
                style={{ backgroundColor: "#333", borderColor: "#333" }}
              >
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
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
                  <Input type="select">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Input>
                </Col>
                {/* <Col sm="2">
                  <Input type="select">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Input>
                </Col> */}
                <CardText>
                  <Line ref="chart" data={data} />
                </CardText>
              </Card>
            </Col>
            {/* <Col sm="10">
              <h2>Revenue</h2>
            </Col>
            <Col>
              <Input type="select">
                <option>Weekly</option>
                <option>Monthly</option>
              </Input>
            </Col> */}
          </Row>
          {/* <Row>
            <Line ref="chart" data={data} />
          </Row> */}
        </Container>
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data;
    console.log(datasets[0].data);
  }
}
