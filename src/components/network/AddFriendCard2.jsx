import { Avatar, Button } from "antd";
import {
  UserAddOutlined,
  //   UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LuUndo2 } from "react-icons/lu";
import { useAuth } from "../../shared/context/AuthContext";

const AddFriendCard2 = (prop) => {
  const { authUser } = useAuth();
  console.log(prop.friend);

  return (
    <>
      <div className="flex justify-between items-center p-3 bg-violet-100 rounded-lg">
        <div className="flex gap-3 items-center">
          {prop.friend.user?.image ? (
            <Avatar
              size={40}
              src={<img src={prop.friend.user?.image} alt="avatar" />}
            />
          ) : (
            <Avatar size={40} icon={<UserOutlined />}></Avatar>
          )}

          <div className="flex flex-col">
            <h5 className="text-base font-semibold">
              {prop.friend.user?.name}
            </h5>
            <h5 className="text-sm font-semibold text-gray-500">
              {prop.friend.user?.email}
            </h5>
          </div>
        </div>

        {!prop.friend.isFriend && (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => prop.addFriend(prop.friend.user?._id)}
          >
            Add Friend
          </Button>
        )}

        {prop.friend.isFriend &&
          prop.friend.isFriend?.from._id == authUser.userId && (
            <Button
              type="primary"
              icon={<LuUndo2 />}
              style={{ backgroundColor: "gray", borderColor: "gray" }}
              onClick={() =>
                prop.removeFriendRequest(prop.friend.isFriend?._id)
              }
            >
              Undo Request
            </Button>
          )}

        {prop.friend.isFriend &&
          prop.friend.isFriend?.to._id == authUser.userId && (
            <Button disabled>Check Friend Requests</Button>
          )}

        {/* {!prop.friend.isFriend ? (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => prop.addFriend(prop.friend.user?._id)}
          >
            Add Friend
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<LuUndo2 />}
            style={{ backgroundColor: "gray", borderColor: "gray" }}
            onClick={() => prop.removeFriendRequest(prop.friend.isFriend?._id)}
          >
            Undo Request
          </Button>
        )} */}
      </div>
    </>
  );
};

export default AddFriendCard2;
