import { InterruptibleSleep } from '../sleep/index.js';
/**
 * RunningPromise is a utility class that helps manage the execution of an asynchronous function
 * at a specified polling interval. It allows starting, stopping, and checking the status of the
 * internally managed promise. The class also supports interrupting the polling process when stopped.
 */
export class RunningPromise {
    constructor(fn, pollingIntervalMS = 10000) {
        this.fn = fn;
        this.pollingIntervalMS = pollingIntervalMS;
        this.running = false;
        this.runningPromise = Promise.resolve();
        this.interruptibleSleep = new InterruptibleSleep();
    }
    /**
     * Starts the running promise.
     */
    start() {
        this.running = true;
        const poll = async () => {
            while (this.running) {
                await this.fn();
                await this.interruptibleSleep.sleep(this.pollingIntervalMS);
            }
        };
        this.runningPromise = poll();
    }
    /**
     * Stops the running promise, resolves any pending interruptible sleep,
     * and waits for the currently executing function to complete.
     */
    async stop() {
        this.running = false;
        this.interruptibleSleep.interrupt();
        await this.runningPromise;
    }
    /**
     * Checks if the running promise is currently active.
     * @returns True if the promise is running.
     */
    isRunning() {
        return this.running;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmluZy1wcm9taXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb21pc2UvcnVubmluZy1wcm9taXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXZEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQUt6QixZQUFvQixFQUE4QixFQUFVLG9CQUFvQixLQUFLO1FBQWpFLE9BQUUsR0FBRixFQUFFLENBQTRCO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBSjdFLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsdUJBQWtCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0lBRWtDLENBQUM7SUFFekY7O09BRUc7SUFDSSxLQUFLO1FBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3BCLE1BQU0sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNoQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDOUQsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==