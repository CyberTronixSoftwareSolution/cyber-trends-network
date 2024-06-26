import { Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const ExperienceCard = (prop) => {
  return (
    <>
      <div
        className="mb-2 bg-violet-100 p-2 mr-2"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base font-semibold text-gray-900">
              {prop.experience?.position}
            </h5>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600">
                {prop.experience?.company}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                (
                {`${prop.experience?.startYear} - ${
                  prop.experience?.endYear
                    ? prop.experience?.endYear
                    : "Present"
                }`}
                )
              </p>
            </div>
          </div>
          <Popconfirm
            title="Delete Confirmation"
            description="Are you sure to delete this experience?"
            onConfirm={() => {
              if (prop?.isAdmin) {
                prop.onDelete("workExperience", prop.experience?.id);
              } else {
                prop.onDelete("experience", prop.experience?.id);
              }
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
            placement="bottomLeft"
          >
            <DeleteFilled className="text-red-500 text-xl" />
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default ExperienceCard;
