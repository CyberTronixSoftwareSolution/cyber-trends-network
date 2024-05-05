import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const messages = [
  {
    sender: "Admin",
    message: "Hello",
  },
  {
    sender: "User",
    message: "Hi",
  },
  {
    sender: "Admin",
    message: "How are you?",
  },
  {
    sender: "User",
    message: "I'm fine",
  },
  {
    sender: "Admin",
    message: "Good to hear",
  },
  {
    sender: "User",
    message: "How can I help you?",
  },
  {
    sender: "Admin",
    message: "I need help with my account",
  },
  {
    sender: "User",
    message: "Sure, I can help you with that",
  },
  {
    sender: "Admin",
    message: "Thank you",
  },
  {
    sender: "User",
    message: "You're welcome",
  },
  {
    sender: "Admin",
    message: "Goodbye",
  },
  {
    sender: "User",
    message: "Goodbye",
  },
];

const Users = [
  {
    id: 1,
    name: "John Doe",
    email: "nimna@gmail.com",
  },

  {
    id: 2,
    name: "Nimna Thiranjaya",
    email: "nimna@gmail.com",
  },
  {
    id: 3,
    name: "Dimalka Rathnayaka",
    email: "dima@gmail.com",
  },
];

const AdminChatPage = () => {
  return (
    <div
      className="flex align-center justify-center gap-4"
      style={{ height: "500px" }}
    >
      {/* style={{ height: "430px", overflowY: "scroll" }} */}
      <div className="gap-4 w-1/4 bg-sky-100" style={{ borderRadius: "10px" }}>
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
          {Users.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-white rounded-lg"
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
                  <h5 className="text-white font-semibold">
                    {user.name.charAt(0)}
                  </h5>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-base font-semibold">{user.name}</h5>
                  <h5 className="text-sm font-semibold text-gray-500">
                    {user.email}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-3/4 bg-sky-100" style={{ borderRadius: "10px" }}>
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
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col p-3 gap-1 ${
                message.sender === "Admin" ? "items-start" : "items-end"
              }`}
            >
              <div className="w-max grid">
                <div
                  className={`px-3.5 py-2 ${
                    message.sender === "Admin" ? "bg-gray-300" : "bg-blue-500"
                  } rounded justify-start  items-center gap-3 inline-flex`}
                >
                  <h5
                    className={`${
                      message.sender === "Admin" ? "text-black" : "text-white"
                    } text-sm font-normal leading-snug`}
                  >
                    {message.message}
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
          />
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;
