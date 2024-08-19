import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/types";
import { getFollowers } from "../../../helpers/api";
import { Link } from "react-router-dom";
import { BASE, DEF } from "../../../helpers/default";

export const Followers = () => {
  const [followers, setFollowers] = useState<IUser[]>([]);
  useEffect(() => {
    getFollowers().then((response) => {
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
