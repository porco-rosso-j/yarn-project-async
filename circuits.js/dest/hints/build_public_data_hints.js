import { padArrayEnd } from '@aztec/foundation/collection';
import { Fr } from '@aztec/foundation/fields';
import { MAX_PUBLIC_DATA_HINTS, } from '../constants.gen.js';
import { PublicDataHint } from '../structs/public_data_hint.js';
export async function buildPublicDataHints(oracle, publicDataReads, publicDataUpdateRequests) {
    const publicDataLeafSlots = [...publicDataReads, ...publicDataUpdateRequests]
        .filter(r => !r.isEmpty())
        .map(r => r.leafSlot.toBigInt());
    const uniquePublicDataLeafSlots = [...new Set(publicDataLeafSlots)];
    const hints = await Promise.all(uniquePublicDataLeafSlots.map(slot => buildPublicDataHint(oracle, slot)));
    return padArrayEnd(hints, PublicDataHint.empty(), MAX_PUBLIC_DATA_HINTS);
}
export async function buildPublicDataHint(oracle, leafSlot) {
    const { membershipWitness, leafPreimage } = await oracle.getMatchOrLowPublicDataMembershipWitness(leafSlot);
    const exists = leafPreimage.slot.toBigInt() === leafSlot;
    const value = exists ? leafPreimage.value : Fr.ZERO;
    return new PublicDataHint(new Fr(leafSlot), value, 0, membershipWitness, leafPreimage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRfcHVibGljX2RhdGFfaGludHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGludHMvYnVpbGRfcHVibGljX2RhdGFfaGludHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUc5QyxPQUFPLEVBQ0wscUJBQXFCLEdBSXRCLE1BQU0scUJBQXFCLENBQUM7QUFPN0IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBV2hFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsb0JBQW9CLENBQ3hDLE1BQXlDLEVBQ3pDLGVBQTJFLEVBQzNFLHdCQUF1RztJQUV2RyxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBRyxlQUFlLEVBQUUsR0FBRyx3QkFBd0IsQ0FBQztTQUMxRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkMsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFHLE9BQU8sV0FBVyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxNQUF5QyxFQUFFLFFBQWdCO0lBQ25HLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyx3Q0FBd0MsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLFFBQVEsQ0FBQztJQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDcEQsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3pGLENBQUMifQ==