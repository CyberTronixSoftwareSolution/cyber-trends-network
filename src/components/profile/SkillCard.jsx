import { Popconfirm, Rate } from "antd";
import { DeleteFilled } from "@ant-design/icons";
const SkillCard = (prop) => {
  return (
    <>
      <div
        className="mb-2 bg-violet-100 p-2 mr-2"
        style={{ borderRadius: "10px" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base font-semibold text-gray-900">
              {prop.skill?.name}
            </h5>
            <div className="flex items-center gap-2">
              <Rate allowHalf value={prop.skill?.level} disabled />
            </div>
          </div>
          <Popconfirm
            title="Delete Confirmation"
            description="Are you sure to delete this skill?"
            onConfirm={() => {
              if (prop?.isAdmin) {
                prop.onDelete("expertise", prop.skill?.id);
              } else {
                prop.onDelete("skills", prop.skill?.id);
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

export default SkillCard;
