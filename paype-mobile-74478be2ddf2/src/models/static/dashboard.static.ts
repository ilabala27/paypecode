import { NavKeys } from "@controllers/utils/NavKeys.utils";
import NavServiceUtils from "@controllers/utils/NavService.utils";
import { openUrl } from "@utilis/methods/common.method";

export const DASHBOARD_MENU_LIST = [
    {
        name: "My Account",
        key: "my-account",
        iconType: "FontAwesome",
        iconName: "user",
        onPress: () => NavServiceUtils.navigate(NavKeys.MY_PROFILE)
    },
    {
        name: "CR / TR Wallet",
        key: "cr-tr-wallet",
        iconType: "Ionicons",
        iconName: "wallet",
        onPress: () => NavServiceUtils.navigate(NavKeys.TAB_DASHBOARD.TAB_SCREEN_WALLET)
    },
    {
        name: "Our Services",
        key: "our-services",
        iconType: "Ionicons",
        iconName: "layers",
        onPress: () => NavServiceUtils.navigate(NavKeys.TAB_DASHBOARD.TAB_SCREEN_CATEGORY)
    },
    {
        name: "Paype's Forum",
        key: "paype's-forum",
        iconType: "Octicons",
        iconName: "feed-repo",
        onPress: () => NavServiceUtils.navigate(NavKeys.TAB_DASHBOARD.TAB_SCREEN_FORUM)
    },
    {
        name: "Contact Us",
        key: "contact-us",
        iconType: "MaterialIcons",
        iconName: "connect-without-contact",
        onPress: () => openUrl({ url: 'https://www.paype.co.in/#about' })
    },
    {
        name: "About Us",
        key: "about-us",
        iconType: "Ionicons",
        iconName: "ios-document-text",
        onPress: () => openUrl({ url: 'https://www.paype.co.in/#about' })
    },
]
