import { Avatar, Button, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoChatbubblesOutline } from "react-icons/io5";

const ChatUserCard = (prop) => {
  //   console.log(prop.user);
  return (
    <>
      <div className="flex justify-between items-center p-3 bg-violet-100 rounded-lg">
        <div className="flex gap-3 items-center">
          {prop.user?.image ? (
            <Avatar
              size={40}
              src={<img src={prop.user?.image} alt="avatar" />}
            />
          ) : (
            <Avatar size={40} icon={<UserOutlined />}></Avatar>
          )}

          <div className="flex flex-col">
            <h5 className="text-base font-semibold">{prop.user?.name}</h5>
            <h5 className="text-sm font-semibold text-gray-500">
              {prop.user?.email}
            </h5>
          </div>
        </div>

        <Tooltip title="New Conversation" placement="bottom">
          <Button
            type="primary"
            icon={
              <IoChatbubblesOutline
                style={{
                  fontSize: "1.4rem",
                }}
              />
            }
            onClick={() => prop.createConversation(prop.user._id)}
          ></Button>
        </Tooltip>
      </div>
    </>
  );
};

export default ChatUserCard;
