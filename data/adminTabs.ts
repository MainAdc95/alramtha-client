import { Role } from "../types/user";

export const tabs: {
    role: Role;
    name: string;
    icon: string;
    link: string;
    isDisabled: boolean;
}[] = [
    {
        role: "is_admin",
        name: "الأحصائيات",
        icon: "/bar-chart.png",
        link: "/admin",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "التغذية الاخبارية",
        icon: "/newsFeed.svg",
        link: "/admin/newsFeed",
        isDisabled: false,
    },
    {
        role: "is_editor",
        name: "ادارة الأخبار",
        icon: "/draftNews.svg",
        link: "/admin/news",
        isDisabled: false,
    },
    {
        role: "is_writer",
        name: "ادارة المقالات",
        icon: "/article.svg",
        link: "/admin/articles",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الشريط الاخباري",
        icon: "/strip.svg",
        link: "/admin/strips",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الملفات",
        icon: "/files.svg",
        link: "/admin/files",
        isDisabled: false,
    },
    {
        role: "all",
        name: "رسائل",
        icon: "/message.svg",
        link: "/admin/messages",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الصور",
        icon: "/gallery.svg",
        link: "/admin/gallery",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الأقسام",
        icon: "/section.svg",
        link: "/admin/sections",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "وسوم",
        icon: "/tag.svg",
        link: "/admin/tags",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "استطلاعات الرأي",
        icon: "/polls.svg",
        link: "/admin/polls",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الاشتراكات",
        icon: "/subscriptions.svg",
        link: "/admin/newsLetter",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "الاعضاء",
        icon: "/addNews.svg",
        link: "/admin/users",
        isDisabled: false,
    },
    {
        role: "is_admin",
        name: "خبر بصورة",
        icon: "/liveStream.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "كاريكاتير",
        icon: "/liveStream.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "ترند العالم",
        icon: "/liveStream.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "البث المباشر",
        icon: "/liveStream.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "تغذية الجمهور العودة",
        icon: "/audFeed.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "إدارة الإعلانات",
        icon: "/advMang.svg",
        link: "/admin",
        isDisabled: true,
    },
    {
        role: "is_admin",
        name: "البث",
        icon: "/podcasting.svg",
        link: "/admin",
        isDisabled: true,
    },
];
