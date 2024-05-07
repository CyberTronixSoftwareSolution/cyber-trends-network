import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../shared/context/AuthContext";
import { Avatar } from "antd";

const ConversationCard = (prop) => {
  const [user, setUser] = useState();
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const friend =
        prop.conversation.member01._id === authUser.userId
          ? prop.conversation.member02
          : prop.conversation.member01;
      setUser(friend);
    }
  }, [authUser, prop.conversation, prop.selectedConversation]);

  return (
    <div
      className={`flex justify-between items-center p-3 bg-white rounded-lg  cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full hover:shadow-lg ${
        prop.conversation._id === prop.selectedConversation && "bg-violet-300"
      }`}
      onClick={() => prop.selectConversation(prop.conversation._id)}
    >
      <div className="flex gap-3 items-center">
        {user?.image ? (
          <Avatar size={40} src={<img src={user?.image} alt="avatar" />} />
        ) : (
          <Avatar size={40} icon={<UserOutlined />}></Avatar>
        )}
        <div className="flex flex-col">
          <h5 className="text-base font-semibold">{user?.name}</h5>
          <h5 className="text-sm font-semibold text-gray-500">{user?.email}</h5>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
