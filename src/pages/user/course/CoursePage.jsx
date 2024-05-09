import CourseCard from "../../../components/course/CourseCard";
import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGlobalSearch } from "../../../shared/context/GlobalSearchContext";
import { useLoading } from "../../../shared/context/LoadingContext";
import { useAuth } from "../../../shared/context/AuthContext";
import { CustomToastService } from "../../../shared/message.service";
import CustomLoading from "../../../components/CustomLoading";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [coursesTemp, setCoursesTemp] = useState([]);

  const { authUser } = useAuth();
  const { globalSearch } = useGlobalSearch();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    if (authUser) {
      getAllCourses();
    }
  }, [authUser]);

  useEffect(() => {
    search();
  }, [globalSearch]);

  const search = () => {
    if (globalSearch === "") {
      setCourses(coursesTemp);
    } else {
      const filteredCourses = coursesTemp.filter((course) =>
        course.title.toLowerCase().includes(globalSearch.toLowerCase())
      );
      setCourses(filteredCourses);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/allForUser/${authUser.userId}`
      );
      setCourses(response.data);
      setCoursesTemp(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const enrollToCourse = async (request) => {
    try {
      const response = await axiosInstance.post("/enroll/add", request);
      if (response.data) {
        CustomToastService.success(response.data.message);
        getAllCourses();
        return true;
      }
    } catch (error) {
      CustomToastService.error(error.response.data.error);
      return false;
    }
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="p-5">
        <div className="flex justify-start">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Courses
            </span>
          </h1>
        </div>
        {courses.length === 0 && <DataNotFound name="Courses" />}
        <div className="grid grid-cols-1 gap-11 md:grid-cols-1 lg:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              enrollToCourse={enrollToCourse}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursePage;

const DataNotFound = ({ name }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500">No {name} Found</p>
    </div>
  );
};

DataNotFound.propTypes = {
  name: PropTypes.string,
};
