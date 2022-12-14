import classes from "./style/_metaTag.module.scss";
import { useEffect, useState, useCallback } from "react";
import CodeBlock from "@/components/CodeBlock";
import Input from "@/components/form-elements/Input";
import TextArea from "@/components/form-elements/TextArea";
import Label from "@/components/form-elements/Label";
import FormElement from "@/components/form-elements/FormElement";
import FormHelper from "@/components/form-elements/FormHelper";

import Button from "@/components/buttons/Button";

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

        const RawHTML = `
        <!-- COMMON TAGS -->
        <meta charset="utf-8">
        <title>${Google_Title}</title>
        <!-- Search Engine -->
        <meta name="description" content="${Google_Description}">
        <meta name="image" content="${Google_siteImage}">
        <!-- Schema.org for Google -->
        <meta itemprop="name" content="${Google_Title}">
        <meta itemprop="description" content="${Google_Description}">
        <meta itemprop="image" content="${Google_siteImage}">
        <!-- Open Graph general (Facebook, Pinterest & LinkedIn) -->
        <meta property="og:title" content="${OG_Title}">
        <meta property="og:description" content="${OG_Description}">
        <meta property="og:image" content="${OG_previewImage}">
        <meta property="og:url" content="${OG_URL}">
        <meta property="og:site_name" content="${OG_siteName}">
        <meta property="og:locale" content="${OG_locale}">
        <meta property="og:type" content="website">
        <!-- Twitter -->
        <meta property="twitter:card" content="summary">
        <meta property="twitter:title" content="${Twitter_Title}">
        <meta property="twitter:description" content="${Twitter_Description}">
        <meta property="twitter:image:src" content="${Twitter_previewImage}">`;


        // return ParseString(RawHTML);
        return RawHTML
    })
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
        <div className="Container">

            <section id="section-introduction" className="mb-5 mt-4">
                <div className="Fui_Card mb-4">
                    <div className="Fui_Card-body text-center">
                        <p className="mb-2">
                            <strong>Fill in the Forms with your data. Then scroll down and copy the  generated code. Next, paste at the top of the
                                <mark>&lt;head&gt;</mark> section of your page.</strong>
                        </p>
                        <p className="mb-2"><strong>Note:</strong> The Forms are filled up with the dummy data to
                            present you the proper way of how to to this.
                        </p>
                        <Button type="button" nature="danger" onClick={ResetData}>
                            clear data
                        </Button>
                    </div>
                </div>

            </section>
            {/* Section: Google */}
            <section id="section-google">
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 mb-4 mb-md-0">
                        <p>
                            <strong>Google search results:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section className={classes.GooglePreview + " bg-white p-4 mb-4"}>
                            <p className={classes.pageBreadcrumbs}>
                                kkupgrader.eu.org &gt; tools &gt; Advance Meta Tag
                            </p>
                            <a target="_blank" href="#!" rel="noreferrer">
                                <h5 className={classes.pageTitle}> {Google_Title}</h5></a>
                            <p className={classes.pageDescription + " mb-0"}> {Google_Description} </p>

                        </section>
                        {/* Section: Preview */}
                    </div>
                    <div className="col-md-5 mb-4 mb-md-0">
                        {/* Section: Controls */}
                        <section >
                            <div className="Fui_Card mb-4">
                                <div className="Fui_Card-header py-3 mb-2">
                                    <strong>Google</strong>
                                </div>
                                <div className="Fui_Card-body">
                                    {/* Page title */}
                                    <FormElement>
                                        <Input outlined
                                            type="text"
                                            id="Fui_FormPageTitleGoogle"
                                            className="Fui_Form-input"
                                            maxLength={60} value={Google_Title} onChange={(e) => SetGoogle_Title(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="Fui_FormPageTitleGoogle">Page title</Label>
                                        <FormHelper>60 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Page description */}
                                    <FormElement>
                                        <TextArea className="Fui_Form-textarea" id="DescriptionGoogle" rows={4} maxLength={160} value={Google_Description} onChange={(e) => SetGoogle_Description(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="DescriptionGoogle">Page description</Label>
                                        <FormHelper>160 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Site image */}
                                    <FormElement>
                                        <Input type="text" id="Fui_FormSiteImageGoogle" className="Fui_Form-input" value={Google_siteImage} onChange={(e) => SetGoogle_siteImage(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="Fui_FormSiteImageGoogle">Site image</Label>
                                        <FormHelper> Valid URL address of the .jpg or .png image</FormHelper>
                                    </FormElement>
                                </div>
                            </div>
                        </section>
                        {/* Section: Controls */}
                    </div>
                </div>
            </section>

            {/* Section: Open Graph */}
            <section id="section-open-graph" >
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 mb-4 mb-md-0">
                        <p>
                            <strong>Open graph
                                <small className="text-muted">(Facebook, Pinterest, LinkedIn)</small>:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section className="mb-4">
                            <div className={classes.OGPreview}>
                                <div className={classes.OGPreview_imageWrapper + " bg-image rounded-top"} style={{ backgroundImage: 'url(' + OG_previewImage + ')' }} />
                                <div className={classes.OGPreview_dataWrapper}>
                                    <p className={classes.OG_link + " text-truncate"}>{OG_URL}</p>
                                    <p className={classes.OG_title + " text-truncate"}>{OG_Title}</p>
                                    <p className={classes.OG_description + " text-truncate"}>{OG_Description}</p>
                                </div>
                            </div>
                        </section>
                        {/* Section: Preview */}
                    </div>
                    <div className="col-md-5 mb-4 mb-md-0">
                        {/* Section: Controls */}
                        <section>
                            <div className="Fui_Card mb-4">
                                <div className="Fui_Card-header py-3 mb-2">
                                    <strong>Open graph
                                        <small className="text-muted">(Facebook, Pinterest, LinkedIn)</small></strong>
                                </div>
                                <div className="Fui_Card-body">
                                    {/* Page title */}
                                    <FormElement>
                                        <Input type="text" id="formPageTitleOG" className="Fui_Form-input" maxLength={60} value={OG_Title} onChange={e => SetOG_Title(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formPageTitleOG">Page title</Label>
                                        <FormHelper>60 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Page description */}
                                    <FormElement>
                                        <TextArea className="Fui_Form-textarea" id="pageDescriptionOG" rows={2} maxLength={68} value={OG_Description} onChange={e => SetOG_Description(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="pageDescriptionOG">Page description</Label>
                                        <FormHelper>68 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Preview image */}
                                    <FormElement>
                                        <Input type="text" id="formPreviewImageOG" className="Fui_Form-input" value={OG_previewImage} onChange={e => SetOG_previewImage(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formPreviewImageOG">Preview image</Label>
                                        <FormHelper>1200x628 px recommended</FormHelper>
                                    </FormElement>
                                    {/* URL */}
                                    <FormElement>
                                        <Input type="text" id="URL_OG" className="Fui_Form-input" value={OG_URL} onChange={e => SetOG_URL(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="URL_OG">URL</Label>
                                    </FormElement>
                                    {/* Site name */}
                                    <FormElement>
                                        <Input type="text" id="formSiteNameOG" className="Fui_Form-input" value={OG_siteName} onChange={e => SetOG_siteName(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formSiteNameOG">Site name</Label>
                                    </FormElement>
                                    {/* Locale */}
                                    <FormElement>
                                        <Input type="text" id="formLocaleOG" className="Fui_Form-input" value={OG_locale} onChange={e => SetOG_locale(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formLocaleOG">Locale</Label>
                                    </FormElement>
                                </div>
                            </div>
                        </section>
                        {/* Section: Controls */}
                    </div>
                </div>
            </section>
            {/* Section: Twitter */}
            <section id="section-twitter" className="mb-5">
                <div className="row d-flex align-items-center">
                    <div className="col-md-7 mb-4 mb-md-0">
                        <p >
                            <strong>Twitter:</strong>
                        </p>
                        {/* Section: Preview */}
                        <section >
                            <div className={classes.TwitterPreview}>
                                <div className={classes.TwitterPreview_imageWrapper + " bg-image rounded-top"} style={{ backgroundImage: 'url(' + Twitter_previewImage + ')' }} />
                                <div className={classes.TwitterPreview_dataWrapper}>
                                    <p className={classes.twitter_title + "  text-truncate"}>{Twitter_Title}</p>
                                    <p className={classes.twitter_description}>{Twitter_Description}</p>
                                </div>
                            </div>
                        </section>
                        {/* Section: Preview */}
                    </div>
                    <div className="col-md-5 mb-4 mb-md-0">
                        {/* Section: Controls */}
                        <section >
                            <div className="Fui_Card">
                                <div className="Fui_Card-header py-3 mb-2">
                                    <strong>Twitter</strong>
                                </div>
                                <div className="Fui_Card-body">
                                    {/* Page title */}
                                    <FormElement>
                                        <Input type="text" id="formPageTitleTwitter" className="Fui_Form-input" maxLength={60} value={Twitter_Title} onChange={e => SetTwitter_Title(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formPageTitleTwitter">Page title</Label>
                                        <FormHelper>60 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Page description */}
                                    <FormElement>
                                        <TextArea className="Fui_Form-textarea" id="pageDescriptionTwitter" value={Twitter_Description} onChange={e => SetTwitter_Description(e.target.value)} rows={4} maxLength={120} />
                                        <Label className="Fui_Form-Label" htmlFor="pageDescriptionTwitter">Page description</Label>
                                        <FormHelper>120 characters maximum</FormHelper>
                                    </FormElement>
                                    {/* Site image */}
                                    <FormElement>
                                        <Input type="text" id="formSiteImageTwitter" className="Fui_Form-input" value={Twitter_previewImage} onChange={e => SetTwitter_previewImage(e.target.value)} />
                                        <Label className="Fui_Form-Label" htmlFor="formSiteImageTwitter">Site image</Label>
                                        <FormHelper>Valid URL address of the image</FormHelper>
                                    </FormElement>
                                </div>
                            </div>
                        </section>
                        {/* Section: Controls */}
                    </div>
                </div>
            </section >

            <section className={classes.CodeArea}>

                <CodeBlock language="html" content={codeString} title="CodeBlock" />
            </section>
        </div>
    )
}