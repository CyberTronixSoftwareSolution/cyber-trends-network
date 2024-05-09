import { Button, Input, Modal } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLoading } from "../../../shared/context/LoadingContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { CustomToastService } from "../../../shared/message.service";
import {
  InboxOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import ConversationCard from "../../../components/messanger/ConversationCard";
import CustomLoading from "../../../components/CustomLoading";
import ChatUserCard from "../../../components/messanger/ChatUserCard";

const ChatPage = () => {
  const [showNewConversation, setShowNewConversation] = useState(false);

  const [users, setUsers] = useState([]);
  const [userTemp, setUserTemp] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getConversations();

    if (selectedConversation !== null) {
      getMessages();
    }
  }, [selectedConversation]);

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const loadAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversation/getAllUsers/${authUser.userId}?type=${authUser.role}`
      );
      setUsers(response.data);
      setUserTemp(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = (e) => {
    if (e.target.value === "") {
      setUsers(userTemp);
    } else {
      const filteredUsers = userTemp.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  //   Get all Conversations of the user
  const getConversations = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversation/allConversations/${authUser.userId}`
      );
      setConversations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   Create a new conversation
  const createConversation = async (friendId) => {
    try {
      console.log({
        member01: authUser.userId,
        member02: friendId,
      });
      const response = await axiosInstance.post(
        "/conversation/createConversation",
        {
          member01: authUser.userId,
          member02: friendId,
        }
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        getConversations();
        setShowNewConversation(false);
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const sendMessage = async () => {
    if (message === "") {
      setError({
        message: true,
      });

      return;
    } else {
      setError({});
    }

    if (selectedConversation === null)
      return CustomToastService.error("Please select a conversation");
    let request = {
      senderId: authUser.userId,
      text: message,
    };

    try {
      const response = await axiosInstance.post(
        `/conversation/createMgs/${selectedConversation}`,
        request
      );

      if (response.data) {
        CustomToastService.success(response.data.message);
        setMessage("");
        getMessages();
      }
    } catch (error) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversation/allMessages/${selectedConversation}`
      );
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMessagesSync = async () => {
    if (selectedConversation !== null) {
      const response = await axiosInstance.get(
        `/conversation/allMessages/${selectedConversation}`
      );

      if (response.data && response.data.length > messages.length) {
        const dif = response.data.length - messages.length;
        const newMessages = response.data.slice(-dif);
        setMessages([...messages, ...newMessages]);
      }
    }
  };

  //  load messages of the selected conversation every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedConversation !== null) {
        loadMessagesSync();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedConversation]);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between align-middle">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Messenger
            </span>
          </h1>
          <Button
            type="primary"
            icon={<MessageOutlined />}
            onClick={() => {
              loadAllUsers();
              setShowNewConversation(true);
            }}
          >
            New Conversation
          </Button>
        </div>

        <div
          className="flex align-center justify-center gap-4 mt-4"
          style={{ height: "450px" }}
        >
          <div
            className="gap-4 w-1/4 bg-sky-100"
            style={{ borderRadius: "10px" }}
          >
            <div
              className="flex flex-col gap-3 p-3"
              style={{
                height: "430px",
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {conversations.length === 0 && (
                <DataNotFound name="Conversations" />
              )}

              {conversations.map((conversation) => (
                <ConversationCard
                  key={conversation._id}
                  conversation={conversation}
                  selectConversation={selectConversation}
                  selectedConversation={selectedConversation}
                />
              ))}
            </div>
          </div>

          <div className="w-3/4 bg-sky-100" style={{ borderRadius: "10px" }}>
            <div
              className="flex flex-col gap-3 p-3"
              style={{
                height: "390px",
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {messages.length === 0 && <DataNotFound name="Messages" />}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1 ${
                    message.senderId != authUser.userId
                      ? "items-start"
                      : "items-end"
                  }`}
                >
                  <div className="w-max grid">
                    <div
                      className={`px-3.5 py-2 ${
                        message.senderId != authUser.userId
                          ? "bg-gray-300"
                          : "bg-blue-500"
                      } rounded justify-start  items-center gap-3 inline-flex`}
                    >
                      <h5
                        className={`${
                          message.senderId != authUser.userId
                            ? "text-black"
                            : "text-white"
                        } text-sm font-normal leading-snug`}
                      >
                        {message.text}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-3 gap-4">
              <Input
                placeholder="Type a message"
                style={{ borderRadius: "20px" }}
                size="large"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                status={error.message && "error"}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<SendOutlined />}
                style={{ borderRadius: "50%" }}
                onClick={() => sendMessage()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* NEw Conversation */}
      <Modal
        title="NEW CONVERSATION"
        open={showNewConversation}
        onOk={() => setShowNewConversation(false)}
        onCancel={() => setShowNewConversation(false)}
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
              onChange={searchUsers}
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
            {users.length === 0 ? (
              <DataNotFound name="new Users" />
            ) : (
              <>
                {users.map((user) => (
                  <ChatUserCard
                    key={user._id}
                    user={user}
                    createConversation={createConversation}
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

export default ChatPage;

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
