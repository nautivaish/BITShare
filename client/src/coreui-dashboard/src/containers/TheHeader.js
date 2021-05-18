import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
// import routes from '../routes'

import "./myheader.css";

const TheHeader = () => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.sidebarShow)


  return (
    <CHeader>
      {/* <CToggler
        inHeader
        className="ml-3 d-md-down-none"
      /> */}
      {/* <CIcon name="cil-arrow" alt="Settings" color="white"/> */}
      {/* was trying to add back icon here ^ */}
      <CHeaderNav className="d-md-down-none mr-auto">
        
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink href="/"><span style={{color: "white"}}>🡄</span></CHeaderNavLink>
        </CHeaderNavItem>
{/* 🡄 🢀 🢠 ⮜ */}
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink href="/" ><span style={{color: "white"}}>Admin Dashboard</span></CHeaderNavLink>
        </CHeaderNavItem>
        {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem> */}
        
      </CHeaderNav>

      {/* <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav> */}

      {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
    </CHeader> 
  )
}

export default TheHeader
