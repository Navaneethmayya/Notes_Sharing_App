import React from 'react'
import Profile from '../Components/Profile/Profile'
import SearchBar from '../Components/Searchbar/SearchBar'
import Dark_light from '../Components/dark_light_switch/Dark_light'

function AuthorDasboard() {
  return (
    <>
    <div className='flex align-middle justify-around mt-3'>
    <Profile/>
    <SearchBar/>
    <Dark_light/>
    </div>
    </>
  )
}

export default AuthorDasboard