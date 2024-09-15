import * as fs from 'fs/promises';
import * as path from 'path';
// Create a random directory underneath a 'base' directory
// Calls a provided method, ensures the random directory is cleaned up afterwards
export async function runInDirectory(workingDirBase, fn, cleanup = true) {
    // Create random directory to be used for temp files
    const workingDirectory = await fs.mkdtemp(path.join(workingDirBase, 'tmp-'));
    await fs.access(workingDirectory);
    try {
        return await fn(workingDirectory);
    }
    finally {
        if (cleanup) {
            await fs.rm(workingDirectory, { recursive: true, force: true });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuX2luX2Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcy9ydW5faW5fZGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLDBEQUEwRDtBQUMxRCxpRkFBaUY7QUFDakYsTUFBTSxDQUFDLEtBQUssVUFBVSxjQUFjLENBQ2xDLGNBQXNCLEVBQ3RCLEVBQStCLEVBQy9CLFVBQW1CLElBQUk7SUFFdkIsb0RBQW9EO0lBQ3BELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFN0UsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbEMsSUFBSSxDQUFDO1FBQ0gsT0FBTyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7WUFBUyxDQUFDO1FBQ1QsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=