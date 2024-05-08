import ServiceCard from "../../../components/service/ServiceCard";
import { useGlobalSearch } from "../../../shared/context/GlobalSearchContext";
import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { useLoading } from "../../../shared/context/LoadingContext";
import CustomLoading from "../../../components/CustomLoading";
import { useEffect, useState } from "react";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [servicesTemp, setServicesTemp] = useState([]);
  const { globalSearch } = useGlobalSearch();
  const { loading, axiosInstance } = useLoading();

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    onSearch();
  }, [globalSearch]);

  const onSearch = () => {
    if (globalSearch === "") {
      setServices(servicesTemp);
    } else {
      const filteredServices = servicesTemp.filter((service) =>
        service.title.toLowerCase().includes(globalSearch.toLowerCase())
      );
      setServices(filteredServices);
    }
  };

  const getServices = async () => {
    try {
      const response = await axiosInstance.get("/service/all");
      setServices(response.data);
      setServicesTemp(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <CustomLoading />}
      <div className="p-5">
        <div className="flex justify-start">
          <h1 className="mb-1 mt-1 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Available Services
            </span>
          </h1>
        </div>
        {services.length === 0 && <DataNotFound name="Services" />}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicePage;

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
