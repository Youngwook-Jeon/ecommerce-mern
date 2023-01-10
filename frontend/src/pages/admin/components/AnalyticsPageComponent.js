import { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

const AnalyticsPageComponent = ({
  fetchOrdersForFirstDate,
  fetchOrdersForSecondDate,
}) => {
  const [firstDateToCompare, setFirstDateToCompare] = useState(
    new Date().toISOString().substring(0, 10)
  );
  var previousDay = new Date();
  previousDay.setDate(previousDay.getDate() - 1);
  const [secondDateToCompare, setSecondDateToCompare] = useState(
    new Date(previousDay).toISOString().substring(0, 10)
  );

  useEffect(() => {
    const abctrl = new AbortController();
    fetchOrdersForFirstDate(abctrl, firstDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [firstDateToCompare]: orderSum };
        });
        console.log(orders);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );

    fetchOrdersForSecondDate(abctrl, secondDateToCompare)
      .then((data) => {
        let orderSum = 0;
        const orders = data.map((order) => {
          orderSum += order.orderTotal.cartSubtotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });
          return { name: date, [secondDateToCompare]: orderSum };
        });
        console.log(orders);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );

    return () => abctrl.abort();
  }, [
    firstDateToCompare,
    secondDateToCompare,
    fetchOrdersForFirstDate,
    fetchOrdersForSecondDate,
  ]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  };

  const secondDateHandler = (e) => {
    setSecondDateToCompare(e.target.value);
  };

  const data = [
    {
      name: "12:00 AM",
      "2022 year": 4000,
      "2021 year": 4100,
    },
    {
      name: "1:00 AM",
      "2022 year": 4200,
      "2021 year": 4300,
    },
    {
      name: "2:00 AM",
      "2022 year": 4400,
      "2021 year": 4500,
    },
    {
      name: "3:00 AM",
      "2022 year": 5000,
      "2021 year": 4600,
    },
  ];

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10} width="100%" height="100%">
        <h1>
          Black Friday Cumulative Revenue {firstDateToCompare} VS{" "}
          {secondDateToCompare}
        </h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date to Compare</Form.Label>
          <Form.Control
            onChange={firstDateHandler}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date to Compare"
            defaultValue={firstDateToCompare}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date to Compare</Form.Label>
          <Form.Control
            onChange={secondDateHandler}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date to Compare"
            defaultValue={secondDateToCompare}
          />
        </Form.Group>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicatedCategory={false}
              dataKey="name"
            />
            <YAxis
              label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="2021 year"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="2022 year"
              stroke="#82ca9d"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AnalyticsPageComponent;
