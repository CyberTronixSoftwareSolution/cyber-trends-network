import { useEffect, useState } from "react";
import {
  //   UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../shared/context/AuthContext";

const AddFriendCard = (prop) => {
  const [user, setUser] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (prop.friend) {
      setUser(prop.friend.user);
    }
  }, [prop.friend]);
  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          className="relative mx-3 mt-3 flex h-50 overflow-hidden rounded-xl"
          href="#"
        >
          {user?.image ? (
            <img
              className="object-cover"
              src={user?.image}
              alt="product image"
              style={{ height: "200px", width: "100%" }}
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
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              {user?.name}
            </h5>
          </a>

          {!prop.friend.isFriend && (
            <a
              className="flex items-center justify-center rounded-md bg-violet-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
              onClick={() => prop.addFriend(user?._id)}
            >
              Add To Friend
            </a>
          )}

          {prop.friend.isFriend &&
            prop.friend.isFriend?.from._id == authUser.userId && (
              <a
                className="flex items-center justify-center rounded-md bg-violet-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
                onClick={() =>
                  prop.removeFriendRequest(prop.friend.isFriend?._id)
                }
              >
                Undo Request
              </a>
            )}

          {prop.friend.isFriend &&
            prop.friend.isFriend?.to._id == authUser.userId && (
              <button
                className="flex items-center justify-center rounded-md bg-violet-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2"
                style={{ backgroundColor: "gray" }}
                disabled
              >
                Check Your Friend Request
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default AddFriendCard;
