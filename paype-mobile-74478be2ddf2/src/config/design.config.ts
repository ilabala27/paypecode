import { hs, ms, ws } from "@utilis/designs/measurements.design"
import colors from "@config/colors.config"
import fonts from "@config/fonts.config"
import { Platform, StatusBar } from "react-native"

const dimensions: any = {
    STATUS_BAR: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    // Opacity
    OPACITY_LOW: 0.25,
    OPACITY_MED: 0.5,
    OPACITY_AVG: 0.75,
    OPACITY_HIGH: 1,

    // Snackbar
    SNACKBAR_SUCCESS: 2000,
    SNACKBAR_FAILURE: 5000,

    // Padding Vertical
    GENERIC_PADDING_VERTICAL_LOW: {
        paddingTop: hs(6),
        paddingBottom: hs(6),
    },
    GENERIC_PADDING_VERTICAL_MED: {
        paddingTop: hs(12),
        paddingBottom: hs(12),
    },
    GENERIC_PADDING_VERTICAL_AVG: {
        paddingTop: hs(18),
        paddingBottom: hs(18),
    },
    GENERIC_PADDING_VERTICAL_HIGH: {
        paddingTop: hs(24),
        paddingBottom: hs(24),
    },

    // Padding Horizontal
    GENERIC_PADDING_HORIZONTAL_LOW: {
        paddingLeft: hs(6),
        paddingRight: hs(6),
    },
    GENERIC_PADDING_HORIZONTAL_MED: {
        paddingLeft: hs(12),
        paddingRight: hs(12),
    },
    GENERIC_PADDING_HORIZONTAL_AVG: {
        paddingLeft: hs(18),
        paddingRight: hs(18),
    },
    GENERIC_PADDING_HORIZONTAL_HIGH: {
        paddingLeft: hs(24),
        paddingRight: hs(24),
    },

    // Margin Vertical
    GENERIC_MARGIN_VERTICAL_LOW: {
        marginTop: hs(6),
        marginBottom: hs(6),
    },
    GENERIC_MARGIN_VERTICAL_MED: {
        marginTop: hs(12),
        marginBottom: hs(12),
    },
    GENERIC_MARGIN_VERTICAL_AVG: {
        marginTop: hs(18),
        marginBottom: hs(18),
    },
    GENERIC_MARGIN_VERTICAL_HIGH: {
        marginTop: hs(24),
        marginBottom: hs(24),
    },

    // Margin Horizontal
    GENERIC_MARGIN_HORIZONTAL_LOW: {
        marginLeft: hs(6),
        marginRight: hs(6),
    },
    GENERIC_MARGIN_HORIZONTAL_MED: {
        marginLeft: hs(12),
        marginRight: hs(12),
    },
    GENERIC_MARGIN_HORIZONTAL_AVG: {
        marginLeft: hs(18),
        marginRight: hs(18),
    },
    GENERIC_MARGIN_HORIZONTAL_HIGH: {
        marginLeft: hs(24),
        marginRight: hs(24),
    },

    // For Image Tag
    GENERIC_IMAGE: {
        height: '100%',
        width: '100%',
        resizeMode: 'stretch'
    },

    // Position
    GENERAIC_CENTER: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
    GENERIC_ROW_CENTER: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    // Layout
    GENERIC_SCREEN_P: {
        flex: 1,
        width: ws(375),
        backgroundColor: colors.P_BG 
    },
    GENERIC_SCREEN_S: {
        flex: 1,
        width: ws(375),
        backgroundColor: colors.S_BG 
    },
    GENERIC_CONTAINER_P: {
        flex: 1,
        width: ws(375),
        paddingVertical: ws(6),
        paddingHorizontal: ws(6),
        backgroundColor: colors.P_BG,
        borderRadius: 30,
        overflow: 'hidden'
    },
    GENERIC_CONTAINER_S: {
        flex: 1,
        width: ws(375),
        paddingVertical: ws(6),
        paddingHorizontal: ws(6),
        backgroundColor: colors.S_BG,
        overflow: 'hidden'
    },

    // Card
    GENERIC_CARD: {
        width: ws(351),
        borderRadius: ms(6),
        paddingVertical: hs(12),
        paddingHorizontal: ws(12),
        backgroundColor: colors.P_BG ,
        marginVertical: hs(3),
        marginHorizontal: ws(6),
    },


    CARD: {
        width: ws(351),
        backgroundColor: colors.P_BG ,
        alignSelf: 'center',
        paddingVertical: hs(8),
        paddingHorizontal: ws(16),
        marginVertical: hs(8),
        borderRadius: ms(6),
    },

    P_TEXT: {
        fontSize: ms(16),
        fontFamily: fonts.Bold,
        fontWeight: '700',
        color: colors.P_TEXT_COLOR,
    },
    S_TEXT: {
        fontSize: ms(14),
        fontFamily: fonts.Medium,
        fontWeight: '500',
        color: colors.S_TEXT_COLOR,
    },

    // Text
    // Reference: Try 12–12px for main Content and 24–30px for Headings ( Open Sans )
    GENERIC_TEXT_HEADER_AVG_P: {
        fontSize: ms(15),
        fontFamily: fonts.Bold,
        color: colors.P_TEXT,
    },
    GENERIC_TEXT_HEADER_AVG_S: {
        fontSize: ms(15),
        fontFamily: fonts.Bold,
        color: colors.P_TEXT,
    },
    GENERIC_TEXT_HEADER_P: {
        fontSize: ms(13.5),
        fontFamily: fonts.Bold,
        color: colors.S_TEXT_COLOR,
    },
    GENERIC_TEXT_HEADER_S: {
        fontSize: ms(13.5),
        fontFamily: fonts.Bold,
        color: colors.P_TEXT,
    },
    GENERIC_TEXT_TITLE_P: {
        fontSize: ms(12.5),
        fontFamily: fonts.Bold,
        color: colors.S_TEXT_COLOR,
    },
    GENERIC_TEXT_TITLE_S: {
        fontSize: ms(12.5),
        fontFamily: fonts.Bold,
        color: colors.S_TEXT,
    },
    GENERIC_TEXT_CONTENT_P: {
        fontSize: ms(12),
        fontFamily: fonts.Regular,
        color: colors.P_TEXT,
    },
    GENERIC_TEXT_CONTENT_S: {
        fontSize: ms(12),
        fontFamily: fonts.Regular,
        color: colors.S_TEXT,
    },
    GENERIC_ERROR_TEXT: {
        fontSize: ms(12),
        fontFamily: fonts.SemiBold,
        color: colors.RED
    },
    GENERIC_INFO_TEXT: {
        fontSize: ms(12),
        fontFamily: fonts.Regular,
        color: colors.S_TEXT
    }
}

export default dimensions