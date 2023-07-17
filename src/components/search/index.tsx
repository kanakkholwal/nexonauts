import { 
    SearchContainer,
    StyledHeading,
    StyledSubHeading,
    StyledForm,
    StyledInput,
    StyledButton,
    Suggestions
} from "./components";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";


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

    
    const handleSearch = async (query:string) => {
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
    }



    return (
        <>
            <SearchContainer>
                <StyledHeading>
                    Search for Apps
                </StyledHeading>
                <StyledSubHeading>
                    Find perfect apps for your needs
                </StyledSubHeading>
                <StyledForm onSubmit={(e) =>{
                    e.preventDefault();
                    handleSearch(query);
                }}>
                    <StyledButton type="submit">
                        <TbSearch/>
                    </StyledButton>
                    <StyledInput type="text" placeholder={placeholder} 
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        value={query}
                        />
                </StyledForm>
                {popular && popular.length > 0 && (<Suggestions>
                    <span>
                    Popular Searches : 
                    </span>
                    {popular.map((item, index) => {
                        return (
                            <span key={index}
                            onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                                setQuery(item.name);
                            }}
                            >
                                {item.name}
                            </span>) })}

                </Suggestions>)}
            </SearchContainer>

        </>
    )
}