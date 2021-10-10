import React from "react";

import Avatar from "../../shared/components/UIElements/Avatar";
import classes from './UserItem.module.css'

const UserItem: React.FC<{image: string, name: string, placeCount: number, id: string}> = (props) => {
  return (
    <li className={classes['user-item']}>
      <div className='user-item__content'>
        <div className={classes['user-item__image']}>
          <Avatar image={props.image} alt={props.name} />
        </div>
        <div className={classes['user-item__info']}>
          <h2>{props.name}</h2>
          <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
        </div>

      </div>
    </li>
  )
}

export default UserItem;