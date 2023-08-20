import React from 'react'
import {  Box,  styled } from '@mui/material' 
import CardVideo from './CardVideo';


const CardsContainer = styled(Box)` 
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    row-gap:   ${(props) => props.type === "sm" ? '20px' : '35px' } ;
    column-gap: 18px;
    > a {
        text-decoration: none;
    }
    &.sidemaxgap{
        margin-left: 220px;
        ${(props) => props.theme.breakpoints.down('md')} {
            margin-left: 0px;  
        }
    }
    &.sidemingap{
        margin-left: 60px;
        ${(props) => props.theme.breakpoints.down('md')} {
            margin-left: 0px;  
        }
    }
`

const Cards = ({ open, type, videos }) => { 

    return (
        <CardsContainer type={type} className={`${open && type==="lg" ? 'sidemaxgap' : type==="lg" ? 'sidemingap' : "" } `}  >
            {
                videos?.map((video) => {
                    return <CardVideo key={video._id} 
                     video={video}
                     open={open} 
                     type={type} />
                })
            }
            
        </CardsContainer>

    )
}

export default Cards
