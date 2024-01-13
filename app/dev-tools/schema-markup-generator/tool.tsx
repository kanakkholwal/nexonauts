"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioStyle } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import CodeBlock from "components/code-block";
import { FormElement, FormGroup } from "components/form-elements";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";


export default function HtmlParser() {
    const [html, setHtml] = useState("");
    const [schema, setSchema] = useState("website");



    return (
        <div className="p-2">

            <div className="d-flex g-2 align-items-start justify-content-evenly">
                <Tabs defaultValue="website">
                    <Card>
                        <CardHeader>
                            <TabsList className="py-3 h-12">
                                {options.map((option, index) => {
                                    return <TabsTrigger key={index} value={option.value} className="h-10">{option.label}</TabsTrigger>
                                })}
                            </TabsList>
                        </CardHeader>
                        <CardContent>
                            <TabsContent value="website">
                                <Website setCode={setHtml} />
                            </TabsContent>
                            <TabsContent value="breadcrumbs">
                                <Breadcrumbs setCode={setHtml} />
                            </TabsContent>
                            <TabsContent value="person">
                                <Person setCode={setHtml} />
                            </TabsContent>
                            <TabsContent value="article">
                                <Article setCode={setHtml} />
                            </TabsContent>
                            <TabsContent value="product">
                                <Product setCode={setHtml} />
                            </TabsContent>
                        </CardContent>
                        <CardFooter>
                            <div className="w-full">
                                <CodeBlock language="html" data={html}  />
                                <p className="text-xs">
                                    Using <span className="text-primary">React.js / Next.js App ?</span>  Try <Link href="/tools/html-to-jsx-convertor" className="hover:underline text-primary">HTML to JSX Convertor </Link>
                                </p>
                            </div>

                        </CardFooter>
                    </Card>
                </Tabs>

            </div>



        </div>
    )
}
function Website({ setCode }) {
    const [name, setName] = useState("");
    const [alternateName, setAlternateName] = useState("");
    const [url, setUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
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
    }, [name, alternateName, url, searchQuery, queryString])


    return (
        <div>
            <FormGroup>
                <FormElement>
                    <Label>Website Name</Label>
                    <Input variant="ghost" type="text" placeholder="Website Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </FormElement>
                <FormElement>
                    <Label>Alternate Name</Label>
                    <Input variant="ghost" type="text" placeholder="Alternate Name"
                        value={alternateName}
                        onChange={(e) => setAlternateName(e.target.value)}

                    />
                </FormElement>
            </FormGroup>
            <FormElement>
                <Label>Website URL</Label>
                <Input variant="ghost" type="url" placeholder="Website URL (include the protocol)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}


                />
            </FormElement>

            <FormElement>
                <Label>Search Query</Label>
                <Input variant="ghost" type="text" placeholder="URL for internal site search before query (e.g. https://example.com/search?q=)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                />
            </FormElement>
            <FormElement>
                <Label>Query String</Label>
                <Input variant="ghost" type="text" placeholder="Optional: string in the search URL occurring after the query"
                    value={queryString}
                    onChange={(e) => setQueryString(e.target.value)}
                    disabled={searchQuery === ""}

                />
            </FormElement>

        </div>
    )
}
function Breadcrumbs({ setCode }) {
    const [items, setItems] = useState([{
        name: "",
        url: "",
        image: ""
    }]);
    useEffect(() => {
        setCode(`<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            ${items.map((item, index) => {
            return `{
                "@type": "ListItem",
                "position": ${index + 1},
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
            {items.map((item, index) => {
                return (<div key={index}>

                    <h6 className="ms-3 text-lg flex items-center gap-2  font-semibold">Item #{index + 1}
                        <button className={"p-1 " + (items.length === 1 ? " text-red-200 cursor-not-allowed" : "text-red-600 cursor-pointer ")} onClick={() => {
                            let temp = [...items];
                            temp.splice(index, 1);
                            setItems(temp);
                        }}
                            disabled={items.length === 1}>
                            <MdDeleteOutline className="w-4 h-4" />
                        </button></h6>
                    <hr className="my-2 mb-3" />
                    <FormGroup>
                        <FormElement>
                            <Label>Item Name</Label>
                            <Input variant="ghost" type="text" placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => {
                                    let temp = [...items];
                                    temp[index].name = e.target.value;
                                    setItems(temp);
                                }}
                            />

                        </FormElement>
                        <FormElement>
                            <Label>Item URL</Label>
                            <Input variant="ghost" type="url" placeholder="Item URL"
                                value={item.url}
                                onChange={(e) => {
                                    let temp = [...items];
                                    temp[index].url = e.target.value;
                                    setItems(temp);
                                }}

                            />
                        </FormElement>
                        <FormElement>
                            <Label>Item Image</Label>
                            <Input variant="ghost" type="url" placeholder="Item Image URL"
                                value={item.image}
                                onChange={(e) => {
                                    let temp = [...items];
                                    temp[index].image = e.target.value;
                                    setItems(temp);
                                }}

                            />
                        </FormElement>
                    </FormGroup>
                </div>)
            })}
            <Button size="sm" onClick={() => {
                let temp = [...items];
                temp.push({
                    name: "",
                    url: "",
                    image: ""
                });
                setItems(temp);
            }}>Add Item</Button>

        </div>)
}

function Person({ setCode }) {
    const [name, setName] = useState("");
    const [alternateName, setAlternateName] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [worksFor, setWorksFor] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [sameAs, setSameAs] = useState("");
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
        "sameAs": [${sameAs.split(",").map((item) => `"${item.trim()}"`)}],
    },
</script>`)
    }, [name, alternateName, url, image, jobTitle, worksFor, telephone, email, address, sameAs])
    return (
        <div>
            <div className="flex gap-2 items-stretch justify-start w-full flex-wrap">
                <FormElement>
                    <Label>Name</Label>
                    <Input variant="ghost" type="text" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Alternate Name</Label>
                    <Input variant="ghost" type="text" placeholder="Alternate Name"
                        value={alternateName}
                        onChange={(e) => setAlternateName(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>URL</Label>
                    <Input variant="ghost" type="url" placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Image</Label>
                    <Input variant="ghost" type="url" placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Job Title</Label>
                    <Input variant="ghost" type="text" placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Works For</Label>
                    <Input variant="ghost" type="text" placeholder="Works For"
                        value={worksFor}
                        onChange={(e) => setWorksFor(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Telephone</Label>
                    <Input variant="ghost" type="tel" placeholder="Telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Email</Label>
                    <Input variant="ghost" type="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Address</Label>
                    <Input variant="ghost" type="text" placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Same As</Label>
                    <Input variant="ghost" type="url" placeholder="Same As"
                        value={sameAs}
                        onChange={(e) => setSameAs(e.target.value)}
                    />
                </FormElement>
            </div>
        </div>
    )

}


function Article({ setCode }) {
    const [type, setType] = useState("Select Type...");
    const [headline, setHeadline] = useState("");
    const [isAMP, setIsAMP] = useState(false);
    const [image, setImage] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [datePublished, setDatePublished] = useState("");
    const [dateModified, setDateModified] = useState("");
    const [description, setDescription] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [url, setUrl] = useState("");
    const [sameAs, setSameAs] = useState("");
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
        "sameAs": [${sameAs.split(",").map((item) => `"${item.trim()}"`)}],` : ""}
    },
