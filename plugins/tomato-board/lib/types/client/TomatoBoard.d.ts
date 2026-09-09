import type { Context } from '@deepseek-ai/cordis';
export interface TomatoItem {
    itemKey: string;
    title: string;
    status: string;
    itemType: string;
    workspace: string;
    workspaceKey: string;
    workspaceName: string;
    creator: string;
    assignees: string[];
    priority: string;
    tomatoUrl: string;
}
export declare const inject: string[];
export declare function apply(ctx: Context): void;
//# sourceMappingURL=TomatoBoard.d.ts.map