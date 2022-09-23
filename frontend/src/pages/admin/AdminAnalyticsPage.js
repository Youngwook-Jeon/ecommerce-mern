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
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminAnalyticsPage = () => {
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
        <h1>Black Friday Cumulative Revenue 11/26/2022 VS 11/27/2021</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date to Compare</Form.Label>
          <Form.Control
            type="date"
            name="firstDateToCompare"
            placeholder="First Date to Compare"
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date to Compare</Form.Label>
          <Form.Control
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date to Compare"
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

export default AdminAnalyticsPage;
