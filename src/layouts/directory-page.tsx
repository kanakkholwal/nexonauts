import styled from "styled-components";



export const DirectoryPageNavBar = styled.nav`

    width:100%;
    padding:1rem 2rem;
    max-width:var(--max-width);
    background:var(--light);
    margin:auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position:relative;
    margin-bottom: 15px;
    border-radius: 50px;
    .Title{
        font-size: 26px;
        font-weight: 600;
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
        transition: all 0.3s ease-in-out;
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
            border-radius: 15px;
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
            /* background-color: rgba(var(--theme-rgb), 0.25); */
            color:rgba(var(--theme-rgb), 01);
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            &:hover{
                background-color: rgba(var(--theme-rgb), 0.1);
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
            display: none;
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
          /* max-width: 48%; */
          flex-direction: column;
          flex: 1 1 280px;    
        
         /* @media (max-width: 768px) {
           padding:0.75rem;
         }
    
         @media (min-width: 992px) {
            max-width: 32%;
         }
    
         @media (min-width: 1400px) {
           max-width: 23.9%;
        } */
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
    --theme-rgb:113, 93, 242;
    --max-width: 1600px;
    background-color: inherit;
`;
export const DirectoryPageHeader = styled.header`
    width:100%;
    padding-top:25px;
    padding-bottom:25rem;
    background-color:rgba(var(--theme-rgb),0.1);
    position: relative;
    z-index: 0;
    `;
export const Wave = styled.div`
        background-repeat:no-repeat;
        background-position-y: bottom;
        background-size: contain;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='99' viewBox='0 0 1200 99' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 47.1131L50 51.437C100 55.7609 200 64.4087 300 60.0848C400 55.7609 500 38.4653 600 23.3316C700 8.1979 800 -4.77383 900 1.71204C1000 8.1979 1100 34.1414 1150 47.1131L1200 60.0848V99H1150C1100 99 1000 99 900 99C800 99 700 99 600 99C500 99 400 99 300 99C200 99 100 99 50 99H0V47.1131Z' fill='rgb(244, 247, 254)' /%3E%3C/svg%3E");  
        width: 100%;
        height: 10rem;
        position: absolute;
        min-width: 100vw;
        inset-inline: 0;
        bottom: 0;
        
    
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

export const SlugPage = styled.div`
    width: 100%;
    margin-inline: auto;
    margin-top: -22rem;
    z-index: 11;
    position: relative;
    border-radius: 30px;
    gap: 5px;
    vertical-align: middle;
    padding:2rem;
  
  

  
    
`;
export const Header = styled.div`
    max-width: calc(var(--max-width) - 3rem);
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap:1rem;
    padding: 1rem;
    .Meta{
        display: inline-flex;
        justify-content: flex-start;
        gap:0.75rem;
        img{
            max-width: 90px !important;
            aspect-ratio: 1;
            height: auto;
            border-radius: 12px;
            overflow: hidden;
            background: var(--card-bg);

        }
        .Info{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
       
        h1{
        font-size: 1.875rem;
        line-height: 2.25rem;
        text-transform: uppercase;
        text-wrap:balance;
        .verify{
            color:rgba(var(--primary-rgb), 1);
            margin-inline: 0.5rem;
        }
     }
     p{
        font-size: .875rem;
    line-height: 1.25rem;
     }
    }
    .Action{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap:0.75rem;
        .ShareBtn{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        border-radius: 50px;
        background-color: rgba(var(--light-rgb), 1);
        color:rgba(var(--theme-rgb), 1);
        font-size: 1.25rem;
        font-weight: 500;
        transition: all 200ms ease;
        transform:scale(1);

        &:active{
            transform:scale(0.8);
        }

    }
            .visit{
                display: flex;
                padding: 0.75rem 1.5rem;
                justify-content: center;
                align-items: center;
                border-radius: 50px;
                font-size: 1.25rem;
                color: var(--light);
                background: rgba(var(--theme-rgb),1);
                &:hover{
                    background: rgba(var(--theme-rgb),0.91);

                }

            }
        }
`;
export const SlugPageSection = styled.section`
max-width: calc(var(--max-width) - 3rem);
width: 100%;
margin: auto;
display: flex;
justify-content: space-between;
align-items: stretch;
gap:1rem;
`;
export const SlugPageMain = styled.main`
        .overview{
            padding:1rem;
            border-radius:0.5rem;
            background: var(--card-bg);
            h6{
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            .content{
                font-weight: 500;
            }
        }
    
`;
export const SlugPageAside = styled.aside`
width: 100%;
max-width:400px;

.tagsWrapper{
        padding:1rem;
        border-radius:0.5rem;
        font-weight: 500;
        background: var(--card-bg);
        margin-bottom: 1rem;
        h6{
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .tags{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
    }
`;

export const SimilarTools = styled.section`
    width: 100%;
    height: auto;
    margin: 2rem auto;
    max-width: 1600px;
    padding: 1rem;
    border-radius: 25px;
    // background-color: rgba(var(--grey-rgb), 0.1);
    .Header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-inline: 1rem;
        margin-bottom: 1rem;
        .Title{
            color:rgba(var(--dark-rgb), 1);
            text-transform: capitalize;
        }
        .ViewAll{
            font-size: 1rem;
            font-weight: 500;
            color:rgba(var(--theme-rgb), 1);
            background:rgba(var(--light-rgb), 1);
            text-transform: capitalize;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            &:hover{
                color:rgba(var(--light-rgb), 0.75);
                background-color: rgba(var(--theme-rgb), 0.8);
            }
        }
    }
    .Tools{
        display:flex;
        justify-content: flex-start;
        align-items: stretch;
        gap:0.75rem;
        flex-wrap:wrap;
        .Tool{
            display:flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            padding:0.75rem;
            background: var(--card-bg);
            border-radius: 12px;
            flex:1 1 360px;
            opacity: 0;
    visibility: hidden;
    transition: all 250ms ease-in-out 0s;
    animation-name: pop;
    animation-duration: 0.83s;
    animation-direction: normal;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

            .CoverImage{
                margin-bottom: 0.5rem;
                img{
                    border-radius: 15px;
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16/9;
                    filter: drop-shadow(1px 1px 5px rgba(var(--dark-rgb),0.1));
                }
            }
            .Name{
                text-transform: capitalize;
                margin-bottom:0.25rem;
            }
            .description{
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                overflow: hidden;
                line-height: 1.25rem;
                max-height: 2.5rem;
                margin-bottom:0.5rem;
            }
        }
    }
`;
export const ShareContainer = styled.div`
    width: 100%;
    .Header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding-bottom:1rem;
        padding-inline: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(var(--dark-rgb), 0.1);
        .CloseBtn{
            font-size: 1.5rem;
            font-weight: 500;
            color:rgba(var(--dark-rgb), 1);
            transition: all 0.3s ease;
            &:hover{
                color:rgba(var(--dark-rgb), 0.75);
            }
        }
    }
    .socials{
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap:wrap;
        gap: 1rem;
        padding: 1rem;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 0.5rem;
            padding:1.8rem 1.75rem;
            aspect-ratio:1;
            border-radius: 15px;
           
            position: relative;
            svg{
                font-size: 1.5rem;
            }
            &:after{
                content:attr(data-social);
                position: absolute;
                inset-inline: 0;
                bottom:0.35rem;
                text-align: center;
                font-family: inherit;
                font-size:12px;
                letter-spacing: 0;
                font-weight: 400;
                text-transform: capitalize;

            }
        }
    }

`;