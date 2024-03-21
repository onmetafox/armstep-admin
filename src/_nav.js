import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApps,
  cilCheck,
  cilContact,
  cilDrop,
  cilNotes,
  cilPeople, cilStar,
  cilTask,
} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle} from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavItem,
    name: 'categories',
    to: '/categories',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Contacts',
    to: '/contacts',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Projects',
    to: '/projects',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Reviews',
    to: '/reviews',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Services',
    to: '/services',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Teams',
    to: '/teams',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'Technologies',
    to: '/technologies',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
]

export default _nav
