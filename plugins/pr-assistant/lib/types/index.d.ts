import type { Context } from '@deepseek-ai/cordis';
interface Config {
    executable?: string;
    profile?: string;
    githubToken?: string;
}
export declare const name = "pr-assistant";
export declare const inject: string[];
export declare function apply(ctx: Context, config?: Config): void;
export {};
//# sourceMappingURL=index.d.ts.map