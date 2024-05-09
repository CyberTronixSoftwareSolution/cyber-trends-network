import { Button, Input, Modal } from "antd";
import {
  UserAddOutlined,
  ContactsOutlined,
  SearchOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddFriendCard2 from "../../../components/network/AddFriendCard2";
import { useAuth } from "../../../shared/context/AuthContext";
import { useLoading } from "../../../shared/context/LoadingContext";
import { CustomToastService } from "../../../shared/message.service";
import FriendRequestCard from "../../../components/network/FriendRequestCard";
import CustomLoading from "../../../components/CustomLoading";
import PropTypes from "prop-types";
import FriendCard from "../../../components/network/FriendCard";
import { useGlobalSearch } from "../../../shared/context/GlobalSearchContext";

const NetworkPage = () => {
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [friendSuggestionsTemp, setFriendSuggestionsTemp] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRequestsTemp, setFriendRequestsTemp] = useState([]);

  const [friends, setFriends] = useState([]);
  const [tempFriends, setTempFriends] = useState([]);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();
  const { globalSearch } = useGlobalSearch();

  useEffect(() => {
    if (authUser) {
      loadFriends();
    }
  }, [authUser]);

  useEffect(() => {
    search();
  }, [globalSearch]);

  const search = () => {
    const searchValue = globalSearch.toLowerCase();
    if (searchValue === "") {
      setFriends(tempFriends);
      return;
    }

    const filteredFriends = tempFriends.filter((friend) => {
      return friend.name.toLowerCase().includes(searchValue);
    });

    setFriends(filteredFriends);
  };

  // Load all friends
  const loadFriends = async () => {
    try {
      const response = await axiosInstance.get(
        `/friend/allFriends/${authUser.userId}`
      );

      let friends = response.data.friends;

      if (friends.length > 0) {
        friends.map((friend) => {
          friend.name =
            authUser.userId == friend.from._id
              ? friend.to.name
              : friend.from.name;
        });
      }

      setFriends(friends);
      setTempFriends(friends);
    } catch (error) {
      console.log(error);
    }
  };

  // open add friends modal
  const openAddFriendsModal = async () => {
    loadFriendsSuggestions();
    setShowAddFriends(true);
  };

  // open friend requests modal
  const openFriendRequestsModal = () => {
    loadFriendRequests();
    setShowFriendRequests(true);
  };

  // load friend suggestions
  const loadFriendsSuggestions = async () => {
    try {
      const response = await axiosInstance.get(
        `/friend/suggestion/${authUser.userId}`
      );

      setFriendSuggestions(response.data.friendList);
      setFriendSuggestionsTemp(response.data.friendList);
    } catch (error) {
      console.log(error);
    }
  };

  // load friend requests
  const loadFriendRequests = async () => {
    try {
      const response = await axiosInstance.get(
        `/friend/allReq/${authUser.userId}`
      );

      setFriendRequests(response.data.requests);
      setFriendRequestsTemp(response.data.requests);
    } catch (error) {
      console.log(error);
    }
  };

  // Search friends
  const searchFriends = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFriendSuggestions(friendSuggestionsTemp);
      return;
    }

    const filteredFriends = friendSuggestionsTemp.filter((friend) => {
      return friend.user.name.toLowerCase().includes(searchValue);
    });

    setFriendSuggestions(filteredFriends);
  };

  // Search friend requests
  const searchFriendRequests = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFriendRequests(friendRequestsTemp);
      return;
    }

    const filteredRequests = friendRequestsTemp.filter((req) => {
      return req.from.name.toLowerCase().includes(searchValue);
    });

    setFriendRequests(filteredRequests);
  };

  // Add friend
  const addFriend = async (friendId) => {
    const request = {
      from: authUser.userId,
      to: friendId,
    };

    try {
      const response = await axiosInstance.post("/friend/addFriend", request);
      CustomToastService.success(response.data.message);
      loadFriendsSuggestions();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Remove friend request
  const removeFriendRequest = async (friendReqId) => {
    try {
      const response = await axiosInstance.delete(
        `/friend/removeReq/${friendReqId}`
      );
      CustomToastService.success(response.data.message);
      loadFriendsSuggestions();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Accept friend request
  const acceptFriendRequest = async (friendReqId) => {
    updateFriendRequest(friendReqId, 1);
  };

  // Reject friend request
  const rejectFriendRequest = async (friendReqId) => {
    updateFriendRequest(friendReqId, 2);
  };

  // Update friend request
  const updateFriendRequest = async (friendReqId, status) => {
    try {
      const response = await axiosInstance.put(
        `/friend/updateReq/${friendReqId}?status=${status}`
      );
      CustomToastService.success(response.data.message);
      loadFriendRequests();
      loadFriends();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  // Remove friend
  const removeFriend = async (friendId) => {
    try {
      const response = await axiosInstance.delete(
        `/friend/removeFriend/${friendId}`
      );
      CustomToastService.success(response.data.message);
      loadFriends();
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading && !showAddFriends && !showFriendRequests && <CustomLoading />}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Friends
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <Button icon={<UserAddOutlined />} onClick={openAddFriendsModal}>
              Add Friend
            </Button>

            <Button
              icon={<ContactsOutlined />}
              onClick={openFriendRequestsModal}
            >
              Friend Requests
            </Button>
          </div>
        </div>

        {friends.length === 0 && (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <DataNotFound name="Friends" />
          </div>
        )}

        {friends.length > 0 && (
          <div className="grid grid-cols-1 gap-11 md:grid-cols-1 lg:grid-cols-5 mt-4">
            {friends.map((friend) => (
              <FriendCard
                key={friend._id}
                friend={friend}
                removeFriend={removeFriend}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Friends */}
      <Modal
        title="ADD FRIENDS"
        open={showAddFriends}
        onOk={() => setShowAddFriends(false)}
        onCancel={() => setShowAddFriends(false)}
        centered
        width={500}
        maskClosable={false}
        footer={[]}
      >
        {loading && <CustomLoading />}
        <div className="flex flex-col justify-between w-full">
          {/* Search container */}
          <div className="w-full mb-4">
            <Input
              size="large"
              placeholder="Search Friends..."
              prefix={<SearchOutlined />}
              onChange={searchFriends}
            />
          </div>

          {/* Friend Container */}
          <div
            className="flex flex-col gap-2"
            style={{
              height: "300px",
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {friendSuggestions.length === 0 ? (
              <DataNotFound name="Friend Suggestions" />
            ) : (
              <>
                {friendSuggestions.map((friend) => (
                  <AddFriendCard2
                    key={friend.user._id}
                    friend={friend}
                    addFriend={addFriend}
                    removeFriendRequest={removeFriendRequest}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        title="FRIEND REQUESTS"
        open={showFriendRequests}
        onOk={() => setShowFriendRequests(false)}
        onCancel={() => setShowFriendRequests(false)}
        centered
        width={500}
        maskClosable={false}
        footer={[]}
      >
        {loading && <CustomLoading />}
        <div className="flex flex-col justify-between w-full">
          {/* Search container */}
          <div className="w-full mb-4">
            <Input
              size="large"
              placeholder="Search Friend Requests..."
              prefix={<SearchOutlined />}
              onChange={searchFriendRequests}
            />
          </div>

          {/* Friend Container */}
          <div
            className="flex flex-col gap-2"
            style={{
              height: "300px",
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {friendRequests.length === 0 ? (
              <DataNotFound name="Friend Requests" />
            ) : (
              <>
                {friendRequests.map((req) => (
                  <FriendRequestCard
                    key={req._id}
                    req={req}
                    acceptFriendRequest={acceptFriendRequest}
                    rejectFriendRequest={rejectFriendRequest}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NetworkPage;

const DataNotFound = ({ name }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500">No {name} Found</p>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string,
};
