import type { Context } from '@deepseek-ai/cordis';
interface Config {
    executable?: string;
    profile?: string;
    iql?: string;
    tomatoOrigin?: string;
    tomatoTenant?: string;
}
export declare const name = "tomato-board";
export declare const inject: string[];
export declare function apply(ctx: Context, config?: Config): void;
export {};
//# sourceMappingURL=index.d.ts.map