</script>`)
    }, [headline, image, author, publisher, datePublished, dateModified, description, articleBody, url, sameAs, type, width, height, isAMP])
    return (
        <div>

            <div
                className="w-full flex flex-wrap gap-2"

            >
                {["NewsArticle", "BlogPosting"].map((item, index) => {
                    return (<label  key={index} className={RadioStyle.label}>
                            {item}
                            <input type="radio"  onChange={(e) => setType(e.target.value)} name="type" value={item} className={RadioStyle.input} />
                        </label>)                  
                })}

            </div>

            <div className="flex items-center space-x-2 my-3">
                <Switch
                    checked={isAMP}
                    onCheckedChange={(value) => {
                        setIsAMP(value)
                    }}
                    id="isAmp"
                />
                <Label htmlFor="isAmp" className="mb-0">Accelerated Mobile Page (AMP)?</Label>
            </div>
            <FormGroup>
                <FormElement>
                    <Label>Headline</Label>
                    <Input variant="ghost" type="text" placeholder="Headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                    />
                </FormElement>

                <FormElement>
                    <Label>Image</Label>
                    <Input variant="ghost" type="url" placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Width</Label>
                    <Input variant="ghost" type="number" placeholder="Image Width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Height</Label>
                    <Input variant="ghost" type="number" placeholder="Image Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </FormElement>
            </FormGroup>

            {isAMP ? <FormGroup>
                <FormElement>
                    <Label>Author</Label>
                    <Input variant="ghost" type="text" placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Publisher</Label>
                    <Input variant="ghost" type="text" placeholder="Publisher"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Date Published</Label>
                    <Input variant="ghost" type="date" placeholder="Date Published"
                        value={datePublished}
                        onChange={(e) => setDatePublished(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Date Modified</Label>
                    <Input variant="ghost" type="date" placeholder="Date Modified"
                        value={dateModified}
                        onChange={(e) => setDateModified(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Description</Label>
                    <Input variant="ghost" type="text" placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Article Body</Label>
                    <Input variant="ghost" type="text" placeholder="Article Body"
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>URL</Label>
                    <Input variant="ghost" type="url" placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Same As</Label>
                    <Input variant="ghost" type="url" placeholder="Same As"
                        value={sameAs}
                        onChange={(e) => setSameAs(e.target.value)}
                    />
                </FormElement>
            </FormGroup> : null}

        </div>
    )

}
const PRODUCT_TYPES = [
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
] as {
    value: string,
    label: string
}[];

function Product({ setCode }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");

    const [types, setTypes] = useState({
        sku: {
            enable: false,
            value: ""
        },
        gtin8: {
            enable: false,
            value: ""
        },
        gtin13: {
            enable: false,
            value: ""
        },
        gtin14: {
            enable: false,
            value: ""
        },
        mpn: {
            enable: false,
            value: ""
        }

    });

    const [url, setUrl] = useState("");
    const [currencies, setCurrencies] = useState<any[]>([]);
    const [offers, setOffers] = useState({
        price: "",
        priceCurrency: "",
        priceValidUntil: "",
        lowPrice: "",
        type: "Offer",
        url: "",
        itemCondition: "",
        availability: "",
    });
    const [aggregateRating, setAggregateRating] = useState({
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
        },
        "offers": {
            "@type": "${offers.type}",
            "priceCurrency": "${offers.priceCurrency}",
            "lowPrice": "${offers.lowPrice}",${offers.type === "Offer" ? `\n            "priceValidUntil": "${offers.priceValidUntil}",` : ""}${offers.type === "Offer" ? `\n            "url": "${offers.url}",` : ""}${offers.type === "Offer" ? `\n            "availability": "http://schema.org/${offers.availability}",` : ""}${offers.type === "Offer" ? `\n            "itemCondition": "http://schema.org/${offers.itemCondition}",` : ""}
        },${Object.keys(types).filter((key) => {
            return types[key].enable && types[key].value.trim().length > 0
        }).map((key) => {
            return `\n        "${key}": "${types[key].value.trim()}"`
        }).join(",")}
    },
</script>`)
    }, [name, image, description, brand, url, offers, types, aggregateRating])

    useEffect(() => {
        (async () => {
            await axios.get("https://openexchangerates.org/api/currencies.json")
                .then(({ data }: {
                    data: any
                }) => {
                    setCurrencies(Object.entries(data).map(
                        ([key, value]) => {
                            return {
                                value: key,
                                label: `${key} - ${value}`
                            }
                        }
                    ));
                })
                .catch((err) => {
                    console.log(err);
                })

        })();

    }, [])
    return (
        <div>
            <FormGroup>

                <FormElement>
                    <Label>Name</Label>
                    <Input variant="ghost" type="text" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Image</Label>
                    <Input variant="ghost" type="url" placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Description</Label>
                    <Input variant="ghost" type="text" placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>Brand</Label>
                    <Input variant="ghost" type="text" placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </FormElement>
                <FormElement>
                    <Label>URL</Label>
                    <Input variant="ghost" type="url" placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </FormElement>
                <div>
                    <Label>Types</Label>
                    <div className="flex gap-2 items-stretch justify-start w-full">

                        {PRODUCT_TYPES.map((item, index) => {
                            return (<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm" key={index}>
                                <div className="space-y-0.5">
                                    <Label htmlFor={item.value}>{item.label}</Label>
                                    <div>
                                        <Input variant="ghost" type="text" placeholder="GTIN-14"
                                            disabled={!types[item.value].enable}
                                            value={types[item.value].value}
                                            onChange={(e) => {
                                                setTypes((types) => {
                                                    return {
                                                        ...types,
                                                        [item.value]: {
                                                            ...types[item.value],
                                                            value: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Switch
                                        id={item.value}
                                        checked={types[item.value].enable}
                                        onCheckedChange={(value) => {
                                            setTypes((types) => {
                                                return {
                                                    ...types,
                                                    [item.value]: {
                                                        ...types[item.value],
                                                        enable: value
                                                    }
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>)
                        })}
                    </div>

                </div>



                <FormGroup>

                    <div className="mb-2">
                        <Label>Offers</Label>
                        <Select onValueChange={(value) => {
                            setOffers((offers) => {
                                return {
                                    ...offers,
                                    type: value
                                }
                            })
                        }}>
                            <SelectTrigger className="w-[180px] ">
                                <SelectValue placeholder="Offer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Offer">Offer</SelectItem>
                                <SelectItem value="AggregateOffer">AggregateOffer</SelectItem>
                            </SelectContent>
                        </Select>



                    </div>
                    <div className="mb-2">
                        <Label>Select Currency</Label>
                        {currencies.length > 0 ? <Select onValueChange={(value) => {
                            setOffers((offers) => {
                                return {
                                    ...offers,
                                    priceCurrency: value
                                }
                            })
                        }}>
                            <SelectTrigger className="w-[280px] bg-slate-100">
                                <SelectValue placeholder="priceCurrency" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((currency, index) => {
                                    return <SelectItem key={index} value={currency.value}>{currency.label}</SelectItem>
                                })}

                            </SelectContent>
                        </Select>
                            : <Input value={"Loading ..."} disabled={true} />}
                    </div>
                </FormGroup>

                {offers.type === "Offer" ? <FormGroup>
                    <FormElement>
                        <Label>Offer Price</Label>
                        <Input variant="ghost" type="number" placeholder="Offer Price"
                            value={offers.price}
                            onChange={(e) => setOffers((offers) => {
                                return {
                                    ...offers,
                                    price: e.target.value
                                }
                            }
                            )}
                        />
                    </FormElement>
                    <FormElement>
                        <Label>Offer Price Valid Until</Label>
                        <Input variant="ghost" type="date" placeholder="Offer Price Valid Until"
                            value={offers.priceValidUntil}
                            onChange={(e) => setOffers((offers) => {
                                return {
                                    ...offers,
                                    priceValidUntil: e.target.value
                                }
                            }
                            )}
                        />
                    </FormElement>
                    <div className="mb-2">
                        <Label>Offer Item Condition</Label>
                        <Select onValueChange={(value) => {
                            setOffers((offers) => {
                                return {
                                    ...offers,
                                    itemCondition: value
                                }
                            })
                        }}>
                            <SelectTrigger className="w-[180px]  bg-slate-100">
                                <SelectValue placeholder="itemCondition" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "New", label: "New" },
                                    { value: "Used", label: "Used" },
                                    { value: "Damaged", label: "Damaged" },
                                    { value: "Refurbished", label: "Refurbished" },
                                ].map((item, index) => {
                                    return <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                                })}

                            </SelectContent>
                        </Select>


                    </div>
                    <div className="mb-2">
                        <Label>Offer Availability</Label>
                        <Select onValueChange={(value) => {
                            setOffers((offers) => {
                                return {
                                    ...offers,
                                    availability: value
                                }
                            })
                        }}>
                            <SelectTrigger className="w-[220px]  bg-slate-100">
                                <SelectValue placeholder="Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "InStock", label: "InStock" },
                                    { value: "InStoreOnly", label: "InStoreOnly" },
                                    { value: "OnlineOnly", label: "OnlineOnly" },
                                    { value: "OutOfStock", label: "OutOfStock" },
                                    { value: "PreOrder", label: "PreOrder" },
                                    { value: "PreSale", label: "PreSale" },
                                    { value: "LimitedAvailability", label: "LimitedAvailability" },
                                    { value: "Discontinued", label: "Discontinued" },
                                    { value: "SoldOut", label: "SoldOut" }
                                ].map((item, index) => {
                                    return <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                                })}
                            </SelectContent>
                        </Select>


                    </div>





                </FormGroup> : null}

                {offers.type === "AggregateOffer" ? <FormGroup>
                    <FormElement>
                        <Label>Aggregate rating value</Label>
                        <Input variant="ghost" type="number" placeholder="Aggregate rating value"
                            value={aggregateRating.ratingValue}
                            onChange={(e) => setAggregateRating((aggregateRating) => {
                                return {
                                    ...aggregateRating,
                                    ratingValue: e.target.value
                                }
                            })}
                        />
                    </FormElement>
                    <FormElement>
                        <Label>Aggregate rating review count</Label>
                        <Input variant="ghost" type="number" placeholder="Aggregate rating review count"
                            value={aggregateRating.ratingCount}
                            onChange={(e) => setAggregateRating((aggregateRating) => {
                                return {
                                    ...aggregateRating,
                                    ratingCount: e.target.value
                                }
                            })}
                        />
                    </FormElement>
                    <FormElement>
                        <Label>Aggregate rating best rating</Label>
                        <Input variant="ghost" type="number" placeholder="Aggregate rating best rating"
                            value={aggregateRating.bestRating}
                            onChange={(e) => setAggregateRating((aggregateRating) => {
                                return {
                                    ...aggregateRating,
                                    bestRating: e.target.value
                                }
                            })}
                        />
                    </FormElement>
                    <FormElement>
                        <Label>Aggregate rating worst rating</Label>
                        <Input variant="ghost" type="number" placeholder="Aggregate rating worst rating"
                            value={aggregateRating.worstRating}
                            onChange={(e) => setAggregateRating((aggregateRating) => {
                                return {
                                    ...aggregateRating,
                                    worstRating: e.target.value
                                }
                            })}
                        />
                    </FormElement>

                </FormGroup> : null}
            </FormGroup>

        </div>
    )

}
const options = [
    {
        value: "website",
        label: "Website",
        Component: Website
    },
    {
        value: "breadcrumbs",
        label: "Breadcrumbs",
        Component: Breadcrumbs
    },
    {
        value: "person",
        label: "Person",
        Component: Person
    },
    // {
    //     value: "organization",
    //     label: "Organization"
    // },
    // {
    //     value: "local_business",
    //     label: "Local Business"
    // },
    {
        value: "article",
        label: "Article",
        Component: Article
    },
    {
        value: "product",
        label: "Product",
        Component: Product
    },
    // {
    //     value: "event",
    //     label: "Event"
    // },
    // {
    //     value: "recipe",
    //     label: "Recipe"
    // },
    // {
    //     value: "job_posting",
    //     label: "Job Posting"
    // },
    // {
    //     value: "video",
    //     label: "Video"
    // },
    // {
    //     value: "faqpage",
    //     label: "FAQPage"
    // }
]