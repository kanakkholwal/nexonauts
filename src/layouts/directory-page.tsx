import styled from "styled-components";



export const DirectoryPageNavBar= styled.nav`
    width: 100%;
    padding:1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    .Title{
        font-size: 30px;
        font-weight: 700;
        color: var(--text-color);
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
`;

export const DirectoryPageHero = styled.div`
    width: 100%;
    height: auto;
    min-height: 50vh;
    background-color: rgba(var(--grey-rgb), 0.25);
    border-radius: 50px 50px 0 0;
    vertical-align: middle;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 2rem;
    background: linear-gradient(rgba(var(--theme-rgb), 0.5), rgba(var(--theme-rgb), 0.5)), url("assets/backgrounds/dashboard.jpg");
    /* background-size: cover; */
    background-repeat: no-repeat;
    --text-color: rgba(var(--light-rgb), 1);
    color:rgba(var(--light-rgb), 0.9);
    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: .25rem;
    }
    .description{
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.75rem;
        max-width: 720px;
    }

    .SubmitYourTool{
        padding: 0.75rem 1.75rem;
        border-radius: 50px;
        background-color: rgba(var(--theme-rgb), 1);
        color:rgba(var(--light-rgb), 1);
        font-size: 1.25rem;
        font-weight: 500;
        transition: all 0.3s ease;
        margin-top:1.75rem;
    }
    .illustration{
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    background-color: rgba(var(--grey-rgb), .1);
    padding: 1rem;
    border-radius: 20px;
    height:100%;
    min-height: 50vh;
    .SearchResult{
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        background-color: rgba(var(--light-rgb), 1);
        border-radius: 20px;
        padding: 1rem;
        gap: 1rem;
      
        img{
            width: 100%;
            max-width: 350px;
            height:auto;
            border-radius: 10px;
            border: 1px solid rgba(var(--grey-rgb), 0.1);

        
        }
        p{
            font-size: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
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
            }
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
`;
export const DirectoryPageContainer= styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    max-width: 1600px;
    padding: 1rem;
`;