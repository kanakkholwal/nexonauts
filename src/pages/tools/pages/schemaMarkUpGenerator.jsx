import Link from "next/link";
import Button ,{IconButton} from "components/buttons";
import CodeBlock from "components/code-block";
import { Select, FormElement,FormGroup, Label,Input } from "components/form-elements";
import { useState,useEffect} from "react";
import { MdDeleteOutline} from "react-icons/md";


export default function HtmlParser() {
    const [html, setHtml] = useState("");
    const [schema, setSchema] = useState("website");



    return (
        <div className="p-2">
            <FormElement>
                <Label>Which <strong className="mx-1">Schema.org</strong>  markup would you like to create?</Label>
                <Select options={options}
                    onChange={(e) => setSchema(e.value)}
                />
            </FormElement>
            <div className="d-flex g-2 align-items-start justify-content-evenly">
                {options.map((option, index) => {
                    if (option.value === schema) {
                        if (option.Component === undefined)
                            return <div key={index}>Not Available yet</div>
                        return <option.Component key={index} setCode={setHtml} />
                    }
                    return null;
                })}
                <div>
                <CodeBlock language="html" data={html} />
                <small>
                    Using React App ? Try <Link href="/tools/html-to-jsx-convertor">HTML to JSX Convertor </Link>
                </small>
                </div>
            </div>



        </div>
    )
}
function Website({setCode}){
    const [name,setName] = useState("");
    const [alternateName,setAlternateName] = useState("");
    const [url,setUrl] = useState("");
    const [searchQuery,setSearchQuery] = useState("");
    const [queryString, setQueryString] = useState("");
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "${name}",
        "alternateName": "${alternateName}",
        "url": "${url}",
        ${searchQuery.length > 0 ? `"potentialAction": {
            "@type": "SearchAction",
            "target": "${searchQuery}{search_term_string}${queryString}",
            "query-input": "required name=search_term_string"
        }`: ""}
    }
</script>`)
    }, [name,alternateName,url,searchQuery,queryString])


    return (
        <div>
            <FormGroup>
                <FormElement>
                    <Label>Website Name</Label>
                    <Input type="text" placeholder="Website Name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    
                                    </FormElement>
                <FormElement>
                    <Label>Alternate Name</Label>
                    <Input type="text" placeholder="Alternate Name"
                    value={alternateName}
                    onChange={(e)=>setAlternateName(e.target.value)}

                     />
                </FormElement>
            </FormGroup>
            <FormElement>
                <Label>Website URL</Label>
                <Input type="url" placeholder="Website URL (include the protocol)" 
                value={url}
                onChange={(e)=>setUrl(e.target.value)}


                />
            </FormElement>
            
            <FormElement>
                <Label>Search Query</Label>
                <Input type="text" placeholder="URL for internal site search before query (e.g. https://example.com/search?q=)"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                
                 />
            </FormElement>
            <FormElement>
                <Label>Query String</Label>
                <Input type="text" placeholder="Optional: string in the search URL occurring after the query"
                value={queryString}
                onChange={(e)=>setQueryString(e.target.value)}
                disabled={searchQuery===""}
                
                 />
            </FormElement>
            
        </div>
    )
}
function Breadcrumbs({setCode}){
    const [items,setItems] = useState([{
        name:"",
        url:"",
        image:""
    }]);
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            ${items.map((item,index)=>{
                return `{
                "@type": "ListItem",
                "position": ${index+1},
                "name": "${item.name}",
                "item": "${item.url}",
                "image": "${item?.image}"
            }`
            })}
        ]
    }
</script>`)
    }, [items])

    return (
    <div>
      {items.map((item,index)=>{
            return (<div key={index}>
            
                <h6 className="ms-3">Item #{index+1}
                <IconButton nature="danger" className="ms-2" onClick={()=>{
                    let temp = [...items];
                    temp.splice(index,1);
                    setItems(temp);
                }}
                disabled={items.length===1}>
                    <MdDeleteOutline/>
                </IconButton></h6>
                <FormGroup>
                    <FormElement>
                        <Label>Item Name</Label>
                        <Input type="text" placeholder="Item Name" 
                        value={item.name}
                        onChange={(e)=>{
                            let temp = [...items];
                            temp[index].name = e.target.value;
                            setItems(temp);
                        }}
                        />
                        
                    </FormElement>
                    <FormElement>
                        <Label>Item URL</Label>
                        <Input type="url" placeholder="Item URL"
                        value={item.url}
                        onChange={(e)=>{
                            let temp = [...items];
                            temp[index].url = e.target.value;
                            setItems(temp);
                        }}
    
                         />
                    </FormElement>
                    <FormElement>
                        <Label>Item Image</Label>
                        <Input type="url" placeholder="Item Image URL"
                        value={item.image}
                        onChange={(e)=>{
                            let temp = [...items];
                            temp[index].image = e.target.value;
                            setItems(temp);
                        }}
    
                         />
                    </FormElement>
                </FormGroup>    
            </div>)})    }
            <Button nature="success" onClick={()=>{
                    let temp = [...items];
                    temp.push({
                        name:"",
                        url:"",
                        image:""
                    });
                    setItems(temp);
                }}>Add Item</Button>
      
    </div>)
}

