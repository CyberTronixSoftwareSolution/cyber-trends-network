import { Carousel } from "antd";
import AddFriendCard from "../../components/network/AddFriendCard";
import { useEffect, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";
import CustomLoading from "../../components/CustomLoading";
import JobCard from "../../components/job/JobCard";
import { CustomToastService } from "../../shared/message.service";
import CourseCard from "../../components/course/CourseCard";
import ServiceCard from "../../components/service/ServiceCard";

const UserHome = () => {
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);

  const { authUser } = useAuth();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getJobs();
    getAllCourses();
    getServices();
    loadFriendsSuggestions();
  }, [authUser]);

  //   Get Jobs
  const getJobs = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/all/${authUser.userId}`);
      if (response.data.length >= 3) {
        // set only last 3 jobs to show
        setJobs(response.data.slice(0, 3));
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyForJob = async (request) => {
    try {
      const response = await axiosInstance.post("/apply/add", request);
      if (response.data) {
        CustomToastService.success("Applied successfully!");
        getJobs();
        return true;
      }
    } catch (error) {
      CustomToastService.error(error.response.data.error);
      return false;
    }
  };

  //   Get All COurses
  const getAllCourses = async () => {
    try {
      const response = await axiosInstance.get(
        `/course/allForUser/${authUser.userId}`
      );

      if (response.data.length >= 2) {
        setCourses(response.data.slice(0, 2));
      } else {
        setCourses([]);
      }
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

  // get all services
  const getServices = async () => {
    try {
      const response = await axiosInstance.get("/service/all");

      if (response.data.length >= 3) {
        setServices(response.data.slice(0, 3));
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get all friend suggestions
  // load friend suggestions
  const loadFriendsSuggestions = async () => {
    try {
      const response = await axiosInstance.get(
        `/friend/suggestion/${authUser.userId}`
      );

      if (response.data) {
        setFriendSuggestions(response.data.friendList.splice(0, 4));
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      {loading && <CustomLoading />}
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

      {friendSuggestions.length > 0 && (
        <div className="p-4 mt-4">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Friend Suggestions
            </span>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-4 mt-4">
              {friendSuggestions.map((item) => (
                <AddFriendCard
                  key={item._id}
                  friend={item}
                  addFriend={addFriend}
                  removeFriendRequest={removeFriendRequest}
                />
              ))}
            </div>
          </h1>
        </div>
      )}

      {jobs.length > 0 && (
        <div className="p-4 mt-4">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Vacancies
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} applyForJob={applyForJob} />
            ))}
          </div>
        </div>
      )}

      {courses.length > 0 && (
        <div className="p-4 mt-4">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Courses
            </span>
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-2">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                enrollToCourse={enrollToCourse}
              />
            ))}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div className="p-4 mt-4">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Services
            </span>
          </h1>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
