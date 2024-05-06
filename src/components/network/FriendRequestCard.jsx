import { Avatar, Button, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BsCheckCircle } from "react-icons/bs";
import { LiaTimesCircle } from "react-icons/lia";

const FriendRequestCard = (prop) => {
  return (
    <>
      <div className="flex justify-between items-center p-3 bg-violet-100 rounded-lg">
        <div className="flex gap-3 items-center">
          {prop.req.from?.image ? (
            <Avatar
              size={40}
              src={<img src={prop.req.from?.image} alt="avatar" />}
            />
          ) : (
            <Avatar size={40} icon={<UserOutlined />}></Avatar>
          )}

          <div className="flex flex-col">
            <h5 className="text-base font-semibold">{prop.req.from?.name}</h5>
            <h5 className="text-sm font-semibold text-gray-500">
              {prop.req.from?.email}
            </h5>
          </div>
        </div>
        <div className="flex gap-2">
          <Tooltip title="Accept" placement="bottom">
            <Button
              type="primary"
              icon={
                <BsCheckCircle
                  style={{
                    fontSize: "1.1rem",
                  }}
                />
              }
              onClick={() => prop.acceptFriendRequest(prop.req._id)}
            ></Button>
          </Tooltip>

          <Tooltip title="Reject" placement="bottom">
            <Button
              type="primary"
              icon={
                <LiaTimesCircle
                  style={{
                    fontSize: "1.4rem",
                  }}
                />
              }
              style={{ backgroundColor: "gray", borderColor: "gray" }}
              onClick={() => prop.rejectFriendRequest(prop.req._id)}
            ></Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default FriendRequestCard;
