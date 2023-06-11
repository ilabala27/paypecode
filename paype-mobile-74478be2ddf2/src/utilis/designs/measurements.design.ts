import { Dimensions, PixelRatio } from "react-native";


// Screen size
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SCREEN_SIZE: number = Math.sqrt(SCREEN_WIDTH * SCREEN_HEIGHT) / 100;

// Base size
const BASE_WIDTH: number = 375;
const BASE_HEIGHT: number = 812;
const BASE_FACTOR: number = 0.5;

// Scaler based on Base & screen size
const ws = (size: number) => 
    PixelRatio.roundToNearestPixel(size * (SCREEN_WIDTH / BASE_WIDTH));
const hs = (size: number) => 
    PixelRatio.roundToNearestPixel(size * (SCREEN_HEIGHT / BASE_HEIGHT));
const ms = (size: number) => 
    PixelRatio.roundToNearestPixel(size + (hs(size) - size));
const old_ms = (size: number, factor: number = BASE_FACTOR) => 
    PixelRatio.roundToNearestPixel(size + (ws(size) - size) * factor);

// Scaler based on screen size ( Percentage % )
const wp = (widthPercent: string) => 
    PixelRatio.roundToNearestPixel(SCREEN_WIDTH * parseFloat(widthPercent) / 100);

const hp = (heightPercent: string) => 
    PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * parseFloat(heightPercent) / 100);


export {
    BASE_WIDTH, BASE_HEIGHT, BASE_FACTOR,
    SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_SIZE,
    ws, hs,
    ms, old_ms,
    wp, hp,
}