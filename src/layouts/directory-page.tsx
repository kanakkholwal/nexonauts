import styled from "styled-components";



export const DirectoryPageNavBar = styled.nav`
    width: 100%;
    padding:1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    position:relative;
    .Title{
        font-size: 30px;
        font-weight: 700;
        color: var(--text-color);
        margin-right: auto;
    }
    .LinkList{
        display: flex;
        gap: 20px;
        align-items: center;
        margin-inline:auto 2rem;
        a{
            font-size: 16px;
            font-weight: 500;
            color: var(--text-color);
            transition: all 0.3s ease;
            &:hover{
                color: var(--theme);
            }
        }
        @media screen and (max-width: 768px) {
            position: absolute;
                top: 100%;
                right: 0;
                pointer-events: none;
            transform-origin:top right;
            display: flex;
            border-radius: 25px;
            flex-direction: column;
           
            background-color: rgba(var(--light-rgb), 0.9);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 0 10px rgba(var(--dark-rgb), 0.25);
            translation: transform 300ms ease-in-out;
            transform: scale(0);
            gap: 10px;
            a{
                font-weight: 500;
                color: var(--dark);
                transition: all 0.3s ease;
                &:hover{
                    color: var(--theme);
                }
            }
            &.show{
                transform: scale(1);
                pointer-events: auto;
        }
    }
    }
    .Submit{
        padding: 0.5rem 1.5rem;
        border-radius: 25px;
        background-color: rgba(var(--theme-rgb), 0.25);
        color:rgba(var(--dark-rgb), 01);
        font-size: 16px;
        font-weight: 500;
        transition: all 0.3s ease;
        &:hover{
            background-color: rgba(var(--theme-rgb), 0.5);
        }
    }
    .toggler{
        display: none;
        @media screen and (max-width: 768px) {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
`;

