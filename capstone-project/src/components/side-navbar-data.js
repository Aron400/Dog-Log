import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from "react-icons/ai";
import * as GiIcons from 'react-icons/gi';

export const SideNavbarData = [
    {
        title: 'Feeding',
        path: '/feeding',
        icon: <GiIcons.GiDogBowl />,
        cName: 'nav-text'
    },
    {
        title: 'Walks',
        path: '/walks',
        icon: <FaIcons.FaWalking />,
        cName: 'nav-text'
    },
    {
        title: 'Medical',
        path: '/medical',
        icon: <FaIcons.FaBookMedical />,
        cName: 'nav-text'
    },
]

