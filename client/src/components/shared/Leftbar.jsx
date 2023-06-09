import { useMemo, memo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authActions";
import { useEffect } from "react";
import { getJoinedCommunitiesAction } from "../../redux/actions/communityActions";
import { BsThreeDots } from "react-icons/bs";
import LoadingSpinner from "../loader/ButtonLoadingSpinner";
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineRectangleStack,
  HiOutlineTag,
} from "react-icons/hi2";

const Leftbar = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const dispatch = useDispatch();

  const logout = async () => {
    setLoggingOut(true);
    await dispatch(logoutAction());
    setLoggingOut(false);
  };
  const user = useSelector((state) => state.auth?.userData);
  const joinedCommunities = useSelector(
    (state) => state.community?.joinedCommunities
  );

  useEffect(() => {
    dispatch(getJoinedCommunitiesAction());
  }, [dispatch]);

  const visibleCommunities = useMemo(() => {
    return joinedCommunities?.slice(0, 5);
  }, [joinedCommunities]);

  const communityLinks = useMemo(() => {
    return visibleCommunities?.map((community) => ({
      href: `/community/${community.name}`,
      label: community.name,
    }));
  }, [visibleCommunities]);

  return (
    <div className="w-3/12 h-[86vh] bg-white sticky top-20 left-0 shadow-2xl shadow-[#F3F8FF] px-6 py-6 my-5 rounded-lg">
      <div className="flex flex-col h-full justify-between">
        <div className="flex gap-2 justify-between">
          <img className="rounded-full w-10" src={user.avatar} alt="user" />
          {user && (
            <p className="font-bold text-primary capitalize text-sm">
              {user.name}
            </p>
          )}
          <BsThreeDots className="cursor-pointer" />
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link
            className="flex items-center gap-2 text-lg font-medium"
            to="/home"
          >
            <HiOutlineHome className="text-xl" />
            <p>Home</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium"
            to="/profile"
          >
            <HiOutlineUserCircle className="text-xl" />
            <p>Profile</p>
          </Link>
          <Link
            className="flex items-center gap-2 text-lg font-medium"
            to="/saved"
          >
            <HiOutlineTag className="text-xl" />
            <p>Saved</p>
          </Link>

          {user && user.role === "general" && (
            <Link
              className="flex items-center gap-2 text-lg font-medium"
              to="/following"
            >
              <HiOutlineRectangleStack className="text-xl" />
              <p>Following</p>
            </Link>
          )}

          {communityLinks && communityLinks.length > 0 ? (
            <div>
              <div className="w-full flex gap-12">
                <h3 className="mb-2 text-lg">Communities </h3>
                <Link className="flex gap-2" to="/my-communities">
                  <p className="text-primary "> See all</p>
                  <p className="bg-primary px-2 py-2 w-5 h-5 flex justify-center items-center -mt-3 rounded-full text-white text-[10px]">
                    {joinedCommunities.length}
                  </p>
                </Link>
              </div>
              <ul>
                {communityLinks.map((communityLink) => (
                  <li key={communityLink.href}>
                    <Link to={communityLink.href}>{communityLink.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No communities found.</div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          {user && (
            <button
              disabled={loggingOut}
              className="px-4 py-1 border border-dashed border-red-500 hover:bg-red-400 transition duration-500 hover:text-white text-red-500 rounded-lg"
              onClick={logout}
            >
              {loggingOut ? (
                <LoadingSpinner loadingText={"Logging out..."} />
              ) : (
                "Logout"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Leftbar);
