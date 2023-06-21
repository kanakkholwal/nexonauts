import Link from "next/link";
import Button ,{IconButton} from "components/buttons";
import CodeBlock from "components/code-block";
import { Select, FormElement,FormGroup, Label,Input,CheckBox } from "components/form-elements";
import AutoComplete from "components/form-elements/AutoComplete";
import { useState,useEffect} from "react";
import { MdDeleteOutline} from "react-icons/md";
import axios from "axios";


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


function Article({setCode}){
    const [type, setType] = useState("Select Type...");
    const [headline,setHeadline] = useState("");
    const [isAMP,setIsAMP] = useState(false);
    const [image,setImage] = useState("");
    const [width,setWidth] = useState("");
    const [height,setHeight] = useState("");
    const [author,setAuthor] = useState("");
    const [publisher,setPublisher] = useState("");
    const [datePublished,setDatePublished] = useState("");
    const [dateModified,setDateModified] = useState("");
    const [description,setDescription] = useState("");
    const [articleBody,setArticleBody] = useState("");
    const [url,setUrl] = useState("");
    const [sameAs,setSameAs] = useState("");
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "${type}",
        "headline": "${headline}",
        "image": {
            "@type": "ImageObject",
            "url": "${image}"
            "width": "${width}",
            "height": "${height}"
        },
        ${isAMP ? `
        "author":{
            "@type": "Person",
            "name": "${author}"
        },
        "publisher": "${publisher}",
        "datePublished": "${datePublished}",
        "dateModified": "${dateModified}",
        "description": "${description}",
        "articleBody": "${articleBody}",
        "url": "${url}",
        "sameAs": [${sameAs.split(",").map((item)=> `"${item.trim()}"`)}],`:""}
    },
