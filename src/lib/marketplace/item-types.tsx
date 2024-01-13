import {
    CilBook,
    ElFontsize,
    GridiconsThemes,
    HeroiconsOutlineTemplate,
    IconParkOutlineGraphicStitching,
    IonExtensionPuzzleOutline,
    // MingcuteMore3Line,
    MingcutePluginLine,
    SimpleIconsUikit
} from "assets/icons"

export type ItemType = {
    label: string,
    href: string,
    id: string,
    icon: React.ElementType,
}
export const Item_types = [
    {
        label: 'Templates',
        href: '/marketplace/explore?type=template',
        // sublinks: [
        //     { label: 'Landing Pages', href: '/marketplace/explore?type=template&category=landingpage' },
        //     { label: 'Admin Dashboards', href: '/marketplace/explore?type=template&category=admindashboard' },
        // ],
        id: 'templates',
        icon:HeroiconsOutlineTemplate,
    },
    {
        label: 'UI Kits',
        href: '/marketplace/explore?type=uikit',
        id: 'uikits',
        icon:SimpleIconsUikit,
    },
    {
        label: 'E-Books', href: '/marketplace/explore?type=ebook',
        id: 'ebooks',
        icon:CilBook,
    },
    {
        label: 'Plugins', href: '/marketplace/explore?type=plugin',
        id: 'plugins',
        icon:MingcutePluginLine,
    },
    {
        label: 'Extensions', href: '/marketplace/explore?type=extensions',
        id: 'extensions',
        icon:IonExtensionPuzzleOutline,
    },
    {
        label: 'Themes', href: '/marketplace/explore?type=theme',
        id: 'themes',
        icon:GridiconsThemes,
    },
    {
        label: 'Graphics', href: '/marketplace/explore?type=graphic',
        id: 'graphics',
        icon:IconParkOutlineGraphicStitching
    },
    {
        label: 'Fonts', href: '/marketplace/explore?type=font',
        id: 'fonts',
        icon:ElFontsize
    },

    // { label: 'Courses', href: '/marketplace/explore?type=course' },
    // { label: 'Audio', href: '/marketplace/explore?type=audio' },
    // { label: '3D Assets', href: '/marketplace/explore?type=3d' },
    // { label: 'Tools', href: '/marketplace/explore?type=tool' },
    // { label: 'Mobile Apps', href: '/marketplace/explore?type=mobileapp' },
    // { label: 'Desktop Apps', href: '/marketplace/explore?type=desktopapp' },
    // { label: 'SaaS', href: '/marketplace/explore?type=saas' },
    // { label: 'Games', href: '/marketplace/explore?type=game' },
    // { label: 'Websites', href: '/marketplace/explore?type=website' },
    // { label: 'Jobs', href: '/marketplace/explore?type=job' },
    // { label: 'Services', href: '/marketplace/explore?type=service' },
    // {
    //     label: 'Other', href: '/marketplace/explore?type=other',
    //     id: 'other',
    //     icon:MingcuteMore3Line
    // },
] as ItemType[]

export const product_types = Item_types.map(item => item.id)