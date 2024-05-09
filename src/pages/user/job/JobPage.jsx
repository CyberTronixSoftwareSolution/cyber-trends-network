import JobCard from "../../../components/job/JobCard";
// import { Jobs } from "../../../data/job.data";
import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGlobalSearch } from "../../../shared/context/GlobalSearchContext";
import { useLoading } from "../../../shared/context/LoadingContext";
import CustomLoading from "../../../components/CustomLoading";
import { useAuth } from "../../../shared/context/AuthContext";
import { CustomToastService } from "../../../shared/message.service";

const JobPage = () => {
  const [job, setJobs] = useState([]);
  const [jobTemp, setJobsTemp] = useState([]);

  const { globalSearch } = useGlobalSearch();
  const { authUser } = useAuth();

  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    onSearch();
  }, [globalSearch]);

  const onSearch = () => {
    if (globalSearch === "") {
      setJobs(jobTemp);
    } else {
      const filteredJobs = jobTemp.filter((job) =>
        job.title.toLowerCase().includes(globalSearch.toLowerCase())
      );
      setJobs(filteredJobs);
    }
  };

  const getJobs = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/all/${authUser.userId}`);
      setJobs(response.data);
      setJobsTemp(response.data);
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
  return (
    <>
      {loading && <CustomLoading />}
      <div className="p-5">
        <div className="flex justify-start">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Jobs
            </span>
          </h1>
        </div>
        {job.length === 0 && <DataNotFound name="Jobs" />}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
          {job.map((job) => (
            <JobCard key={job._id} job={job} applyForJob={applyForJob} />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobPage;

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
