import { SearchContainer,
    StyledHeading,
    StyledSubHeading,
    StyledForm,
    StyledInput,
    StyledButton

} from "./components";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";
import { 
    debounce,
 } from "lodash";

export default function Search({
    placeholder,
    popular,
    ...props
}) {
    // use debounce to prevent the API from being called too often from the search input field use endpoint https://api.github.com/users/${username}

    const [query, setQuery] = useState("");
    const [apps, setApps] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(popular);

    const handleSearch = debounce(async (query:string) => {
        if(query.length > 0){
            setLoading(true);
            try{
                const response = await fetch(`/api/apps/search?query=${query}`);
                const data = await response.json();
                if(data.success === true){
                    setApps(data.apps);
                    console.log(data);
                    setError(null);
                }
            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
    }, 500);



    return (
        <>
            <SearchContainer>
                <StyledHeading>
                    Search for Apps
                </StyledHeading>
                <StyledSubHeading>
                    Find perfect apps for your needs
                </StyledSubHeading>
                <StyledForm>
                    <StyledInput type="text" placeholder={placeholder} 
                        onChange={(e) => {
                            setQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        value={query}
                    />
                    <StyledButton type="submit">
                            <TbSearch/>
                    </StyledButton>
                </StyledForm>
                {popular && popular.length > 0 && (<>
                    Popular Searches: 
                    {popular.map((item, index) => {
                        return (
                            <span key={index}
                            onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                                setQuery(item.name);
                                handleSearch(item.name);
                            }}
                            >
                                {item.name}
                            </span>) })}

                </>)}
            </SearchContainer>

        </>
    )
}