// import { ScaleLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    // <div
    //   className={` ${smallHeight ? "h-[250px]" : "h-[80vh]"}
    //   flex
    //   flex-col
    //   justify-center
    //   items-center `}
    // >
    //   <ScaleLoader size={100} color="lime" />
    // </div>
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
