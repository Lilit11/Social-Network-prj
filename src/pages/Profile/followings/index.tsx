import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/types";
import { getFollowings } from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";
import { Link } from "react-router-dom";

export const Followings = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);
  useEffect(() => {
    getFollowings().then((response) => {
      setFollowers(response.payload as IUser[]);
    });
  });
  return (
    <>
      <div className="row">
        {followers.map((u) => (
          <div className="col-md-3" key={u.id}>
            <img
              className="profile-pic"
              src={u.picture ? BASE + u.picture : DEF}
            />
            <p>
              {u.name} {u.surname}
            </p>
            <Link to={"/profile/" + u.id}>account </Link>
          </div>
        ))}
      </div>
    </>
  );
};