export const DirectoryPageHero = styled.div`
    width: 100%;
    height: auto;
    min-height: 50vh;
    background-color: rgba(var(--theme-rgb), 0.5);
    border-radius: 50px;
    vertical-align: middle;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 2rem;
    /* background: linear-gradient(rgba(var(--theme-rgb), 0.5), rgba(var(--theme-rgb), 0.5)), url("assets/backgrounds/dashboard.jpg"); */
    /* background-size: cover; */
    background-repeat: no-repeat;
    --text-color: rgba(var(--light-rgb), 1);
    color:rgba(var(--light-rgb), 0.9);
    &>div:not(.illustration){
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        gap: .25rem;
    }
    .title{
        font-size: 3rem;
        font-weight: 700;
        line-height: 3.5rem;
        max-width: 720px;
        text-transform: uppercase;
        text-wrap:balance;
        margin-block:auto 1rem;
        @media screen and (max-width: 920px) {
            font-size: 2.5rem;
            line-height: 3rem;

        }
    }
    .description{
     font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5rem;
        max-width: 720px;
        @media screen and (max-width: 920px) {
            font-size: 1rem;
            line-height: 1.25rem;
        }
    }

    .SubmitYourTool{
        padding: 0.75rem 1.75rem;
        border-radius: 50px;
        background-color: rgba(var(--light-rgb), 1);
        color:rgba(var(--theme-rgb), 1);
        font-size: 1.25rem;
        font-weight: 500;
        text-transform:capitalize;
        transition: all 0.3s ease;
        margin-block: auto 2rem;
        display:flex;
        align-items: center;
        justify-content: center;
        gap:0.25rem;
    }
    .illustration{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: .25rem;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
`;
export const DirectoryPageSearchContainer = styled.div`
    width: 100%;
    border-radius: 25px;
    background-color: rgba(var(--grey-rgb), .1);
    padding: 1rem;
    margin-top: 5rem;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    input{
        border-radius:50px!important;
    }
    .SearchBar{
        position: relative;
        .SearchButton{
            position: absolute;
            inset-block:-1px 0;
            inset-inline-start:-2px;
            padding: 8px 10px;
            width:36px;
            height:36px;
            translate: 0.5rem 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgba(var(--grey-rgb), .1);

        }
        input{
            border-radius:50px!important;
            padding-left: 2.75rem!important;
            background-color: rgba(var(--light-rgb), 1);

        }
    }


`;
export const DirectoryPageSearchResults = styled.div`
    width: 100%;
    margin-top: 2rem;
    background-color: rgba(var(--grey-rgb), .1);
    padding: 1rem;
    border-radius: 20px;
    height:100%;
    min-height: 50vh;
    .Results{
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
        padding-top:1rem;

        .SearchResult{
        max-width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        background-color: rgba(var(--light-rgb), 1);
        border-radius: 20px;
        padding: 1rem;
        gap: 12px;
        flex:1 1 auto;
        opacity: 0;
        transform: translateY(20px);
        animation: slide-up 500ms ease-in-out forwards;
        transition: all 0.3s ease;
        @keyframes slide-up {
            0% {
                transform: translateY(20px);
                opacity: 0;
            }
            100% {
                transform: translateY(0px);
                opacity: 1;
            }
        }
        
        &>div{
            flex: 1 1 auto;
            overflow: hidden;
            max-width: 100%;
        }
        img{
            width: 100%;
            max-width: 350px;
            height:auto;
            aspect-ratio: 16/9;
            border-radius: 10px;
            border: 1px solid rgba(var(--grey-rgb), 0.1);        
        }

        p{
            font-size: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            text-wrap:balance;
            overflow: hidden;
            max-height: 3.5rem;
            margin-bottom: 1rem;
            width:100%;
        }
        .Meta{
            display: flex;
            justify-content:flex-start;
            align-items: center;
            gap: 0.20rem;
            margin-bottom:0.75rem;
            .pricing_type{
                padding: 0.125rem 0.5rem;
                border-radius: 25px;
                background-color: rgba(var(--theme-rgb), 0.25);
                color:rgba(var(--dark-rgb), 01);
                font-size: 12px;
                font-weight: 500;
                text-transform: capitalize;
            }
        }
        .actions{
            display: flex;
            gap:0.5rem;
        }
        .CheckOut{
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            background-color: rgba(var(--theme-rgb), 0.25);
            color:rgba(var(--dark-rgb), 01);
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            &:hover{
                background-color: rgba(var(--theme-rgb), 0.5);
            }
        }
        .TryOut{
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            background-color: rgba(var(--theme-rgb), 0.25);
            color:rgba(var(--dark-rgb), 01);
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            &:hover{
                background-color: rgba(var(--theme-rgb), 0.5);
            }
        }
        @media screen and (width <= 920px) {
            flex-wrap: wrap;
            img{ max-width: 100%;}
        }
    }
        &.grid{     
        max-width: 100%;
        .SearchResult{
          max-width: 48%;
          flex-direction: column;
          flex: 0 1 auto;    
        
         @media (max-width: 768px) {
           padding:0.75rem;
         }
    
         @media (min-width: 992px) {
            max-width: 32%;
         }
    
         @media (min-width: 1400px) {
           max-width: 23.9%;
        }
        img{
            width: 100%;
            margin: auto;
            aspect-ratio: 16/9;
        }
        .actions{
            flex-direction: column;
        }
        .CheckOut,.TryOut{
            width:100%;
        }
    }
}
}
    
    .info{
        display: flex;
        width:100%;
        align-items: center;
        justify-content: space-between;
        gap:0.5rem;
        .count{
            font-size: 1rem;
            font-weight: 500;
            color:rgba(var(--dark-rgb), 1);
        }
        .line{
            flex: 1 1 auto;
            height: 1px;
            background-color: rgba(var(--grey-rgb), 0.25);
            vertical-align: middle;
        }
        .options{
            display: flex;
            align-items: center;
            .layout{
                padding: 0.25rem 0.5rem;
                border-radius: 10px;
                background-color: rgba(var(--light-rgb), 1);
                font-size: 16px;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.125rem;
                .grid, .list{
                    padding:2px 6px;
                    border-radius: 5px;
                    color:rgba(var(--dark-rgb), 1);
                    &.active{
                        background-color: rgba(var(--theme-rgb), 0.5);
                        color:rgba(var(--light-rgb), 1);
                    }
                }
            }
        }
    }
    .footer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1rem;
        .page{
            font-size: 16px;
            font-weight: 500;
            color:rgba(var(--dark-rgb), 1);
            
        }
        .prev,.next{
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            background-color: rgba(var(--light-rgb), 1);
            color:rgba(var(--dark-rgb), 01);
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease-in-out;
        }
    }
    .NoMoreResults{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        color:rgba(var(--dark-rgb), 1);
    }
    
`;
export const DirectoryPageSearchFilters = styled.div`
    width: 30%;
    margin-top: 2rem;
    background-color: rgba(var(--grey-rgb), .1);
    padding: 1rem;
    border-radius: 20px;
    height:100%;
    min-height: 25vh;
    position: sticky;
    top: 10px;

    .Filter{
        margin:0;
    }
    @media screen and (max-width: 1048px) {
        display:none;

    }
`;
export const DirectoryPageContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    max-width: 1600px;
    padding: 1rem;
`;

export const GoToTop = styled.div`

    position: fixed;
    bottom: 3rem;
    right: 2rem;
    z-index: 1000;
    background-color: rgba(var(--light-rgb), 1);
    color:rgba(var(--dark-rgb), 1);
    padding: 1rem;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    aspect-ratio: 1;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 10px rgba(var(--dark-rgb), 0.25);
    &:hover{
        background-color: rgba(var(--theme-rgb), 1);
        color:rgba(var(--light-rgb), 1);
    }
    
    `;

export const SubmitToolContainer = styled.div`
    width: 100%;
    padding: 1rem;
    border-radius: 25px;
    background-color: rgba(var(--light-rgb), 1);
    margin: auto;
    max-width: 768px;
    .Title{
        font-size: 24px;
        font-weight: 600;
        color:rgba(var(--dark-rgb), 1);
        margin-bottom: 1rem;
        text-transform: capitalize;
        text-align:center;
    }
    .subtitle{
        font-size: 16px;
        font-weight: 500;
        /* color:rgba(var(--dark-rgb), 1); */
        margin-bottom: 1rem;
        text-align:center;
        text-wrap:balance;
    }
    .footer{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        .spinner{
            font-size: 24px;
            aspect-ratio: 1;
            color:rgba(var(--theme-rgb), 1);
            svg{
                display: none;
            }
            &.loading > svg{
                display: inline-block;
                animation: spin 1s linear infinite;
            }
            

        }

    }
`;