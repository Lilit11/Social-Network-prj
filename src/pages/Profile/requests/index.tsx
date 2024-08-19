import { Link, useOutletContext } from "react-router-dom";
import { IContext, IRequests, IUser } from "../../../helpers/types";
import { useEffect, useState } from "react";
import { getRequests, handleRequestAccept } from "../../../helpers/api";
import { BASE, DEF } from "../../../helpers/default";

export const Requests =()=>{
    const [requests, setRequests] = useState<IRequests[]>([]);

    useEffect(()=>{
        getRequests()
        .then(response=>{ 
         
           setRequests(response.payload as IRequests[])        
        })
    },[])

    const acceptRequest =(id:number)=>{
        handleRequestAccept(id)
        .then(response=>{
           setRequests(requests.filter(req => req.id != id))
            
        })
    }
    const declineRequest =(id:number)=>{
        handleRequestAccept(id)
        .then(response=>{
           setRequests(requests.filter(req => req.id != id))
            
        })

    }
    return<>
  
        <h1>You have {requests.length} request{requests.length > 1 ? "s":""}</h1>
        <div className="row">
            {
                requests.map(u =>
                <div className="col-md-3" key ={u.id}>
                    <img
                    className="profile-pic"
                    src={
                        u.user.picture ?
                        BASE+u.user.picture:DEF
                    }  />
                    <p>{u.user.name} {u.user.surname}</p>
                    <Link to={'/profile/'+u.user.id}>account  </Link>
                    <div>
                        <br/>
                    <button className="btn btn-primary btn-sm" onClick={()=>acceptRequest(u.id)}>accept</button>
                    <span>               </span>
                    <button className="btn btn-primary btn-sm" onClick={()=>declineRequest(u.id)}>decline</button>
                    </div>
                    
                </div>)
            }   
        </div>
    </>
}