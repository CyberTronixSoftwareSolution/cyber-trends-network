import { Popconfirm } from "antd";
import { SlUserUnfollow } from "react-icons/sl";
import { useAuth } from "../../shared/context/AuthContext";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
const FriendCard = (prop) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      authUser.userId == prop.friend.from._id
        ? setSelectedUser(prop.friend.to)
        : setSelectedUser(prop.friend.from);
    }

    console.log(selectedUser);
  }, []);

  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a className="relative mx-3 mt-3 flex h-50 overflow-hidden rounded-xl">
          {selectedUser?.image ? (
            <img
              className="object-cover"
              src={selectedUser?.image}
              style={{ height: "200px", width: "100%" }}
              alt="product image"
            />
          ) : (
            <div
              className="flex items-center justify-center bg-gray-200"
              style={{ height: "200px", width: "100%" }}
            >
              <UserOutlined style={{ fontSize: "3.5rem" }} />
            </div>
          )}
        </a>
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl tracking-tight text-slate-900">
            {selectedUser?.name}
          </h5>
          <h6 className="text-sm font-semibold text-gray-400">
            {selectedUser?.email}
          </h6>

          <Popconfirm
            title="Unfriend Confirmation"
            description="Are you sure to unfriend?"
            onConfirm={() => {
              prop.removeFriend(prop.friend._id);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="bottomRight"
          >
            <button
              href="#"
              className="flex items-center justify-center rounded-md bg-violet-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
              style={{ width: "100%" }}
            >
              <SlUserUnfollow
                style={{
                  fontSize: "1.1rem",
                  marginRight: "8px",
                }}
              />
              Unfriend
            </button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default FriendCard;
