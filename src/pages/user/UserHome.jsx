import { Carousel } from "antd";
import AddFriendCard from "../../components/network/AddFriendCard";
// import { Jobs } from "../../data/job.data";
// import JobCard from "../../components/job/JobCard";
// import { Courses } from "../../data/course.data";
// import CourseCard from "../../components/course/CourseCard";
// import { Services } from "../../data/service.data";
// import ServiceCard from "../../components/service/ServiceCard";

const UserHome = () => {
  return (
    <>
      <div className="">
        <Carousel
          arrows={true}
          autoplay
          autoplaySpeed={3000}
          dotPosition="bottom"
          effect="scrollx"
          style={{ height: "420px" }}
        >
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714895238/cyberthrends/fohbyftvegblaiybvckq.png"
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714896132/cyberthrends/White_and_Violet_Professional_Modern_Technology_Pitch_Deck_Presentation_y7h4po.jpg"
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/dd3v8dwin/image/upload/v1714896421/cyberthrends/White_and_Violet_Professional_Modern_Technology_Pitch_Deck_Presentation_2_wqy10u.jpg"
              alt="img"
              style={{ height: "420px", width: "100%", objectFit: "cover" }}
            />
          </div>
        </Carousel>
      </div>

      <div className="p-4 mt-2">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Cyberthrends
        </h1>
        <p className="text-center text-gray-500">
          The best place to learn and grow
        </p>
      </div>

      {/* friennd Suddgetions */}

      <div className="p-4 mt-4">
        <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Friend Suggestions
          </span>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <AddFriendCard key={item} />
            ))}
          </div>
        </h1>
      </div>

      <div className="p-4 mt-4">
        <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Available Vacancies
          </span>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
            {/* {Jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))} */}
          </div>
        </h1>
      </div>

      <div className="p-4 mt-4">
        <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Available Courses
          </span>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
            {/* {Courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))} */}
          </div>
        </h1>
      </div>

      <div className="p-4 mt-4">
        <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Available Services
          </span>

          {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
            {Services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div> */}
        </h1>
      </div>
    </>
  );
};

export default UserHome;
