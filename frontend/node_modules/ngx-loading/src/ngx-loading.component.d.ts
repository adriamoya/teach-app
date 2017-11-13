import { OnInit } from '@angular/core';
import { LoadingConfigService } from './ngx-loading.service';
import { ILoadingConfig } from './ngx-loading.config';
export declare class LoadingComponent implements OnInit {
    private loadingConfigService;
    show: boolean;
    config: ILoadingConfig;
    ANIMATION_TYPES: {
        threeBounce: string;
        rotatingPlane: string;
        rectangleBounce: string;
        wanderingCubes: string;
    };
    loadingConfig: ILoadingConfig;
    private defaultConfig;
    constructor(loadingConfigService: LoadingConfigService);
    ngOnInit(): void;
    getAnimationType(animationType: string): string;
}
