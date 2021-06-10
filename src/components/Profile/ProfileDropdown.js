import React from 'react'
import {Dropdown, Icon} from 'semantic-ui-react'

const trigger = (
    <span>
    <Icon name='user'/> {localStorage.getItem('Name')}
  </span>
)

const logOut = event => {
    localStorage.clear();
    props.history.push('/')
}

const options = [
    {key: 'profile', value: 'profile', text: 'Your Profile'},
    {key: 'sign-out', value: 'logout', text: 'Sign Out'},
]

const ProfileDropdown = () => (
    <Dropdown trigger={trigger} options={options}
              onChange={event => logOut(event)}
    />
)

export default ProfileDropdown
