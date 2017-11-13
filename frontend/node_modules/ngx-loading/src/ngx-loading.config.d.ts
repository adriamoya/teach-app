export interface ILoadingConfig {
    backdropBorderRadius?: string;
    backdropBackgroundColour?: string;
    fullScreenBackdrop?: boolean;
    animationType?: string;
    primaryColour?: string;
    secondaryColour?: string;
    tertiaryColour?: string;
    [key: string]: string | boolean | undefined;
}
export declare class LoadingConfig implements ILoadingConfig {
    backdropBorderRadius?: string;
    backdropBackgroundColour?: string;
    fullScreenBackdrop?: boolean;
    animationType?: string;
    primaryColour?: string;
    secondaryColour?: string;
    tertiaryColour?: string;
    [key: string]: string | boolean | undefined;
    constructor(config?: ILoadingConfig);
}
export declare const ANIMATION_TYPES: {
    threeBounce: string;
    rotatingPlane: string;
    rectangleBounce: string;
    wanderingCubes: string;
};
