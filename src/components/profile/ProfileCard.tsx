import React from "react";
import profilePicture from "../../resources/profile/profile_pic.png";
import { fetchUserComittees } from "../../api/baseAPI";
import { useQuery } from "@tanstack/react-query";
import { EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const ProfileCard = () => {
  const { data, isError } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchUserComittees(),
  });

  return (
    <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-online-blue-500 flex items-center justify-center mb-4 overflow-hidden">
          <img src={profilePicture} alt="Profilbilde" className="w-full h-full object-cover" />
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-4">
          {data && data.name}
        </h2>

        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 text-online-blue-200">
            <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm truncate">{data && data.email}</span>
          </div>
          
          <div className="flex items-start gap-3 text-online-blue-200">
            <UserGroupIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">
              {data && data.committees.length
                ? data.committees.map((committee: any, index: number) => {
                    const capitalizedName =
                      committee.charAt(0).toUpperCase() + committee.slice(1);
                    return (
                      <span key={index}>
                        {capitalizedName}
                        {index < data.committees.length - 1 && ", "}
                      </span>
                    );
                  })
                : "Ingen komiteer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