function Person ({setCode}){
    const [name,setName] = useState("");
    const [alternateName,setAlternateName] = useState("");
    const [url,setUrl] = useState("");
    const [image,setImage] = useState("");
    const [jobTitle,setJobTitle] = useState("");
    const [worksFor,setWorksFor] = useState("");
    const [telephone,setTelephone] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [sameAs,setSameAs] = useState("");
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "${name}",
        "alternateName": "${alternateName}",
        "url": "${url}",
        "image": "${image}",
        "jobTitle": "${jobTitle}",
        "worksFor": "${worksFor}",
        "telephone": "${telephone}",
        "email": "${email}",
        "address": "${address}",
        "sameAs": [${sameAs.split(",").map((item)=> `"${item.trim()}"`)}],
    },
</script>`)
    }, [name,alternateName,url,image,jobTitle,worksFor,telephone,email,address,sameAs])
    return (
        <div>
            <FormGroup>
                <FormElement>
                    <Label>Name</Label>
                    <Input type="text" placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Alternate Name</Label>
                    <Input type="text" placeholder="Alternate Name"
                    value={alternateName}
                    onChange={(e)=>setAlternateName(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>URL</Label>
                    <Input type="url" placeholder="URL"
                    value={url}
                    onChange={(e)=>setUrl(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Image</Label>
                    <Input type="url" placeholder="Image URL"
                    value={image}
                    onChange={(e)=>setImage(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Job Title</Label>
                    <Input type="text" placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e)=>setJobTitle(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Works For</Label>
                    <Input type="text" placeholder="Works For"
                    value={worksFor}
                    onChange={(e)=>setWorksFor(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Telephone</Label>
                    <Input type="tel" placeholder="Telephone"
                    value={telephone}
                    onChange={(e)=>setTelephone(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Address</Label>
                    <Input type="text" placeholder="Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Same As</Label>
                    <Input type="url" placeholder="Same As"
                    value={sameAs}
                    onChange={(e)=>setSameAs(e.target.value)}
                    />
                </FormElement>
            </FormGroup>
        </div>
    )

}
const options = [
    {
        value: "website",
        label: "Website",
        Component:Website
    },
    {
        value: "breadcrumbs",
        label: "Breadcrumbs",
        Component:Breadcrumbs
    },
    {
        value: "person",
        label: "Person",
        Component:Person
    },
    {
        value: "organization",
        label: "Organization"
    },
    {
        value: "local_business",
        label: "Local Business"
    },
    {
        value: "article",
        label: "Article"
    },
    {
        value: "product",
        label: "Product"
    },
    {
        value: "event",
        label: "Event"
    },
    {
        value: "recipe",
        label: "Recipe"
    },
    {
        value: "job_posting",
        label: "Job Posting"
    },
    {
        value: "video",
        label: "Video"
    },
    {
        value: "faqpage",
        label: "FAQPage"
    }
]