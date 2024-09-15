import { z } from 'zod';
declare const noirGitDependencySchema: z.ZodObject<{
    git: z.ZodString;
    tag: z.ZodString;
    directory: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    git: string;
    tag: string;
    directory?: string | undefined;
}, {
    git: string;
    tag: string;
    directory?: string | undefined;
}>;
declare const noirLocalDependencySchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
declare const noirPackageConfigSchema: z.ZodObject<{
    package: z.ZodObject<{
        name: z.ZodDefault<z.ZodString>;
        type: z.ZodDefault<z.ZodEnum<["lib", "contract", "bin"]>>;
        entry: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        authors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        compiler_version: z.ZodOptional<z.ZodString>;
        backend: z.ZodOptional<z.ZodString>;
        license: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "lib" | "contract" | "bin";
        name: string;
        entry?: string | undefined;
        description?: string | undefined;
        authors?: string[] | undefined;
        compiler_version?: string | undefined;
        backend?: string | undefined;
        license?: string | undefined;
    }, {
        type?: "lib" | "contract" | "bin" | undefined;
        name?: string | undefined;
        entry?: string | undefined;
        description?: string | undefined;
        authors?: string[] | undefined;
        compiler_version?: string | undefined;
        backend?: string | undefined;
        license?: string | undefined;
    }>;
    dependencies: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        git: z.ZodString;
        tag: z.ZodString;
        directory: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        git: string;
        tag: string;
        directory?: string | undefined;
    }, {
        git: string;
        tag: string;
        directory?: string | undefined;
    }>, z.ZodObject<{
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>]>>>;
}, "strip", z.ZodTypeAny, {
    package: {
        type: "lib" | "contract" | "bin";
        name: string;
        entry?: string | undefined;
        description?: string | undefined;
        authors?: string[] | undefined;
        compiler_version?: string | undefined;
        backend?: string | undefined;
        license?: string | undefined;
    };
    dependencies: Record<string, {
        git: string;
        tag: string;
        directory?: string | undefined;
    } | {
        path: string;
    }>;
}, {
    package: {
        type?: "lib" | "contract" | "bin" | undefined;
        name?: string | undefined;
        entry?: string | undefined;
        description?: string | undefined;
        authors?: string[] | undefined;
        compiler_version?: string | undefined;
        backend?: string | undefined;
        license?: string | undefined;
    };
    dependencies?: Record<string, {
        git: string;
        tag: string;
        directory?: string | undefined;
    } | {
        path: string;
    }> | undefined;
}>;
/**
 * Noir package configuration.
 */
export type NoirPackageConfig = z.infer<typeof noirPackageConfigSchema>;
/**
 * A remote package dependency.
 */
export type NoirGitDependencyConfig = z.infer<typeof noirGitDependencySchema>;
/**
 * A local package dependency.
 */
export type NoirLocalDependencyConfig = z.infer<typeof noirLocalDependencySchema>;
/**
 * A package dependency.
 */
export type NoirDependencyConfig = NoirGitDependencyConfig | NoirLocalDependencyConfig;
/**
 * Checks that an object is a package configuration.
 * @param config - Config to check
 */
export declare function parseNoirPackageConfig(config: any): NoirPackageConfig;
export {};
//# sourceMappingURL=noir_package_config.d.ts.map