</script>`)
    }, [headline,image,author,publisher,datePublished,dateModified,description,articleBody,url,sameAs,type,width,height,isAMP])
    return (
        <div>
            <FormElement>
                <Label>Type</Label>
                <Select 
                onChange={(option) => setType(option.value)} options={[
                    { value: "BlogPosting", label: "BlogPosting" },
                    { value: "NewsArticle", label: "NewsArticle" },
                ]} />
            </FormElement>
            <FormGroup>
                <FormElement>
                    <Label>Headline</Label>
                    <Input type="text" placeholder="Headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                    />
                </FormElement>
               
                <FormElement>
                    <CheckBox 
                        checked={!isAMP ? true : false}
                        onChange={
                            (e) => {
                                
                                    setIsAMP(!e.target.checked)
                            }
                        }

                        id="isAmp"
                    />
                    <Label htmlFor="isAmp">Accelerated Mobile Page (AMP)?</Label>
                </FormElement>
                <FormElement>
                    <Label>Image</Label>
                    <Input type="url" placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Width</Label>
                    <Input type="number" placeholder="Image Width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Height</Label>
                    <Input type="number" placeholder="Image Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Author</Label>
                    <Input type="text" placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Publisher</Label>
                    <Input type="text" placeholder="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Date Published</Label>
                    <Input type="date" placeholder="Date Published"
                        value={datePublished}
                        onChange={(e) => setDatePublished(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Date Modified</Label>
                    <Input type="date" placeholder="Date Modified"
                        value={dateModified}
                        onChange={(e) => setDateModified(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Description</Label>
                    <Input type="text" placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Article Body</Label>
                    <Input type="text" placeholder="Article Body"
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>URL</Label>
                    <Input type="url" placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Same As</Label>
                    <Input type="url" placeholder="Same As"
                        value={sameAs}
                        onChange={(e) => setSameAs(e.target.value)}
                    />
                </FormElement>
            </FormGroup>
        </div>
    )

}
function  Product({setCode}) {
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [description,setDescription] = useState("");
    const [brand,setBrand] = useState("");

    const [types,setTypes] = useState([]);
    const [sku,setSku] = useState("");
    const [gtin8,setGtin8] = useState("");
    const [gtin13,setGtin13] = useState("");
    const [gtin14,setGtin14] = useState("");
    const [mpn,setMpn] = useState("");
    const [url,setUrl] = useState("");
    const [currencies,setCurrencies] = useState([]);
    const [offers,setOffers] = useState({
        price: "",
        priceCurrency: "",
        priceValidUntil: "",
        lowPrice: "",
        type: "Offer",
        url:"",
        itemCondition:"",
        availability:"",
    });
    const [aggregateRating,setAggregateRating] = useState({
        ratingValue: "",
        bestRating: "",
        worstRating: "",
        ratingCount: ""
    });
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${name}",
        "image": "${image}",
        "description": "${description}",
        "brand": {
            "@type": "Brand",
            "name": "${brand}"
        },
        "url": "${url}",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "${aggregateRating.ratingValue}",
            "bestRating": "${aggregateRating.bestRating}",
            "worstRating": "${aggregateRating.worstRating}",
            "ratingCount": "${aggregateRating.ratingCount}"
          }
        "offers": {
            "@type": "${offers.type}",
            "priceCurrency": "${offers.priceCurrency}",
            "lowPrice": "${offers.lowPrice}",${offers.type === "Offer" ?`\n            "priceValidUntil": "${offers.priceValidUntil}",`:""}${offers.type === "Offer" ?`\n            "url": "${offers.url}",`:""}${offers.type === "Offer" ?`\n            "availability": "http://schema.org/${offers.availability}",`:""}${offers.type === "Offer" ?`\n            "itemCondition": "http://schema.org/${offers.itemCondition}",`:""}
          },${types.find(type => type.value === "sku") ? `\n        "sku": "${sku}",` :""}${types.find(type => type.value === "gtin8") ? `\n        "gtin8": "${gtin8}",`:""}${types.find(type => type.value === "gtin13") ? `\n        "gtin13": "${gtin13}",`:""}${types.find(type => type.value === "gtin14") ? `\n        "gtin14": "${gtin14}",`:""}${types.find(type => type.value === "mpn") ?`"mpn": "${mpn}",`:""}
    },
</script>`)
    }, [name,image,description,brand,sku,gtin8,gtin13,gtin14,mpn,url,offers,types,aggregateRating])

    useEffect(() => {
        (async() =>{
            await axios.get("https://openexchangerates.org/api/currencies.json")
            .then(({data}) => {
                setCurrencies(Object.entries(data).map(
                    ([key, value]) => {
                        return {
                            value: key,
                            label: `${key} - ${value}`
                        }
                    }
                ));
            })
            .catch((err) =>{
                console.log(err);
            })

        })();

    },[])
    return (
        <div>
        <FormGroup>

            <FormElement>
                <Label>Name</Label>
                <Input type="text" placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormElement>
            <FormElement>
                <Label>Image</Label>
                <Input type="url" placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </FormElement>
            <FormElement>
                <Label>Description</Label>
                <Input type="text" placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FormElement>
              <FormElement>
                <Label>Brand</Label>
                <Input type="text" placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
            </FormElement>  
              <FormElement>
                <Label>URL</Label>
                <Input type="url" placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </FormElement>
            <FormElement>
                <Label>Types</Label>
                <AutoComplete 
                placeholder="Types"
                        options={[
                            {
                                value: "sku",
                                label: "SKU"
                            }
                            , {
                                value: "gtin8",
                                label: "GTIN-8"
                            },
                            {
                                value: "gtin13",
                                label: "GTIN-13"
                            },
                            {
                                value: "gtin14",
                                label: "GTIN-14"
                            }
                            , {
                                value: "mpn",
                                label: "MPN"

                            }
                        ]}
                    multiple={true}
                 onChange={(options) => {
                    setTypes(options)
                 }}


                />
            </FormElement>
      
           {types.some(type => type.value === "sku") && <FormElement>
                <Label>SKU</Label>
                <Input type="text" placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                />
            </FormElement>}
           {types.some(type => type.value === "gtin8") && <FormElement>
                <Label>GTIN-8</Label>
                <Input type="text" placeholder="GTIN-8"
                    value={gtin8}
                    onChange={(e) => setGtin8(e.target.value)}
                />
            </FormElement>}
          {types.some(type => type.value === "gtin13") &&  <FormElement>
                <Label>GTIN-13</Label>
                <Input type="text" placeholder="GTIN-13"
                    value={gtin13}
                    onChange={(e) => setGtin13(e.target.value)}
                />
            </FormElement>}
            {types.some(type => type.value === "gtin14") && <FormElement>
                <Label>GTIN-14</Label>
                <Input type="text" placeholder="GTIN-14"
                    value={gtin14}
                    onChange={(e) => setGtin14(e.target.value)}
                />
            </FormElement>}
           {types.some(type => type.value === "mpn") &&  <FormElement>
                <Label>MPN</Label>
                <Input type="text" placeholder="MPN"
                    value={mpn}
                    onChange={(e) => setMpn(e.target.value)}
                />
            </FormElement>}
        
        <FormGroup>

            <FormElement>
                <Label>Offers</Label>
                <Select 
                    options={[
                        {value:"Offer",label:"Offer"},
                        {value:"AggregateOffer",label:"AggregateOffer"}
                    ]}
                    onChange={(option) => {
                        setOffers((offers) =>{
                            return {
                                ...offers,
                                type:option.value
                            }
                        })
                    }}


                    /> 
                
            </FormElement>
            <FormElement>
                <Label>Select Currency</Label>
                {currencies.length > 0 ? <Select
             
                    options={currencies}
                    onChange={
                        (option) => {
                            
                            setOffers(
                                (offers) => {
                                    return {
                                        ...offers,
                                        priceCurrency: option.value
                                    }
                                }
                            )
                        }
                    }
                        /> :"Loading ..."}
            </FormElement> 
            </FormGroup>

             {offers.type === "Offer" ?<FormGroup>
                <FormElement>
                <Label>Offer Price</Label>
                <Input type="number" placeholder="Offer Price"
                    value={offers.price}
                    onChange={(e) => setOffers((offers) => {
                        return {
                            ...offers,
                            price:e.target.value
                        }
                    }
                    )}
                    />
                </FormElement>
                <FormElement>
                <Label>Offer Price Valid Until</Label>
                <Input type="date" placeholder="Offer Price Valid Until"
                    value={offers.priceValidUntil}
                    onChange={(e) => setOffers((offers) => {
                        return {
                            ...offers,
                            priceValidUntil:e.target.value
                        }
                    }
                    )}
                    />
                </FormElement>
                <FormElement>
                <Label>Offer Item Condition</Label>
                <Select
                    options={[
                        {value:"New",label:"New"},
                        {value:"Used",label:"Used"},
                        {value:"Damaged",label:"Damaged"},
                        {value:"Refurbished",label:"Refurbished"},
                    ]}
                    onChange={(option) => {
                        setOffers((offers) => {
                            return {
                                ...offers,
                                itemCondition:option.value
                            }
                        })
                    }}
                    />
                </FormElement>
                <FormElement>
                <Label>Offer Availability</Label>
                <Select
                    options={[
                        {value:"InStock",label:"InStock"},
                        {value:"InStoreOnly",label:"InStoreOnly"},
                        {value:"OnlineOnly",label:"OnlineOnly"},
                        {value:"OutOfStock",label:"OutOfStock"},
                        {value:"PreOrder",label:"PreOrder"},
                        {value:"PreSale",label:"PreSale"},
                        {value:"LimitedAvailability",label:"LimitedAvailability"},
                        {value:"Discontinued",label:"Discontinued"},
                        {value:"SoldOut",label:"SoldOut"}

                    ]}
                    onChange={(option) => {
                        setOffers((offers) => {
                            return {
                                ...offers,
                                availability:option.value
                            }
                        })
                    }}
                    />
                </FormElement>





             </FormGroup>:null}
         
            <FormGroup>
                <FormElement>
                <Label>Aggregate rating value</Label>
                <Input type="number" placeholder="Aggregate rating value"
                    value={aggregateRating.ratingValue}
                    onChange={(e) => setAggregateRating((aggregateRating) => {
                        return {
                            ...aggregateRating,
                            ratingValue:e.target.value
                        }
                    })}
                    />
                </FormElement>
                <FormElement>
                <Label>Aggregate rating review count</Label>
                <Input type="number" placeholder="Aggregate rating review count"
                    value={aggregateRating.ratingCount}
                    onChange={(e) => setAggregateRating((aggregateRating) => {
                        return {
                            ...aggregateRating,
                            ratingCount:e.target.value
                        }
                    })}
                    />
                </FormElement>
                <FormElement>
                <Label>Aggregate rating best rating</Label>
                <Input type="number" placeholder="Aggregate rating best rating"
                    value={aggregateRating.bestRating}
                    onChange={(e) => setAggregateRating((aggregateRating) => {
                        return {
                            ...aggregateRating,
                            bestRating:e.target.value
                        }
                    })}
                    />
                </FormElement>
                <FormElement>
                <Label>Aggregate rating worst rating</Label>
                <Input type="number" placeholder="Aggregate rating worst rating"
                    value={aggregateRating.worstRating}
                    onChange={(e) => setAggregateRating((aggregateRating) => {
                        return {
                            ...aggregateRating,
                            worstRating:e.target.value
                        }
                    })}
                    />
                </FormElement>

            </FormGroup>
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
    // {
    //     value: "local_business",
    //     label: "Local Business"
    // },
    {
        value: "article",
        label: "Article",
        Component:Article
    },
    {
        value: "product",
        label: "Product",
        Component:Product
    },
    // {
    //     value: "event",
    //     label: "Event"
    // },
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