"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


import CodeBlock from "components/CodeBlock";
import FormElement from "components/form-elements/FormElement";
import FormHelper from "components/form-elements/FormHelper";
import { useCallback, useEffect, useState } from "react";



const defaultData = {
    google: {
        pageTitle: "Meta Tag Generator Tool",
        pageDescription: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide",
        siteImage: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
    },
    OG: {
        pageTitle: "Meta Tag Generator Tool",
        pageDescription: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide.",
        previewImage: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
        URL: "https://kkupgrader.eu.org/",
        siteName: "K K UPGRADER",
        locale: "en_US",
    },
    twitter: {
        pageTitle: "Meta Tag Generator Tool",
        pageDescription: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide.",
        previewImage: "https://kkupgrader.github.io/tools/meta-tag-generator/meta-tag-generator.svg",
    },

}

export default function MetaTagGenerator() {


    // Google Meta Tags
    const [Google_Title, SetGoogle_Title] = useState(defaultData.google.pageTitle);
    const [Google_Description, SetGoogle_Description] = useState(defaultData.google.pageDescription)
    const [Google_siteImage, SetGoogle_siteImage] = useState(defaultData.google.siteImage)
    // OG Meta Tags
    const [OG_Title, SetOG_Title] = useState(defaultData.OG.pageTitle);
    const [OG_Description, SetOG_Description] = useState(defaultData.OG.pageDescription)
    const [OG_URL, SetOG_URL] = useState(defaultData.OG.URL)
    const [OG_siteName, SetOG_siteName] = useState(defaultData.OG.siteName)
    const [OG_previewImage, SetOG_previewImage] = useState(defaultData.OG.previewImage)
    const [OG_locale, SetOG_locale] = useState(defaultData.OG.locale)
    // Twitter Meta Tags
    const [Twitter_Title, SetTwitter_Title] = useState(defaultData.twitter.pageTitle);
    const [Twitter_Description, SetTwitter_Description] = useState(defaultData.twitter.pageDescription)
    const [Twitter_previewImage, SetTwitter_previewImage] = useState(defaultData.twitter.previewImage)

    // Display Code
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getString = useCallback(() => {

        const RawHTML = `\n <!-- COMMON TAGS -->\n<meta charset="utf-8">\n<title>${Google_Title}</title>\n<!-- Search Engine -->\n<meta name="description" content="${Google_Description}">\n<meta name="image" content="${Google_siteImage}">\n<!-- Schema.org for Google -->\n<meta itemprop="name" content="${Google_Title}">\n<meta itemprop="description" content="${Google_Description}">\n<meta itemprop="image" content="${Google_siteImage}">\n<!-- Open Graph general (Facebook, Pinterest & LinkedIn) -->\n<meta property="og:title" content="${OG_Title}">\n<meta property="og:description" content="${OG_Description}">\n<meta property="og:image" content="${OG_previewImage}">\n<meta property="og:url" content="${OG_URL}">\n<meta property="og:site_name" content="${OG_siteName}">\n<meta property="og:locale" content="${OG_locale}">\n<meta property="og:type" content="website">\n<!-- Twitter -->\n<meta property="twitter:card" content="summary">\n<meta property="twitter:title" content="${Twitter_Title}">\n<meta property="twitter:description" content="${Twitter_Description}">\n<meta property="twitter:image:src" content="${Twitter_previewImage}">`;


        // return ParseString(RawHTML);
        return RawHTML
    }, [])
    const [codeString, SetCodeString] = useState(getString());

    useEffect(() => {
        SetCodeString(getString())
    }, [getString, Google_Description, Google_Title, Google_siteImage, OG_Description, OG_Title, OG_URL, OG_locale, OG_previewImage, OG_siteName, Twitter_Description, Twitter_Title, Twitter_previewImage])

    const ResetData = () => {
        SetGoogle_Title("");
        SetGoogle_Description("");
        SetGoogle_siteImage("");
        SetOG_Title("");
        SetOG_Description("");
        SetOG_URL("");
        SetOG_siteName("");
        SetOG_previewImage("");
        SetOG_locale("");
        SetTwitter_Title("");
        SetTwitter_Description("");
        SetTwitter_previewImage("");
    }

    return (
        <div className="grid gap-3">
            {/* Section: Google */}
            <section id="section-google">
                <div className="flex items-center gap-3 ">
                    <div className="grow">
                        <p className="mb-3 ml-3">
                            <strong>Google search results:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section className={"rounded border border-solid border-slate-200 bg-white p-4 mb-4 max-w-[600px]"}>
                            <p className="text-slate-500 text-xs">
                                kkupgrader.eu.org &gt; tools &gt; Advance Meta Tag
                            </p>
                            <a target="_blank" href="#!" rel="noreferrer">
                                <h5 className={"text-xl text-primary font-semibold"}> {Google_Title}</h5></a>
                            <p className={"text-muted-foreground text-sm mb-0"}> {Google_Description} </p>

                        </section>
                        {/* Section: Preview */}
                    </div>
                    {/* Section: Controls */}

                    <Card className="grow max-w-[550px]">
                        <CardHeader>
                            <CardTitle>
                                Google search results
                            </CardTitle>
                            <CardDescription>
                                (Google, Yahoo, Bing, etc.)
                            </CardDescription>

                        </CardHeader>
                        <CardContent>
                            {/* Page title */}
                            <FormElement>
                                <Input
                                    type="text"
                                    id="Fui_FormPageTitleGoogle"
                                    variant="ghost"
                                    maxLength={60} value={Google_Title} onChange={(e) => SetGoogle_Title(e.target.value)} />
                                <Label htmlFor="Fui_FormPageTitleGoogle">Page title</Label>
                                <FormHelper className="text-muted-foreground text-xs">60 characters maximum ({60 - Google_Title.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Page description */}
                            <FormElement>
                                <Textarea variant="ghost" id="DescriptionGoogle" rows={4} maxLength={160} value={Google_Description} onChange={(e) => SetGoogle_Description(e.target.value)} />
                                <Label htmlFor="DescriptionGoogle">Page description</Label>
                                <FormHelper className="text-muted-foreground text-xs">160 characters maximum ({160 - Google_Description.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Site image */}
                            <FormElement>
                                <Input type="text" id="Fui_FormSiteImageGoogle" variant="ghost" value={Google_siteImage} onChange={(e) => SetGoogle_siteImage(e.target.value)} />
                                <Label htmlFor="Fui_FormSiteImageGoogle">Site image</Label>
                                <FormHelper className="text-muted-foreground text-xs"> Valid URL address of the .jpg or .png image</FormHelper>
                            </FormElement>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="button" variant="secondary" size="sm" onClick={() => {
                                SetGoogle_Title(defaultData.google.pageTitle);
                                SetGoogle_Description(defaultData.google.pageDescription);
                                SetGoogle_siteImage(defaultData.google.siteImage);
                            }}>
                                Reset
                            </Button>
                        </CardFooter>
                    </Card>
                    {/* Section: Controls */}
                </div>
            </section>

            {/* Section: Open Graph */}
            <section id="section-open-graph" className="w-full">
                <div className="flex items-center justify-around gap-3 w-full">
                    <div className="grow">
                        <p className="mb-3 ml-3">
                            <strong>Open graph
                                <small className="text-muted">(Facebook, Pinterest, LinkedIn)</small>:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section className="mb-4">
                            <div className={"rounded-lg overflow-hidden border border-solid border-slate-200  max-w-[480px]"}>
                                <div className={"relative overflow-hidden bg-no-repeat bg-center bg-cover aspect-auto w-full h-[261px]  max-w-[480px] rounded-top"} style={{ backgroundImage: 'url(' + OG_previewImage + ')' }} />
                                <div className={"bg-slate-100 py-2 px-4"}>
                                    <p className={"uppercase text-slate-600 mb-2 text-sm  truncate"}>{OG_URL}</p>
                                    <p className={"font-semibold text-lg mb-1 truncate"}>{OG_Title}</p>
                                    <p className={" text-slate-500 text-sm  truncate"}>{OG_Description}</p>
                                </div>
                            </div>
                        </section>
                        {/* Section: Preview */}
                    </div>
                    {/* Section: Controls */}
                    <Card className="grow max-w-[550px]">
                        <CardHeader>
                            <CardTitle>
                                Open graph
                            </CardTitle>
                            <CardDescription>
                                (Facebook, Pinterest, LinkedIn)
                            </CardDescription>

                        </CardHeader>

                        <CardContent>
                            {/* Page title */}
                            <FormElement>
                                <Input type="text" id="formPageTitleOG" variant="ghost" maxLength={60} value={OG_Title} onChange={e => SetOG_Title(e.target.value)} />
                                <Label htmlFor="formPageTitleOG">Page title</Label>
                                <FormHelper className="text-muted-foreground text-xs">60 characters maximum ({60 - OG_Title.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Page description */}
                            <FormElement>
                                <Textarea variant="ghost" id="pageDescriptionOG" rows={5} cols={32} maxLength={68} value={OG_Description} onChange={e => SetOG_Description(e.target.value)} />
                                <Label htmlFor="pageDescriptionOG">Page description</Label>
                                <FormHelper className="text-muted-foreground text-xs">68 characters maximum ({68 - OG_Description.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Preview image */}
                            <FormElement>
                                <Input type="text" id="formPreviewImageOG" variant="ghost" value={OG_previewImage} onChange={e => SetOG_previewImage(e.target.value)} />
                                <Label htmlFor="formPreviewImageOG">Preview image</Label>
                                <FormHelper className="text-muted-foreground text-xs">1200x628 px recommended</FormHelper>
                            </FormElement>
                            {/* URL */}
                            <FormElement>
                                <Input type="text" id="URL_OG" variant="ghost" value={OG_URL} onChange={e => SetOG_URL(e.target.value)} />
                                <Label htmlFor="URL_OG">URL</Label>
                            </FormElement>
                            {/* Site name */}
                            <FormElement>
                                <Input type="text" id="formSiteNameOG" variant="ghost" value={OG_siteName} onChange={e => SetOG_siteName(e.target.value)} />
                                <Label htmlFor="formSiteNameOG">Site name</Label>
                            </FormElement>
                            {/* Locale */}
                            <FormElement>
                                <Input type="text" id="formLocaleOG" variant="ghost" value={OG_locale} onChange={e => SetOG_locale(e.target.value)} />
                                <Label htmlFor="formLocaleOG">Locale</Label>
                            </FormElement>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="button" variant="secondary" size="sm" onClick={() => {
                                SetOG_Title(defaultData.OG.pageTitle);
                                SetOG_Description(defaultData.OG.pageDescription);
                                SetOG_URL(defaultData.OG.URL);
                                SetOG_siteName(defaultData.OG.siteName);
                                SetOG_previewImage(defaultData.OG.previewImage);
                                SetOG_locale(defaultData.OG.locale);
                            }}>
                                Reset
                            </Button>
                        </CardFooter>
                    </Card>
                    {/* Section: Controls */}
                </div>
            </section>
            {/* Section: Twitter */}
            <section id="section-twitter" className="mb-5">
                <div className="flex items-center justify-around gap-3 w-full">
                    <div className="grow">
                        <p className="mb-3 ml-3">
                            <strong>Twitter:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section >
                            <div className={"rounded-lg overflow-hidden border border-solid border-slate-200  max-w-[480px]"}>
                                <div className={"relative overflow-hidden bg-no-repeat bg-center bg-cover aspect-auto w-full h-[261px]  max-w-[480px] rounded-top"} style={{ backgroundImage: 'url(' + Twitter_previewImage + ')' }} />
                                <div className={"bg-slate-100 py-2 px-4"}>
                                    <p className={"font-semibold text-lg mb-1 truncate"}>{Twitter_Title}</p>
                                    <p className={" text-slate-500 text-sm  truncate"}>{Twitter_Description}</p>
                                </div>
                            </div>
                        </section>
                        {/* Section: Preview */}
                    </div>
                    {/* Section: Controls */}
                    <Card className="grow max-w-[550px]">
                        <CardHeader>
                            <CardTitle>Twitter</CardTitle>
                            <CardDescription>
                                (Twitter)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Page title */}
                            <FormElement>
                                <Input type="text" id="formPageTitleTwitter" variant="ghost" maxLength={60} value={Twitter_Title} onChange={e => SetTwitter_Title(e.target.value)} />
                                <Label htmlFor="formPageTitleTwitter">Page title</Label>
                                <FormHelper>60 characters maximum ({60 - Twitter_Title.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Page description */}
                            <FormElement>
                                <Textarea variant="ghost" id="pageDescriptionTwitter" rows={8} value={Twitter_Description} onChange={e => SetTwitter_Description(e.target.value)} maxLength={120} />
                                <Label htmlFor="pageDescriptionTwitter">Page description</Label>
                                <FormHelper>120 characters maximum ({120 - Twitter_Description.length} are remaining)</FormHelper>
                            </FormElement>
                            {/* Site image */}
                            <FormElement>
                                <Input type="text" id="formSiteImageTwitter" variant="ghost" value={Twitter_previewImage} onChange={e => SetTwitter_previewImage(e.target.value)} />
                                <Label htmlFor="formSiteImageTwitter">Site image</Label>
                                <FormHelper>Valid URL address of the image</FormHelper>
                            </FormElement>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="button" variant="secondary" size="sm" onClick={() => {
                                SetTwitter_Title(defaultData.twitter.pageTitle);
                                SetTwitter_Description(defaultData.twitter.pageDescription);
                                SetTwitter_previewImage(defaultData.twitter.previewImage);
                            }}>
                                Reset
                            </Button>
                        </CardFooter>
                    </Card>
                    {/* Section: Controls */}
                </div>
            </section >

            <section className={"w-full m-auto max-w-[720px]"}>

                <CodeBlock language="html" content={codeString} title="CodeBlock" />
            </section>
        </div>
    )
}