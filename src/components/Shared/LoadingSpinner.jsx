import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[80vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader size={100} color="lime" />
    </div>
  );
};

export default LoadingSpinner;
