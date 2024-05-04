import CourseCard from "../../../components/course/CourseCard";
import { Courses } from "../../../data/course.data";

const CoursePage = () => {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-start">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Courses
            </span>
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-11 md:grid-cols-1 lg:grid-cols-2">
          {Courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
