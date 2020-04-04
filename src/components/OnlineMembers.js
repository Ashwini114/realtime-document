import React from "react"
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';


const OnlineMembers = ({classes,onlineUsers}) =>{
    let tabs = [...onlineUsers];
    let showAvatar = tabs.splice(0,4).map((item,index)=>{
        let color = (index % 2 ==0)?classes.orange:classes.purple;
        return(
            <div key={index}>
            <Tooltip title={item.first_name+" "+item.last_name} aria-label="add" >
           
                <Avatar className={color}>{item.first_name[0].toUpperCase()}</Avatar>
           
            </Tooltip>
            </div>
        )
    }
    )
    let showCount =  <Avatar >+{onlineUsers.length-4}</Avatar>
    return(
        <div className={classes.avatarClass}>
        {showAvatar}
        {(onlineUsers.length > 4)?showCount:""}


     
        </div>
    )
}

export default OnlineMembers