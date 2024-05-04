import { Button, Tooltip, Modal, Input } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;

const JobCard = (prop) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div
        className="group mx-2 mt-4 bg-white grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto"
        style={{ minHeight: "190px" }}
      >
        <a
          href="#"
          className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
        >
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={prop.job.image}
              alt=""
              className="h-full w-full object-cover text-gray-700"
              draggable="false"
            />
          </div>
        </a>
        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
          <h3 className="text-sm text-gray-600">Title</h3>
          <a
            href="#"
            className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
          >
            {prop.job.title}
          </a>
          <Tooltip
            title={prop.job.description}
            color="blue"
            key={prop.job._id}
            placement="bottom"
          >
            <p className="overflow-hidden pr-7 text-sm">
              {prop.job.description?.length > 80
                ? prop.job.description.slice(0, 80) + "..."
                : prop.job.description}
            </p>
          </Tooltip>
        </div>
        <div className="col-span-10 flex justify-between items-center mt-5 w-full">
          <div className="flex justify-start text-sm font-medium text-gray-500">
            <div className="">
              Experience:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {prop.job.experience}
              </span>
            </div>
            <div className="">
              Salary:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                {prop.job.salary}
              </span>
            </div>
          </div>
          <div className="">
            <Button
              icon={<RightCircleOutlined />}
              onClick={() => setIsShow(true)}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="APPLY FOR JOB"
        open={isShow}
        onOk={() => setIsShow(false)}
        onCancel={() => setIsShow(false)}
        centered
        width={500}
        footer={[
          <Button key="back" onClick={() => setIsShow(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsShow(false)}>
            Apply
          </Button>,
        ]}
      >
        <div className="flex gap-4 items-center mb-6 mt-4">
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={prop.job.image}
              alt=""
              className="h-full w-full object-cover text-gray-700"
              draggable="false"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{prop.job.title}</h3>
            <p className="text-sm text-gray-600">{prop.job.description}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Description</label>
          {/* status="error" */}
          <TextArea
            placeholder="Enter Description"
            showCount
            rows={3}
            maxLength={300}
            style={{
              resize: "none",
              marginBottom: "15px",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default JobCard;
