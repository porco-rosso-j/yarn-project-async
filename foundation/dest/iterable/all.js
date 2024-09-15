import { isAsyncIterable } from './isAsyncIt.js';
function all(source) {
    if (isAsyncIterable(source)) {
        return (async () => {
            const arr = [];
            for await (const entry of source) {
                arr.push(entry);
            }
            return arr;
        })();
    }
    const arr = [];
    for (const entry of source) {
        arr.push(entry);
    }
    return arr;
}
export { all };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2l0ZXJhYmxlL2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTakQsU0FBUyxHQUFHLENBQUksTUFBc0M7SUFDcEQsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDakIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRWYsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFZixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyJ9