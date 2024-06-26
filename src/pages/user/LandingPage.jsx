import { Link } from "react-router-dom";
import image from "../../assets/images/landing.png";

const LandingPage = () => {
  //   const handleImageUpload = async (e) => {
  //     const file = e.target.files[0];
  //     try {
  //       const imageUrl = await uploadImageToCloudinary(
  //         file,
  //         "YoungNetwork",
  //         axiosInstance
  //       );
  //       setUploadImage(imageUrl);
  //       console.log(imageUrl);
  //     } catch (error) {
  //       // Handle error
  //     }
  //   };

  return (
    <>
      <div className="bg-violet-100 ">
        <div className="flex justify-center items-center h-[100vh] px-5">
          <div className="w-1/2">
            <span className="text-xl text-black dark:text-white">
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-black">
                YOUNG{" "}
                <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                  NETWORK
                </mark>
              </h1>
            </span>
            <h3 className="text-xl font-bold text-gray-600 mt-8">
              Welcome to Young Network – where connections create opportunities!
            </h3>
            <p className="text-gray-600 mt-4">
              Unlock your professional potential with Young Network, the premier
              platform for networking, career development, and business growth.
              Whether you&apos;re a seasoned professional, an aspiring
              entrepreneur, or a recent graduate, Young Network is your gateway
              to a world of possibilities.
            </p>

            <div className="flex justify-start mt-8 gap-2">
              <Link to="/signIn">
                <div className="relative inline-flex  group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href="#"
                    title="Get quote now"
                    className="relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Continue as User
                  </a>
                </div>
              </Link>

              <Link to="/admin">
                <div className="relative inline-flex  group">
                  <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href="#"
                    title="Get quote now"
                    className="relative inline-flex items-center justify-center px-4 py-2 text-lg font-bold text-black transition-all duration-200 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    Continue as Recruiter
                  </a>
                </div>
              </Link>

              {/* <input type="file" onChange={handleImageUpload} /> */}
            </div>
          </div>
          <div className="w-1/2 flex justify-center align-middle">
            <img
              src={image}
              alt="Imagen relacionada con el programa de fidelización"
              draggable={false}
              width={"600px"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
