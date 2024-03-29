import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminChatsPage = () => {
  const { chatRooms, socket } = useSelector((state) => state.adminChat);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, index) => (
            <AdminChatRoomComponent key={index} chatRoom={chatRoom} socket={socket} roomIndex={index + 1} socketUser={chatRoom[0]} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatsPage;
