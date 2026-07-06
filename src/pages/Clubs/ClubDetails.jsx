import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinClub from "./JoinClub";
import Container from "../../components/Shared/Container";
import {
  HiOutlineBadgeCheck,
  HiOutlineCollection,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

const ClubDetails = () => {
  const { id } = useParams();

  const {
    data: club,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/club/${id}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10 font-bold">
        Failed to load club details.
      </p>
    );

  return (
    <Container>
      <div className="max-w-2xl mx-auto my-16 px-4">
        {/* Single Professional Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 md:p-10">
          {/* Title & Category Badge */}
          <div className="mb-6 text-center">
            <span className="bg-blue-50 text-[#FF6A1C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
              {club.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {club.clubName}
            </h1>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <HiOutlineCollection className="text-blue-500 text-2xl" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Category
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  {club.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <HiOutlineCurrencyDollar className="text-green-500 text-2xl" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Membership Fee
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {club.membershipFee > 0 ? `$${club.membershipFee}` : "FREE"}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-2">
              Club Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {club.description}
            </p>
          </div>

          {/* Join Action Section */}
          <div className="pt-6 border-t border-gray-50 text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
              <HiOutlineBadgeCheck className="text-blue-500 text-lg" />
              Official Verified Club
            </div>

            {/* Join Button Component */}
            <div className="w-full">
              <JoinClub club={club} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClubDetails;
